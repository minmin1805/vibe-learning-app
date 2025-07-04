import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
    },
    title: {
        type: String,
        required: true,
        
    },
    lessonSummary: {
        type: String,
        required: true,
    },
    reflectionPrompt: {
        type: String,
        required: true,
    },
    entries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entry'
    }],
    keyPoints: [{
        type: String,
        required: true,
    }]
    },
    { timestamps: true }
);

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;