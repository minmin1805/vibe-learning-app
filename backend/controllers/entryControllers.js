import Entry from '../models/Entry.js';
import Journal from '../models/Journal.js';

export const createEntry = async (req, res) => {
    try {
        const { journalId } = req.params;
        const { content } = req.body;
        const userId = req.user._id;

        const newEntry = new Entry({
            journalId,
            userId,
            content,
        });

        await newEntry.save();

        await Journal.findByIdAndUpdate(journalId, {
            $push: { entries: newEntry._id }
        });

        res.status(201).json({
            message: 'Entry created successfully',
            entry: newEntry,
        });
    } catch (error) {
        console.error("Error creating entry:", error);
        res.status(500).json({
            message: "Error creating entry",
            error: error.message,
        });
    }
}; 