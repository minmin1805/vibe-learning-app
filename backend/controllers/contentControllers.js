import Content from "../models/Content.js";
import * as cheerio from "cheerio";
import axios from "axios";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import TranscriptClient from "youtube-transcript-api";

// Process url content
export const processUrlContent = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
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
    let extractedText = "";
    $("h1, h2, h3, p").each((i, el) => {
      extractedText += $(el).text() + "\n\n";
    });
    // console.log(extractedText);

    // extract the metadata
    const extractedMetadata = {
      wordCount: extractedText.split(" ").length,
      estimatedReadingTime: Math.ceil(extractedText.length / 200), // 200 words per minute
      sourceUrl: url,
      author: $("meta[name='author']").attr("content") || "Unknown",
      description:
        $('meta[name="description"]').attr("content") ||
        "No description available",
      publishedDate:
        $('meta[property="article:published_time"]').attr("content") ||
        new Date(),
    };

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
    });

    // console.log(newContent);

    await newContent.save();
    console.log("Content saved successfully");

    res.status(200).json({
      success: true,
      message: "Content processed successfully",
      content: newContent,
    });
  } catch (error) {
    console.error("Error processing url content:", error);
    res.status(500).json({
      success: false,
      message: "Error processing url content",
      error: error.message,
    });
  }
};

export const processPdfContent = async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    // Extract text using pdf-parse
    const data = await pdfParse(req.file.buffer);
    const extractedText = data.text;
    const extractedTitle = req.file.originalname.replace(/\.pdf$/i, "");
    const wordCount = extractedText.split(/\s+/).length;

    const metadata = {
      fileSize: req.file.size,
      wordCount,
      estimatedReadTime: Math.ceil(wordCount / 200),
      numPages: data.numpages,
      info: data.info,
      version: data.version,
    };

    const content = new Content({
      userId: req.user.id,
      type: "pdf",
      originalSource: req.file.originalname,
      title: extractedTitle,
      extractedText,
      metadata,
      processedAt: new Date(),
      status: "completed",
      createdAt: new Date(),
    });
    await content.save();

    res.json({
      success: true,
      contentId: content._id,
      title: content.title,
      type: content.type,
      status: content.status,
      message: "PDF processed successfully",
    });
  } catch (error) {
    console.error("PDF processing error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function to extract videoId from a YouTube URL
function extractVideoId(url) {
  // Handle null/undefined input
  if (!url || typeof url !== "string") {
    return null;
  }

  // Updated regex to handle more YouTube URL formats
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|watch)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const processYoutubeContent = async (req, res) => {
  try {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
      return res.status(400).json({
        success: false,
        message: "Youtube URL is required",
      });
    }

    // Extract videoId from URL
    const videoId = extractVideoId(youtubeUrl);
    console.log(videoId);
    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube URL. Could not extract video ID.",
      });
    }

    const client = new TranscriptClient();
    await client.ready;
    const transcriptObj = await client.getTranscript(videoId);
    // Find the English transcript (manual or auto-generated)
    const englishTrack = transcriptObj.tracks.find(
      (t) =>
        t.language === "English" || t.language === "English (auto-generated)"
    );

    if (!englishTrack || !englishTrack.transcript) {
      return res.status(404).json({
        success: false,
        message: "No English transcript found for this video.",
      });
    }

    const fullTranscript = englishTrack.transcript
      .map((seg) => seg.text)
      .join(" ");

    const pmr = transcriptObj.microformat.playerMicroformatRenderer;

    const metadata = {
      wordCount: fullTranscript.split(/\s+/).length,
      estimatedReadingTime: Math.ceil((parseInt(pmr.lengthSeconds) || 0) / 60 * 130),
      sourceUrl: youtubeUrl,
      author: pmr.ownerChannelName,
      publishedDate: pmr.publishDate,
      duration: pmr.lengthSeconds, // for youtube
      description: pmr.description?.simpleText || pmr.description || "",
    };

    const newContent = new Content({
      userId: req.user.id,
      type: "youtube",
      originalSource: youtubeUrl,
      title: pmr.title?.simpleText || pmr.title || transcriptObj.title || "Untitled",
      extractedText: fullTranscript,
      metadata: metadata,
      status: "completed",
      processedAt: new Date(),
    });


    await newContent.save();

    res.status(200).json({
      success: true,
      content: newContent,
    });
  } catch (error) {
    console.error("Error processing youtube content:", error);
    res.status(500).json({
      success: false,
      message: "Error processing youtube content",
      error: error.message,
    });
  }
};
