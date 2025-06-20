import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Content"
    },
    title: {
        type: String,
        required: true
    },
    learningObjectives: [{
        text: String,
        bloomLevel: {
            type: String,
            enum: ["remember", "understand", "apply", "analyze", "evaluate", "create"],
            required: true
        }
    }],
    keyConcepts: [{
        concept: String,
        explanation: String,
        examples: [String]
    }],
    sections: [{
        title: String,
        content: String,
        order: Number,
        bloomLevel: {
          type: String,
          enum: ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'],
          required: true
        }
      }],
      summary: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
      },
}, {
    timestamps: true
})

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;