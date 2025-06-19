import express from "express";
import { processUrlContent, processPdfContent, processYoutubeContent } from "../controllers/contentControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

// Process url content
router.post("/process-url", verifyToken, processUrlContent);

// Process pdf content
router.post("/process-pdf", verifyToken, upload.single("file"), processPdfContent);

// Process youtube content
router.post("/process-youtube", verifyToken, processYoutubeContent);


export default router;