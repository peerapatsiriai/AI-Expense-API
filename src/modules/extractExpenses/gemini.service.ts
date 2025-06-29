import axios, { AxiosResponse } from 'axios';
import { EXPENSE_EXTRACTION_PROMPT } from '../../prompts/expenseExtractor';
import { ExpenseResult, GeminiResponse } from './extract.dto';
import appConfig from '../../config/appConfig';

// Initialize API configuration
const getApiConfig = () => {
  const apiKey = appConfig.geminiApiKey;
  const baseURL = appConfig.geminiBaseURL;
  const model = appConfig.geminiModel;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  
  return {
    apiKey,
    baseURL,
    model,
  };
};

export const createGeminiRequest = async (question: string): Promise<string> => {
  try {
    const config = getApiConfig();
    
    const response: AxiosResponse<GeminiResponse> = await axios.post(
      `${config.baseURL}/models/${config.model}:generateContent?key=${config.apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: question
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      return 'No response generated';
    }
  } catch (error: any) {
    throw new Error(`API request failed: ${error.response?.data?.error?.message || error.message}`);
  }
};

export const askQuestion = async (question: string): Promise<string> => {
  return await createGeminiRequest(question);
};

async function extractExpenses(text: string): Promise<ExpenseResult> {
  const fullPrompt = EXPENSE_EXTRACTION_PROMPT + text;
  const response = await createGeminiRequest(fullPrompt);
  
  try {
    // Extract JSON from the response (remove markdown code blocks if present)
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : response;
    
    return JSON.parse(jsonString.trim()) as ExpenseResult;
  } catch (parseError: any) {
    throw new Error(`Failed to parse JSON response: ${parseError.message}. Raw response: ${response}`);
  }
}

export { extractExpenses }; 