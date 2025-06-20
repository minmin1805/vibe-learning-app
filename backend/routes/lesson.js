import express from "express";
import { generateLesson, getLessons, getLessonById } from "../controllers/lessonController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/generate", verifyToken, generateLesson);

router.get("/", getLessons);

router.get("/:id", getLessonById);

export default router;