import { Router } from 'express';
import multer from 'multer';
import { 
  extractTextController, 
  healthOcrController 
} from './ocr.controller';

const ocrRoutes = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    // Accept image files
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only image files and PDFs are allowed'));
    }
  }
});

/**
 * @swagger
 * /api/expenses/v1/ocr/extract:
 *   post:
 *     summary: Extract text from images and documents
 *     description: Upload image files or PDFs and extract text using AI OCR technology
 *     tags: [OCR]
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
 *                 description: Image files or PDFs to extract text from (max 5 files, 50MB each)
 *               box_threshold:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 1
 *                 default: 0.4
 *                 description: Confidence threshold for text detection (0.0 to 1.0)
 *             required:
 *               - files
 *     responses:
 *       200:
 *         description: Text extraction completed successfully
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
 *                         example: "receipt.jpg"
 *                       status:
 *                         type: string
 *                         example: "success"
 *                       result:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             text:
 *                               type: string
 *                               example: "กาแฟ 60 บาท"
 *                             confidence:
 *                               type: number
 *                               example: 0.95
 *                             bbox:
 *                               type: array
 *                               items:
 *                                 type: number
 *                               example: [100, 200, 300, 250]
 *                 message:
 *                   type: string
 *                   example: "Text extraction completed successfully"
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
ocrRoutes.post('/extract', upload.array('files', 5), extractTextController);

/**
 * @swagger
 * /api/expenses/v1/ocr/health:
 *   get:
 *     summary: Check OCR service health
 *     description: Verify that the OCR service is working properly
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
 *                   example: "OCR Service"
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
ocrRoutes.get('/health', healthOcrController);

export { ocrRoutes }; 