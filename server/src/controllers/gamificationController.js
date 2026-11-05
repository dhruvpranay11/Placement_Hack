import { supabaseAdmin } from '../config/supabase.js';
import { success, error } from '../utils/response.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * GET /api/gamification/profile
 * Fetch hunter_stats + recent achievements + recent xp_transactions.
 */
export const getHunterProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch hunter stats
    const { data: stats, error: statsErr } = await supabaseAdmin
      .from('hunter_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (statsErr) {
      if (statsErr.code === 'PGRST116') {
        return error(res, 'Hunter profile not found. Complete onboarding first.', 404);
      }
      throw new AppError(statsErr.message, 400);
    }

    // Fetch recent achievements (last 10 unlocked)
    const { data: achievements } = await supabaseAdmin
      .from('user_achievements')
      .select('*, achievements(*)')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false })
      .limit(10);

    // Fetch recent XP transactions (last 20)
    const { data: xpTransactions } = await supabaseAdmin
      .from('xp_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    return success(res, {
      stats,
      recent_achievements: achievements || [],
      recent_xp_transactions: xpTransactions || [],
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/gamification/achievements
 * Fetch all achievements with user unlock status.
 */
export const getAchievements = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch all available achievements
    const { data: allAchievements, error: achErr } = await supabaseAdmin
      .from('achievements')
      .select('*')
      .order('xp_reward', { ascending: false });

    if (achErr) {
      throw new AppError(achErr.message, 400);
    }

    // Fetch user's unlocked achievement IDs
    const { data: unlocked } = await supabaseAdmin
      .from('user_achievements')
      .select('achievement_id, unlocked_at')
      .eq('user_id', userId);

    const unlockedMap = new Map(
      (unlocked || []).map((u) => [u.achievement_id, u.unlocked_at]),
    );

    // Merge unlock status into each achievement
    const merged = (allAchievements || []).map((ach) => ({
      ...ach,
      unlocked: unlockedMap.has(ach.id),
      unlocked_at: unlockedMap.get(ach.id) || null,
    }));

    return success(res, merged);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/gamification/quests
 * Fetch active user_quests for today.
 */
export const getQuests = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const { data: quests, error: questErr } = await supabaseAdmin
      .from('user_quests')
      .select('*, quests(*)')
      .eq('user_id', userId)
      .gte('assigned_date', today)
      .lte('assigned_date', today)
      .order('assigned_date', { ascending: false });

    if (questErr) {
      throw new AppError(questErr.message, 400);
    }

    return success(res, quests || []);
  } catch (err) {
    next(err);
  }
};

// ── Stub methods for M2 expansion ────────────────────────────────────

/**
 * Award XP to a user (stub — will be expanded in M2).
 */
export const awardXP = async (_userId, _amount, _source, _description) => {
  // TODO: implement XP awarding logic with level-up checks
  return null;
};

/**
 * Recalculate hunter rank (stub — will be expanded in M2).
 */
export const recalculateRank = async (_userId) => {
  // TODO: implement rank calculation based on XP thresholds
  return null;
};
