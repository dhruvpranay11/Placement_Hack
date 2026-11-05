import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getHunterProfile,
  getAchievements,
  getQuests,
} from '../controllers/gamificationController.js';

const router = Router();

// GET /api/gamification/profile — hunter stats + recent data
router.get('/profile', authenticate, getHunterProfile);

// GET /api/gamification/achievements — all achievements with unlock status
router.get('/achievements', authenticate, getAchievements);

// GET /api/gamification/quests — today's active quests
router.get('/quests', authenticate, getQuests);

export default router;
