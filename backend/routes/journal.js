import express from "express";
import {createEntry, getJournalById, getJournals, updateJournal, getEntries} from "../controllers/journalControllers.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", verifyToken, getJournals);

router.get("/:id", verifyToken, getJournalById);

router.put("/:id", verifyToken, updateJournal);

router.get("/:id/entries", verifyToken, getEntries);

router.post("/:id/entries", verifyToken, createEntry);

export default router;