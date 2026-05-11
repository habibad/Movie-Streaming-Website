import { Router } from 'express';
import { getAllInterviews, getActiveInterview } from '../controllers/interviewController';

const router = Router();

router.get('/', getAllInterviews);
router.get('/active', getActiveInterview);

export default router;
