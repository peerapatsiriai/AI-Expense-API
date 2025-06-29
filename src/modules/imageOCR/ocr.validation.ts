import * as yup from 'yup';

export const ocrSchema = yup.object({
  files: yup
    .array()
    .min(1, 'At least one file is required')
    .max(5, 'Maximum 5 files allowed')
    .required('Files are required'),
  box_threshold: yup
    .number()
    .min(0, 'Box threshold must be at least 0')
    .max(1, 'Box threshold must be at most 1')
    .optional()
    .default(0.4)
});

export const ocrFileValidation = yup.object({
  files: yup
    .array()
    .of(
      yup.object({
        fieldname: yup.string().required(),
        originalname: yup.string().required(),
        encoding: yup.string().required(),
        mimetype: yup.string().required(),
        size: yup.number().max(50 * 1024 * 1024, 'File size must be less than 50MB').required(),
        buffer: yup.mixed().required()
      })
    )
    .min(1, 'At least one file is required')
    .max(5, 'Maximum 5 files allowed')
    .required('Files are required')
});

export const ocrParamsValidation = yup.object({
  box_threshold: yup
    .number()
    .min(0, 'Box threshold must be at least 0')
    .max(1, 'Box threshold must be at most 1')
    .optional()
    .default(0.4)
}); 