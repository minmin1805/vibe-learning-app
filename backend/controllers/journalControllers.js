import Journal from "../models/Journal.js";

export const getJournals = async (req, res) => {
  try {

    const foundJournals = await Journal.find({userId: req.user.id});

    res.status(200).json({
        success: true,
        journals: foundJournals
    });

  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to get journals"
    });
  }
};

export const getJournalById = async (req, res) => {
  try {
    const {id} = req.params;
    const foundJournal = await Journal.findById(id);
    if (!foundJournal) {
        return res.status(404).json({
            success: false,
            message: "Journal not found"
        });
    }
    res.status(200).json({
        success: true,
        journal: foundJournal
    });

  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to get journal"
    });
  }
};

export const updateJournal = async (req, res) => {
    try {
        const {entry} = req.body;

        const {id} = req.params;

        const foundJournal = await Journal.findById(id);

        if (!foundJournal) {
            return res.status(404).json({
                success: false,
                message: "Journal not found"
            });
        }

        if(foundJournal.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        foundJournal.entry = entry;
        await foundJournal.save();

        res.status(200).json({
            success: true,
            message: "Journal updated successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update journal"
        });
    }
}