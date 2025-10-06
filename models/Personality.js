import mongoose from "mongoose";

const personalitySchema = new mongoose.Schema({
  type: String, // INFJ, ENTP, dst.
  personality: String,
  image: String,
  description: String,
  career: [String],
  lovers: String,
  friendship: String,
  characteristic: [String]
});

export default mongoose.model("Personality", personalitySchema);
