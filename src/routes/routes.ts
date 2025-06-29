import { Router } from 'express';
import {extractRoutes} from '@/modules/extractExpenses/extract.rout';

const router = Router();

router.use('/v1/extract', extractRoutes);



export default router; 