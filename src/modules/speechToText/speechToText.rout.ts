import { Router } from 'express';
import multer from 'multer';
import { 
  transcribeAudioController,   
  healthSpeechToTextController 
} from './speechToText.controller';
import { validateBody } from '@/middleware/validation';
import { speechToTextSchema } from './speechToText.validation';

const speechToTextRoutes = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    // Accept audio files
    if (file.mimetype.startsWith('audio/') || file.mimetype === 'application/octet-stream') {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'));
    }
  }
});

/**
 * @swagger
 * /api/expenses/v1/speech-to-text/transcribe:
 *   post:
 *     summary: Transcribe audio files to text
 *     description: Upload audio files and convert them to text using AI speech recognition
 *     tags: [Speech-to-Text]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Audio files to transcribe (max 5 files, 50MB each)
 *               boosting_words:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Optional words to boost recognition accuracy
 *                 example: ["สวัสดี", "วันจันทร์"]
 *             required:
 *               - files
 *     responses:
 *       200:
 *         description: Audio transcription completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       filename:
 *                         type: string
 *                         example: "voice_01.m4a"
 *                       status:
 *                         type: string
 *                         example: "success"
 *                       result:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             speaker:
 *                               type: string
 *                               example: "SPEAKER_00"
 *                             transcript:
 *                               type: string
 *                               example: "มื้อเช้ากินโจ๊กห้าสิบบาทยามเที่ยงกินก๋วยเตี๋ยวเจ็ดสิบห้าบาท"
 *                             start_time:
 *                               type: number
 *                               example: 0.6143344709897611
 *                             end_time:
 *                               type: number
 *                               example: 6.928327645051194
 *                       duration:
 *                         type: number
 *                         example: 10.922666666666666
 *                 message:
 *                   type: string
 *                   example: "Audio transcription completed successfully"
 *       400:
 *         description: Bad request - validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// speechToTextRoutes.post('/transcribe', validateBody(speechToTextSchema), upload.array('files', 5), transcribeAudioController);
speechToTextRoutes.post('/transcribe', upload.array('files', 5), transcribeAudioController);

/**
 * @swagger
 * /api/expenses/v1/speech-to-text/health:
 *   get:
 *     summary: Check speech-to-text service health
 *     description: Verify that the speech-to-text service is working properly
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 service:
 *                   type: string
 *                   example: "Speech-to-Text Service"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 endpoints:
 *                   type: object
 *                   description: Available endpoints for this service
 */
speechToTextRoutes.get('/health', healthSpeechToTextController);

export { speechToTextRoutes }; 