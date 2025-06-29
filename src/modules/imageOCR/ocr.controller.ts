import { Request, Response } from 'express';
import { extractTextFromImages, testConnection } from './ocr.service';

export const extractTextController = async (req: Request, res: Response) => {
  try {
    const files = req.files as any[];
    const boxThreshold = req.body.box_threshold ? parseFloat(req.body.box_threshold) : undefined;

    const result = await extractTextFromImages(files, boxThreshold);

    res.status(200).json({
      success: true,
      data: result,
      message: 'Text extraction completed successfully'
    });
  } catch (error) {
    console.error('Extract text error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500
    });
  }
};

export const healthOcrController = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: 'OK',
      service: 'OCR Service',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      endpoints: {
        extract: 'POST /api/ocr/v1/extract',
        test: 'GET /api/ocr/v1/test',
        health: 'GET /api/ocr/v1/health'
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500
    });
  }
}; 