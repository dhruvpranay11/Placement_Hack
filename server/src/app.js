import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import env from './config/env.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import errorHandler from './middleware/errorHandler.js';

// Route imports
import profileRoutes from './routes/profileRoutes.js';
import gamificationRoutes from './routes/gamificationRoutes.js';

const app = express();

// ── Security & parsing middleware ────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logging ──────────────────────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── Rate limiting ────────────────────────────────────────────────────
app.use(generalLimiter);

// ── Health check ─────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    },
  });
});

// ── Mount routes ─────────────────────────────────────────────────────
app.use('/api/profile', profileRoutes);
app.use('/api/gamification', gamificationRoutes);

// ── 404 handler ──────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// ── Global error handler ─────────────────────────────────────────────
app.use(errorHandler);

// ── Start server ─────────────────────────────────────────────────────
app.listen(env.PORT, () => {
  console.log(`🚀 PlaceReady server running on port ${env.PORT} [${env.NODE_ENV}]`);
});

export default app;
