import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  scores: Object,
  type: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Result", resultSchema);
