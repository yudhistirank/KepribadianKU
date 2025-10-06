import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// GET /api/personalities → semua tipe MBTI
router.get("/", (req, res) => {
  try {
    const personalities = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/personalities.json"), "utf8"));
    res.json({ success: true, data: personalities });
  } catch (err) {
    console.error("Error reading personalities file:", err);
    res.status(500).json({ success: false, message: "Failed to load personalities" });
  }
});

// GET /api/personalities/:type → detail satu tipe MBTI
router.get("/:type", (req, res) => {
  try {
    const { type } = req.params;
    const personalities = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/personalities.json"), "utf8"));

    const personality = personalities.find(p => p.type.toUpperCase() === type.toUpperCase());

    if (!personality)
      return res.status(404).json({ success: false, message: "Type not found" });

    res.json({ success: true, data: personality });
  } catch (err) {
    console.error("Error reading personalities file:", err);
    res.status(500).json({ success: false, message: "Failed to load personality" });
  }
});

export default router;
