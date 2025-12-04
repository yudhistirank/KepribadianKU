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

const allowedOrigins = [
  "https://kepribadianku.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser tools such as Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// routes
app.use("/api/questions", questionRoutes);
app.use("/api/test", testRoutes);
app.use("/api/personalities", personalityRoutes);
app.use("/api/results", resultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
