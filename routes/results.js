import express from "express";
import Result from "../models/Result.js";
import Personality from "../models/Personality.js";

const router = express.Router();

// GET /api/results/:userId → ambil hasil terakhir user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Result.findOne({ userId }).sort({ createdAt: -1 });

    if (!result)
      return res.status(404).json({ success: false, message: "No result found" });

    const personality = await Personality.findOne({ type: result.type });

    res.json({
      success: true,
      result: {
        type: result.type,
        scores: result.scores,
        personality,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
