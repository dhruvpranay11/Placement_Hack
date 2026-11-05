import { z } from 'zod';

/**
 * Full onboarding schema — all fields required on first setup.
 */
export const onboardingSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),

  college: z
    .string()
    .min(2, 'College name is required')
    .max(200),

  degree: z
    .string()
    .min(1, 'Degree is required')
    .max(100),

  branch: z
    .string()
    .min(1, 'Branch is required')
    .max(100),

  academic_year: z
    .enum(['1st', '2nd', '3rd', '4th', '5th'], {
      errorMap: () => ({ message: 'Invalid academic year' }),
    }),

  graduation_year: z
    .number()
    .int()
    .min(2024, 'Graduation year must be 2024 or later')
    .max(2030, 'Graduation year must be 2030 or earlier'),

  target_role: z
    .enum(
      ['sde', 'data_scientist', 'data_analyst', 'product_manager', 'devops', 'full_stack', 'frontend', 'backend', 'other'],
      { errorMap: () => ({ message: 'Invalid target role' }) },
    ),

  preferred_language: z
    .enum(
      ['cpp', 'java', 'python', 'javascript', 'typescript', 'other'],
      { errorMap: () => ({ message: 'Invalid preferred language' }) },
    ),

  coding_proficiency: z
    .enum(['beginner', 'intermediate', 'advanced'], {
      errorMap: () => ({ message: 'Invalid coding proficiency level' }),
    }),

  dsa_experience: z
    .enum(['none', 'beginner', 'intermediate', 'advanced'], {
      errorMap: () => ({ message: 'Invalid DSA experience level' }),
    }),

  aptitude_proficiency: z
    .enum(['none', 'beginner', 'intermediate', 'advanced'], {
      errorMap: () => ({ message: 'Invalid aptitude proficiency level' }),
    }),

  core_cs_proficiency: z
    .enum(['none', 'beginner', 'intermediate', 'advanced'], {
      errorMap: () => ({ message: 'Invalid core CS proficiency level' }),
    }),

  development_experience: z
    .enum(['none', 'beginner', 'intermediate', 'advanced'], {
      errorMap: () => ({ message: 'Invalid development experience level' }),
    }),

  daily_prep_time: z
    .enum(['30min', '1hr', '2hr', '3hr', '4hr_plus'], {
      errorMap: () => ({ message: 'Invalid daily prep time' }),
    }),

  placement_timeline: z
    .enum(['1_month', '3_months', '6_months', '12_months'], {
      errorMap: () => ({ message: 'Invalid placement timeline' }),
    }),

  learning_goals: z
    .array(z.string().min(1))
    .min(1, 'Select at least one learning goal')
    .max(10, 'Too many learning goals'),
});

/**
 * Profile update schema — partial version for PATCH updates.
 */
export const profileUpdateSchema = onboardingSchema.partial();
