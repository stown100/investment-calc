import express from "express";
import cors from "cors";
import { initDb } from "./db";
import dotenv from "dotenv";
import projectsRouter from "./projects";
import marketRouter from "./market";
import forecastRouter from "./forecast";
import authRouter from "./entities/user/api/authRouter";
import { authMiddleware } from "./middleware/auth";

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Public routes
app.use("/api/auth", authRouter);

// Protected routes
app.use("/api/projects", authMiddleware, projectsRouter);
app.use("/api/market", authMiddleware, marketRouter);
app.use("/api/forecast", authMiddleware, forecastRouter);

app.get("/", (req, res) => {
  res.json({ 
    status: "API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
