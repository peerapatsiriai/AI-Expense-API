import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    geminiApiKey: process.env.GEMINI_API_KEY,
    geminiModel: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    geminiBaseURL: process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta",
    apiVersion: process.env.API_VERSION || "v1",
    port: process.env.PORT || 3000,
    apiBaseURL: process.env.API_BASE_URL || "http://localhost",
}

export default appConfig;