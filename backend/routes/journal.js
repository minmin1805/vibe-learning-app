import express from "express";
import {getJournals, getJournalById, updateJournal } from "../controllers/journalControllers";

const router = express.Router();


router.get("/", getJournals);

router.get("/:id", getJournalById);

router.put("/:id", updateJournal);

export default router;