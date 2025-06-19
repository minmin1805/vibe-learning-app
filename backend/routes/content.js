import express from "express";
import { processUrlContent, processPdfContent, processYoutubeContent } from "../controllers/contentControllers.js";

const router = express.Router();

// Process url content
router.post("/process-url", processUrlContent);

// Process pdf content
router.post("/process-pdf", processPdfContent);

// Process youtube content
router.post("/process-youtube", processYoutubeContent);


export default router;