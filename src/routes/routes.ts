import { Router } from 'express';
import {extractRoutes} from '@/modules/extractExpenses/extract.rout';
import {speechToTextRoutes} from '@/modules/speechToText/speechToText.rout';

const router = Router();

router.use('/v1/extract', extractRoutes);
router.use('/v1/speech-to-text', speechToTextRoutes);

export default router; 