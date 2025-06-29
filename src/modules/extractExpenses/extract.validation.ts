import * as yup from 'yup';

// Validation schema for expense extraction request
export const extractExpensesSchema = yup.object({
  text: yup
    .string()
    .required('Text is required')
    .min(1, 'Text cannot be empty')
    .max(10000, 'Text is too long (max 10,000 characters)')
    .trim()
});

// Type for validated request body
export type ExtractExpensesRequest = yup.InferType<typeof extractExpensesSchema>;
