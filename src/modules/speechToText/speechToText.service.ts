import axios from "axios";
import FormData from "form-data";
import { SpeechToTextRequest, SpeechToTextResponse } from "./speechToText.dto";
import appConfig from "@/config/appConfig";
import { mockApiResponse } from "./mock.api.response";

// Configuration constants
const API_KEY = appConfig.speechToTextApiKey;
const BASE_URL = appConfig.speechToTextBaseURL;
const MOCK_RESPONSE = appConfig.mockAIResponse;

export const transcribeAudio = async (
    files: any[],
): Promise<SpeechToTextResponse> => {
    try {
        const formData = new FormData();

        const boostingWords = ["บาท", "เช้า", "กลางวัน", "กลางคืน", "เทียง", "กิน", "จ่าย", "เย็น", "ซื่อ", "บิล"]

        // Add files to form data
        files.forEach((file, index) => {
            formData.append("files", file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype,
            });
        });
    
        boostingWords.forEach((word) => {
            formData.append("boosting_words", word);
        });
        
        if (MOCK_RESPONSE) {

            return [mockApiResponse] as unknown as SpeechToTextResponse;

        } else {
            const response = await axios.post(`${BASE_URL}/predict`, formData, {
                headers: {
                    "X-API-Key": API_KEY,
                    ...formData.getHeaders(),
                },
                timeout: 30000, // 30 seconds timeout
            });
            return response.data;
        }

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            throw new Error(
                `Speech-to-text API error: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
        throw new Error(`Speech-to-text service error: ${error}`);
    }
};
