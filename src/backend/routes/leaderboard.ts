import { Router, Request, Response } from 'express';
import { getDatabase } from '../db/sqlite';
import { LeaderboardEntry, CreateLeaderboardEntry } from '../db/models';

export const leaderboardRouter = Router();

// GET /api/leaderboard - Get top scores
leaderboardRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const limit = parseInt(req.query.limit as string) || 10;
    const level = req.query.level as string | undefined;

    let query = `
      SELECT id, player_name, score, level, completed_at
      FROM leaderboard
    `;

    const params: any[] = [];

    if (level) {
      query += ' WHERE level = ?';
      params.push(level);
    }

    query += ' ORDER BY score DESC LIMIT ?';
    params.push(limit);

    const entries = db.prepare(query).all(...params) as LeaderboardEntry[];

    res.json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard',
    });
  }
});

// POST /api/leaderboard - Submit a new score
leaderboardRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { player_name, score, level }: CreateLeaderboardEntry = req.body;

    if (!player_name || score === undefined || level === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: player_name, score, level',
      });
    }

    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({
        success: false,
        error: 'Score must be a positive number',
      });
    }

    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO leaderboard (player_name, score, level)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(player_name, score, level);

    res.status(201).json({
      success: true,
      message: 'Score submitted successfully',
      data: {
        id: result.lastInsertRowid,
        player_name,
        score,
        level,
      },
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit score',
    });
  }
});

// GET /api/leaderboard/:player - Get player's best scores
leaderboardRouter.get('/:player', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const playerName = req.params.player;

    const entries = db.prepare(`
      SELECT id, player_name, score, level, completed_at
      FROM leaderboard
      WHERE player_name = ?
      ORDER BY score DESC
      LIMIT 10
    `).all(playerName) as LeaderboardEntry[];

    res.json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    console.error('Error fetching player scores:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch player scores',
    });
  }
});
