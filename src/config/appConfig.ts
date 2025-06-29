import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    geminiApiKey: process.env.GEMINI_API_KEY,
    geminiModel: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    geminiBaseURL: process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta",
   
    speechToTextApiKey: process.env.SPEECH_TO_TEXT_API_KEY,
    speechToTextBaseURL: process.env.SPEECH_TO_TEXT_BASE_URL || "https://stt.infer.visai.ai",

    ocrApiKey: process.env.OCR_API_KEY,
    ocrBaseURL: process.env.OCR_BASE_URL || "https://ocrdoc.infer.visai.ai",

    apiVersion: process.env.API_VERSION || "v1",
    port: process.env.PORT || 3000,
    apiBaseURL: process.env.API_BASE_URL || "http://localhost",
    mockAIResponse: process.env.MOCK_AI_RESPONSE === "true" ? true : false,
}

export default appConfig;