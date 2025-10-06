import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import questionRoutes from "./routes/questions.js";
import testRoutes from "./routes/test.js";
import personalityRoutes from "./routes/personalities.js";
import resultRoutes from "./routes/results.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/questions", questionRoutes);
app.use("/api/test", testRoutes);
app.use("/api/personalities", personalityRoutes);
app.use("/api/results", resultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
