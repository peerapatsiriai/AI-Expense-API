import { Router } from 'express';
import { 
  extractExpensesController, 
  testExtractController, 
  healthExtractController 
} from '@/modules/extractExpenses/extract.controller';
import { validateBody } from '@/middleware/validation';
import { extractExpensesSchema } from '@/modules/extractExpenses/extract.validation';

const extractRoutes = Router();

/**
 * @swagger
 * /api/expenses/v1/extract:
 *   post:
 *     summary: Extract expenses from text
 *     description: Use Google Gemini AI to extract expense information from Thai or English text
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Text containing expense information
 *                 example: "วันนี้ไปซื้อกาแฟ 60 บาท และซื้อขนมปัง 25 บาท"
 *             required:
 *               - text
 *     responses:
 *       200:
 *         description: Successfully extracted expenses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseResult'
 *             example:
 *               expenses:
 *                 - item: "กาแฟ"
 *                   price: 60
 *                 - item: "ขนมปัง"
 *                   price: 25
 *               total: 85
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
extractRoutes.post('/', validateBody(extractExpensesSchema), extractExpensesController);

/**
 * @swagger
 * /api/expenses/v1/test:
 *   get:
 *     summary: Test expense extraction with sample data
 *     description: Test the expense extraction functionality with a predefined Thai text
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: Successfully extracted expenses from test data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseResult'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
extractRoutes.get('/test', testExtractController);

/**
 * @swagger
 * /api/expenses/v1/health:
 *   get:
 *     summary: Check expense service health
 *     description: Verify that the expense extraction service is working properly
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
 *                   example: "Expense Extraction Service"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
extractRoutes.get('/health', healthExtractController);

export { extractRoutes }; 