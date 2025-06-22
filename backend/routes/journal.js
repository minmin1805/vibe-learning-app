import express from "express";
import {getJournalById, getJournals, updateJournal} from "../controllers/journalControllers.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", verifyToken, getJournals);

router.get("/:id", verifyToken, getJournalById);

router.put("/:id", verifyToken, updateJournal);

export default router;