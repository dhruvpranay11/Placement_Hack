import env from '../config/env.js';

/**
 * Custom application error with an HTTP status code.
 */
export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error-handling middleware.
 * Handles Zod validation errors, Supabase errors, AppErrors, and unknowns.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // ── Zod validation errors ──────────────────────────────────────────
  if (err.name === 'ZodError' || err.issues) {
    statusCode = 422;
    const formatted = (err.issues || err.errors || []).map((issue) => ({
      field: issue.path?.join('.') || 'unknown',
      message: issue.message,
    }));
    return res.status(statusCode).json({
      success: false,
      error: 'Validation failed',
      details: formatted,
    });
  }

  // ── Supabase / PostgREST errors ────────────────────────────────────
  if (err.code && err.details && err.hint !== undefined) {
    statusCode = 400;
    message = env.NODE_ENV === 'production' ? 'Database operation failed' : err.message;
  }

  // ── Operational AppError ───────────────────────────────────────────
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      error: message,
    });
  }

  // ── Unknown / unexpected errors ────────────────────────────────────
  console.error('💥 Unexpected error:', err);

  return res.status(statusCode).json({
    success: false,
    error: env.NODE_ENV === 'production' ? 'Internal server error' : message,
  });
};

export default errorHandler;
