import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// GET /api/questions → ambil semua pertanyaan dari JSON file
router.get("/", (req, res) => {
  try {
    const questions = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/question.json"), "utf8"));
    res.json({ success: true, data: questions });
  } catch (err) {
    console.error("Error reading questions file:", err);
    res.status(500).json({ success: false, message: "Failed to load questions" });
  }
});

export default router;
