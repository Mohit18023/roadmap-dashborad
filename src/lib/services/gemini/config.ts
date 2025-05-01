import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Missing Gemini API key');
}

export const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Current available models
export const MODELS = {
    TEXT: "gemini-pro",           // For text-only inputs
    VISION: "gemini-pro-vision"   // For image inputs
} as const;
