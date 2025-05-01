import { genAI, MODELS } from './config';
import type { ExtractedRoadmap } from '@/lib/utils/types';
// import type { GenerativeModel, Content } from '@google/generative-ai';

const EXTRACTION_PROMPT = `
  Analyze this content and extract information in the following format:
  - Main topic/title
  - Overall description
  - Subtopics with their descriptions
  
  Format the response as a JSON object with the following structure:
  {
    "title": "main topic",
    "description": "overall description",
    "subtopics": [
      {
        "title": "subtopic title",
        "description": "subtopic description"
      }
    ]
  }

  Make sure to:
  1. Keep the title concise and clear
  2. Provide a comprehensive description
  3. Extract meaningful subtopics
  4. Ensure all JSON is properly formatted
`;

export async function extractRoadmapInfo(
    content: string | File,
    type: 'text' | 'image' = 'text'
): Promise<ExtractedRoadmap> {
    try {
        const model = genAI.getGenerativeModel({
            model: type === 'text' ? MODELS.TEXT : MODELS.VISION
        });

        let parts;
        if (type === 'text') {
            parts = [{ text: EXTRACTION_PROMPT }, { text: content as string }];
        } else {
            const imageData = await fileToGenerativePart(content as File);
            parts = [{ text: EXTRACTION_PROMPT }, imageData];
        }

        const result = await model.generateContent(parts);
        const response = await result.response;
        try {
            return JSON.parse(response.text());
        } catch (parseError) {
            console.error('Error parsing Gemini response:', parseError);
            throw new Error('Failed to parse AI response');
        }
    } catch (error) {
        console.error('Gemini API error:', error);
        if (error instanceof Error && error.message.includes('404')) {
            throw new Error('Invalid Gemini API configuration. Please check your API key and model name.');
        }
        throw new Error('Failed to extract roadmap information');
    }
}

interface GenerativePart {
    inlineData: {
        data: string;
        mimeType: string;
    };
}

async function fileToGenerativePart(file: File): Promise<GenerativePart> {
    const base64EncodedImage = await fileToBase64(file);
    return {
        inlineData: {
            data: base64EncodedImage,
            mimeType: file.type
        }
    };
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                // Remove data URL prefix
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            } else {
                reject(new Error('Failed to convert file to base64'));
            }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}