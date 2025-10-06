import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  section: Number,
  question: String,
  target: String,   // I, E, N, S, F, T, J, P
  reverse: Boolean  // jika true, pembalikan nilai
});

export default mongoose.model("Question", questionSchema);
