import express from "express";
import cors from "cors";
import { initDb } from "./src/db";
import dotenv from "dotenv";
import projectsRouter from "./src/projects";
import marketRouter from "./src/market";
import forecastRouter from "./src/forecast";
import authRouter from "./src/entities/user/api/authRouter";
import { authMiddleware } from "./src/middleware/auth";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

// Public routes
app.use("/api/auth", authRouter);

// Protected routes
app.use("/api/projects", authMiddleware, projectsRouter);
app.use("/api/market", authMiddleware, marketRouter);
app.use("/api/forecast", authMiddleware, forecastRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api", (req, res) => {
  res.send("API is running");
});

// Initialize database connection
let dbInitialized = false;

const initializeApp = async () => {
  if (!dbInitialized) {
    try {
      await initDb();
      dbInitialized = true;
      console.log("Database initialized");
    } catch (error) {
      console.error("Database initialization failed:", error);
    }
  }
};

// For Vercel serverless functions
export default async (req: any, res: any) => {
  try {
    await initializeApp();
    return app(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
