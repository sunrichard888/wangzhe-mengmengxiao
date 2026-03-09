import express from 'express';
import cors from 'cors';
import { initDatabase, db } from './db/sqlite';
import { leaderboardRouter } from './routes/leaderboard';
import { levelsRouter } from './routes/levels';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/levels', levelsRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  });
});

// Start server
async function startServer() {
  try {
    // Initialize database
    await initDatabase();
    console.log('✅ Database initialized');

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API endpoints:`);
      console.log(`   - GET  /health`);
      console.log(`   - POST /api/leaderboard`);
      console.log(`   - GET  /api/leaderboard`);
      console.log(`   - GET  /api/levels/:id`);
      console.log(`   - PUT  /api/levels/:id/complete`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Shutting down gracefully...');
  if (db) {
    db.close();
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 Shutting down gracefully...');
  if (db) {
    db.close();
  }
  process.exit(0);
});

// Start the server
startServer();

export default app;
