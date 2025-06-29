import axios from "axios";
import FormData from "form-data";
import { OcrRequest, OcrResponse } from "./ocr.dto";
import appConfig from "@/config/appConfig";
import { mockOcrResponse } from "./mock.api.response";

// Configuration constants
const API_KEY = appConfig.ocrApiKey;
const BASE_URL = appConfig.ocrBaseURL;
const MOCK_RESPONSE = appConfig.mockAIResponse;

export const extractTextFromImages = async (
    files: any[],
    boxThreshold?: number
): Promise<OcrResponse> => {
    try {
        const formData = new FormData();

        // Add files to form data
        files.forEach((file, index) => {
            formData.append("files", file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype,
            });
        });

        // Add box threshold if provided
        if (boxThreshold !== undefined) {
            formData.append("box_threshold", boxThreshold.toString());
        }

        if (MOCK_RESPONSE) {

            return [mockOcrResponse] as unknown as OcrResponse;

        } else {
            const response = await axios.post(`${BASE_URL}/predict`, formData, {
                headers: {
                    "X-API-Key": API_KEY,
                    ...formData.getHeaders(),
                },
                timeout: 60000, // 60 seconds timeout for OCR processing
            });

            return response.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                `OCR API error: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
        throw new Error(`OCR service error: ${error}`);
    }
};

export const testConnection = async (): Promise<boolean> => {
    try {
        // Simple health check or test endpoint
        const response = await axios.get(`${BASE_URL}/health`, {
            headers: {
                "X-API-Key": API_KEY,
            },
            timeout: 5000,
        });
        return response.status === 200;
    } catch (error) {
        // If health endpoint doesn't exist, we'll consider it a connection issue
        return false;
    }
};
