import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["URL", "PDF", "Youtube"],
        required: true
    },
    originalUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    extractedText: {
        type: String,
        required: true,
    },
    metadata: {
        wordCount: Number,
        estimatedReadingTime: Number,
        sourceUrl: String,
        author: String,
        publishedDate: Date,
        fileSize: Number, // for pdf
        duration: String, // for youtube
        description: String, 

    },
    processedAt: Date,
    status: {
        type: String,
        enum: ["processing", "completed", "failed"],
        default: "processing",
    },

}, {
    timestamps: true,
});

const Content = mongoose.model("Content", contentSchema);

export default Content;