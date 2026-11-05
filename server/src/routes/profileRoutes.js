import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../validators/common.js';
import { onboardingSchema, profileUpdateSchema } from '../validators/profile.js';
import {
  getProfile,
  updateProfile,
  completeOnboarding,
} from '../controllers/profileController.js';

const router = Router();

// GET  /api/profile — fetch current user profile
router.get('/', authenticate, getProfile);

// PATCH /api/profile — update profile fields
router.patch('/', authenticate, validate(profileUpdateSchema), updateProfile);

// POST /api/onboarding — complete onboarding
router.post('/onboarding', authenticate, validate(onboardingSchema), completeOnboarding);

export default router;
