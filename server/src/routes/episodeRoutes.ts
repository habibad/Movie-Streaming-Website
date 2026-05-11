import { Router } from 'express';
import {
  getAllEpisodes,
  getNowPlaying,
  getUpcoming,
  createEpisode,
  getEpisodeById,
} from '../controllers/episodeController';

const router = Router();

router.get('/', getAllEpisodes);
router.get('/now-playing', getNowPlaying);
router.get('/upcoming', getUpcoming);
router.get('/:id', getEpisodeById);
router.post('/', createEpisode);

export default router;
