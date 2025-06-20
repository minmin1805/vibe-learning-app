// This route is being used to test creating lessons with AI

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { bloomLevelPrompts } from "../config/bloomLevel.js";
import Ajv from "ajv";
import { bloomLevelSchemas } from "../config/bloomLevel.js";
import OpenAI from "openai";
import Content from "../models/Content.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

const ajv = new Ajv();


router.post("/test-bloom-level", verifyToken, async (req, res) => {
    try {
      const { level, contentId } = req.body;
  
      if (!level || !contentId) {
        return res.status(400).json({ 
          message: 'Level and contentId are required' 
        });
      }

      const foundContent = await Content.findById(contentId);

      if(!foundContent) {
        return res.status(404).json({
          message: 'Content not found'
        })
      }
  
      if (!bloomLevelPrompts[level]) {
        return res.status(400).json({ 
          message: 'Invalid Bloom\'s level',
          validLevels: Object.keys(bloomLevelPrompts)
        });
      }
  
      // Construct the prompt
      const prompt = `${bloomLevelPrompts[level]}\n\nContent: ${foundContent.extractedText}`;
  
      // Generate content using OpenAI
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4-turbo-preview',
        response_format: { type: 'json_object' }
      });
  
      // Parse the response
      const generatedContent = JSON.parse(completion.choices[0].message.content);
  
      // Validate against schema
      const validate = ajv.compile(bloomLevelSchemas[level]);
      const isValid = validate(generatedContent);
  
      if (!isValid) {
        return res.status(400).json({
          message: 'Generated content does not match schema',
          errors: validate.errors
        });
      }
  
      res.json({
        message: 'Content generated successfully',
        level,
        content: generatedContent
      });
  
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({ 
        message: 'Error generating content',
        error: error.message 
      });
    }
  });

export default router;