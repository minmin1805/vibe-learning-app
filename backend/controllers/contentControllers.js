import Content from "../models/Content.js";
import * as cheerio from 'cheerio';
import axios from "axios";

// Process url content
export const processUrlContent = async (req, res) => {
    try {
        const { url } = req.body;

        if(!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required",
            });
        }
        
        // get the html content of the url
        const htmlContent = await axios.get(url);
        // console.log(htmlContent.data);

        /// load the html content into cheerio
        const $ = cheerio.load(htmlContent.data);

        // extract the title
        const extractedTitle = $("title").text();

        // extract the heading + all the paragraphs
        let extractedText = '';
        $('h1, h2, h3, p').each((i, el) => {
            extractedText += $(el).text() + '\n\n'
        });
        // console.log(extractedText);

        // extract the metadata
        const extractedMetadata = {
            wordCount: extractedText.split(" ").length,
            estimatedReadingTime: Math.ceil(extractedText.split(" ").length / 200), // 200 words per minute
            sourceUrl: url,
            author: $("meta[name='author']").attr("content") || "Unknown",
            description: $('meta[name="description"]').attr("content") || "No description available",
            publishedDate: $('meta[property="article:published_time"]').attr("content") || new Date(),

        }

        console.log(req.user);

        // save the content to the database
        const newContent = new Content({
            userId: req.user.id,
            type: "url",
            originalSource: url,
            title: extractedTitle,
            extractedText: extractedText,
            metadata: extractedMetadata,
            status: "completed",
            processedAt: new Date(),
        })

        // console.log(newContent);

        await newContent.save();

        res.status(200).json({
            success: true,
            message: "Content processed successfully",
            content: newContent,
        })
        
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error processing url content",
            error: error.message,
        });
    }
}

export const processPdfContent = async (req, res) => {
    try {
        const { pdf } = req.body;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error processing pdf content",
        });
    }
}

export const processYoutubeContent = async (req, res) => {
    try {
        const { youtubeUrl } = req.body;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error processing youtube content",
        });
    }
}