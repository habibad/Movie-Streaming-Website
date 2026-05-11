import { Router } from 'express';
import {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
} from '../controllers/actorController.js';

const router = Router();

router.get('/', getAllActors);
router.get('/:id', getActorById);
router.post('/', createActor);
router.patch('/:id', updateActor);

export default router;
