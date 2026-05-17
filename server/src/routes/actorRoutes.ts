import { Router } from 'express';
import {
  getActorById,
  getAllActors
} from '../controllers/actorController';

const router = Router();

router.get('/all-actors', getAllActors);
router.get('/actors/:id', getActorById);

export default router;
