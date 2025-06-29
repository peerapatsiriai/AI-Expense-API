import { Router } from 'express';
import {extractRoutes} from '@/modules/extractExpenses/extract.rout';
import {speechToTextRoutes} from '@/modules/speechToText/speechToText.rout';
import {ocrRoutes} from '@/modules/imageOCR/ocr.rout';

const router = Router();

router.use('/v1/extract', extractRoutes);
router.use('/v1/speech-to-text', speechToTextRoutes);
router.use('/v1/ocr', ocrRoutes);

export default router; 