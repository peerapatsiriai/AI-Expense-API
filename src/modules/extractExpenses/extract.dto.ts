export interface Expense {
  item: string;
  price: number | string;
}

export interface ExpenseResult {
  expenses: Expense[];
  total: number;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
} 