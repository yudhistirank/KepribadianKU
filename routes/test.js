import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import Personality from "../models/Personality.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// POST /api/test/submit
router.post("/submit", async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!answers || !Array.isArray(answers))
      return res.status(400).json({ success: false, message: "Invalid answers" });

    // Load questions from JSON file
    const questions = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/question.json"), "utf8"));

    const scores = { I: 0, E: 0, N: 0, S: 0, F: 0, T: 0, J: 0, P: 0 };

    for (const ans of answers) {
      const questionIndex = parseInt(ans.questionId);

      // Validate question index
      if (questionIndex < 0 || questionIndex >= questions.length) {
        console.warn(`Invalid question index: ${questionIndex}`);
        continue;
      }

      const q = questions[questionIndex];
      if (q) {
        const val = q.reverse ? (6 - ans.score) : ans.score; // pembalikan nilai jika reverse=true
        scores[q.target] += val;
      }
    }

    // Hitung hasil tipe
    const type =
      (scores.I >= scores.E ? "I" : "E") +
      (scores.N >= scores.S ? "N" : "S") +
      (scores.F >= scores.T ? "F" : "T") +
      (scores.J >= scores.P ? "J" : "P");

    // Load personalities from JSON file
    const personalities = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/personalities.json"), "utf8"));
    const personality = personalities.find(p => p.type === type);

    const result = new Result({
      userId: userId || null,
      scores,
      type,
    });
    await result.save();

    res.json({
      success: true,
      result: {
        type,
        scores,
        personality,
      },
    });
  } catch (err) {
    console.error("Test submit error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
