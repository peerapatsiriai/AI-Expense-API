import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import routes from '@/routes/routes';
import appConfig from '@/config/appConfig';
import { swaggerOptions } from '@/config/swaggerConfig';
import { displayLogo } from '@/utils/disPlayLogo';

const app = express();
const PORT = appConfig.port;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Gemini Expense Extraction API'
  });
});

// API Routes - All routes under /api/expenses
app.use('/api/expenses', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    status: 500
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`,
    status: 404
  });
});

// Start server
app.listen(PORT, () => {
  // Validate environment variables
  const { geminiApiKey, speechToTextApiKey, ocrApiKey } = appConfig;

  if (!geminiApiKey || !speechToTextApiKey || !ocrApiKey) {
    console.error('Missing required environment variables');
    console.log("GEMINI_API_KEY: ", geminiApiKey);
    console.log("SPEECH_TO_TEXT_API_KEY: ", speechToTextApiKey);
    console.log("OCR_API_KEY: ", ocrApiKey);
    console.log("Please check your .env file and ensure all required variables are set.");
    process.exit(1);
  }

  displayLogo();
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Swagger documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app; 