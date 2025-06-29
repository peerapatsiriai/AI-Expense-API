import { Request, Response } from 'express';
import { transcribeAudio } from './speechToText.service';

export const transcribeAudioController = async (req: Request, res: Response) => {
  try {
    const files = req.files as any[];

    if (!files || files.length === 0) {
      return res.status(400).json({
        error: 'No files uploaded',
        message: 'Please upload at least one file',
        status: 400
      });
    }

    const result = await transcribeAudio(files);

    res.status(200).json({
      success: true,
      data: result,
      message: 'Audio transcription completed successfully'
    });
  } catch (error) {
    console.error('Transcribe audio error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500
    });
  }
};

export const healthSpeechToTextController = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: 'OK',
      service: 'Speech-to-Text Service',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      endpoints: {
        transcribe: 'POST /api/speech-to-text/v1/transcribe',
        test: 'GET /api/speech-to-text/v1/test',
        health: 'GET /api/speech-to-text/v1/health'
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