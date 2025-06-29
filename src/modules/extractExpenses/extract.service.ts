import { createGeminiRequest } from './gemini.service';
import { EXPENSE_EXTRACTION_PROMPT } from '../../prompts/expenseExtractor';
import { ExpenseResult } from './extract.dto';

export const extractExpenses = async (text: string): Promise<ExpenseResult> => {
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
}; 