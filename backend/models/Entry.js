import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    journalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journal",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;