import OpenAI from "openai";
import Content from "../models/Content.js";
import { bloomLevelPrompts } from "../config/bloomLevel.js";
import Lesson from "../models/Lesson.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
})

export const generateLesson = async (req, res) => {
    try {
        
        const { contentId} = req.body;

        if(!contentId) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        const foundContent = await Content.findById(contentId);

        if(!foundContent) {
            return res.status(404).json({ message: "Content not found" });
        }

        // Generate lesson
        const bloomLevels = ["remember", "understand", "apply", "analyze", "evaluate", "create"];
        const levelLessons = [];

        for(const level of bloomLevels) {
            const prompt = `${bloomLevelPrompts[level]}\n\nContent: ${foundContent.extractedText}`;

            const completion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'gpt-4-turbo-preview',
                response_format: {type: 'json_object'}
            })

            const generatedLesson = JSON.parse(completion.choices[0].message.content);

            levelLessons.push({
                title: `${level.charAt(0).toUpperCase() + level.slice(1)}: ${generatedLesson.sectionContent?.title || generatedLesson.conceptExplanation?.title || 'Key Concepts'}`,
                content: JSON.stringify(generatedLesson),
                order: bloomLevels.indexOf(level),
                bloomLevel: level
            })
        }

        const rememberLevelContent = JSON.parse(levelLessons[0].content);

        const newLesson = new Lesson({
            userId: foundContent.userId,
            contentId,
            title: foundContent.title,
            summary: foundContent.metadata.description || 'A comprehensive lesson covering key concepts and applications.',
            learningObjectives: rememberLevelContent.learningObjectives.map(objectiveText => ({
                text: objectiveText,
                bloomLevel: 'remember'
            })),
            keyConcepts: rememberLevelContent.coreComponents.map(component => ({
                concept: component.term,
                explanation: component.definition,
                examples: []
            })),
            sections: levelLessons,
            status: 'draft',
            generatedAt: new Date(),
        });

        await newLesson.save();

        res.status(201).json({
            message: "Lesson generated successfully",
            lesson: newLesson
        })

    } catch (error) {
        console.error("Error generating lesson:", error);
        res.status(500).json({
            message: "Error generating lesson",
            error: error.message
        })
    }

}

// Get all lessons for the authenticated user
export const getLessons = async (req, res) => {
    try {
        const foundLessons = await Lesson.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Lessons fetched successfully",
            lessons: foundLessons
        })


    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({
            message: "Error fetching lessons",
            error: error.message
        })
    }
}

// Get a lesson by ID
export const getLessonById = async (req, res) => {
    try {

        const foundLesson = await Lesson.findOne({
            userId: req.user._id,
            _id: req.params.id
        })

        if(!foundLesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        res.status(200).json({
            message: "Lesson fetched successfully",
            lesson: foundLesson
        })
        
    } catch (error) {
        console.error("Error fetching lesson:", error);
        res.status(500).json({
            message: "Error fetching lesson",
            error: error.message
        })
    }
}