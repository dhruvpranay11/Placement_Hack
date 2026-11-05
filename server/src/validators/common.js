import { z } from 'zod';

/**
 * Middleware factory — validates req.body against the provided Zod schema.
 * On failure, passes the ZodError to the global error handler.
 */
export const validate = (schema) => (req, _res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Reusable UUID v4 schema.
 */
export const uuidSchema = z.string().uuid('Invalid UUID format');
