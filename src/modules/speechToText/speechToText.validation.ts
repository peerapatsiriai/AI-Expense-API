import * as yup from 'yup';

export const speechToTextSchema = yup.object({
  files: yup
    .array()
    .min(1, 'At least one file is required')
    .required('Files are required'),
  boosting_words: yup
    .array()
    .of(yup.string().min(1, 'Boosting word cannot be empty'))
    .optional()
});
