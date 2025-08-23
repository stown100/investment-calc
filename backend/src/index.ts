import express from "express";
import cors from "cors";
import { initDb } from "./db";
import projectsRouter from "./projects";
import authRouter from "./entities/user/api/authRouter";
import { authMiddleware } from "./middleware/auth";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Public routes
app.use("/api/auth", authRouter);

// Protected routes
app.use("/api/projects", authMiddleware, projectsRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
