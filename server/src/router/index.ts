import {Router} from 'express'
import actorsRouter from '../routes/actorRoutes'


const router = Router();
router.use('/actors', actorsRouter);
router.use('/actors', actorsRouter);
export default router