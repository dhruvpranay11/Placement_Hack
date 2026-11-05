import { supabaseAdmin } from '../config/supabase.js';
import { success, error } from '../utils/response.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * GET /api/profile
 * Fetch the authenticated user's profile along with their hunter_stats.
 */
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { data: profile, error: profileErr } = await supabaseAdmin
      .from('profiles')
      .select('*, hunter_stats(*)')
      .eq('id', userId)
      .single();

    if (profileErr) {
      if (profileErr.code === 'PGRST116') {
        return error(res, 'Profile not found', 404);
      }
      throw new AppError(profileErr.message, 400);
    }

    return success(res, profile);
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/profile
 * Update the authenticated user's profile fields.
 */
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { data: profile, error: updateErr } = await supabaseAdmin
      .from('profiles')
      .update(req.body)
      .eq('id', userId)
      .select()
      .single();

    if (updateErr) {
      throw new AppError(updateErr.message, 400);
    }

    return success(res, profile);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/onboarding
 * Complete onboarding — upsert profile, create hunter_stats,
 * and mark onboarding as completed. Uses supabaseAdmin for elevated access.
 */
export const completeOnboarding = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;

    // Upsert profile with onboarding data
    const { data: profile, error: upsertErr } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: userId,
          ...profileData,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' },
      )
      .select()
      .single();

    if (upsertErr) {
      throw new AppError(upsertErr.message, 400);
    }

    // Create initial hunter_stats (ignore conflict if already exists)
    const { error: statsErr } = await supabaseAdmin
      .from('hunter_stats')
      .upsert(
        {
          user_id: userId,
          hunter_rank: 'Unranked',
          total_xp: 0,
          level: 1,
          current_streak: 0,
          longest_streak: 0,
          problems_solved: 0,
          quests_completed: 0,
          achievements_unlocked: 0,
        },
        { onConflict: 'user_id' },
      );

    if (statsErr) {
      console.error('Failed to create hunter_stats:', statsErr.message);
      // Non-fatal — profile was saved successfully
    }

    return success(res, { profile, onboarding_completed: true }, 201);
  } catch (err) {
    next(err);
  }
};
