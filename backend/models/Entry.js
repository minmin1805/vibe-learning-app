import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
    },
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
        default: "",
    },
}, { timestamps: true });

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;