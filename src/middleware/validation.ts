import { Request, Response, NextFunction } from 'express';
import { Schema } from 'yup';

// Specific validation for body only
export const validateBody = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body, { abortEarly: false });
      req.body = validatedBody;
      next();
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const errors = error.errors.map((err: string) => err);
        return res.status(400).json({
          error: 'Validation failed',
          message: 'Request body validation failed',
          details: errors,
          status: 400
        });
      }
      
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Validation middleware error',
        status: 500
      });
    }
  };
}; 