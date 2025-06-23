import express from "express";
import { updateEntry, createEntry, getJournalById, getJournals, updateJournal, getEntries, deleteEntry} from "../controllers/journalControllers.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", verifyToken, getJournals);

router.get("/:id", verifyToken, getJournalById);

router.put("/:id", verifyToken, updateJournal);

router.get("/:id/entries", verifyToken, getEntries);

router.post("/:id/entries", verifyToken, createEntry);

router.put("/:id/entries/:entryId", verifyToken, updateEntry);

router.delete("/:id/entries/:entryId", verifyToken, deleteEntry);


export default router;