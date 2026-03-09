import { Router, Request, Response } from 'express';
import { getDatabase } from '../db/sqlite';
import { Level } from '../db/models';

export const levelsRouter = Router();

// GET /api/levels - Get all levels
levelsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const levels = db.prepare(`
      SELECT id, name, target_score, max_moves, board_rows, board_cols
      FROM levels
      ORDER BY id
    `).all() as Level[];

    res.json({
      success: true,
      count: levels.length,
      data: levels,
    });
  } catch (error) {
    console.error('Error fetching levels:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch levels',
    });
  }
});

// GET /api/levels/:id - Get a specific level
levelsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const levelId = parseInt(req.params.id);

    if (isNaN(levelId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid level ID',
      });
    }

    const level = db.prepare(`
      SELECT id, name, target_score, max_moves, board_rows, board_cols
      FROM levels
      WHERE id = ?
    `).get(levelId) as Level | undefined;

    if (!level) {
      return res.status(404).json({
        success: false,
        error: 'Level not found',
      });
    }

    res.json({
      success: true,
      data: level,
    });
  } catch (error) {
    console.error('Error fetching level:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch level',
    });
  }
});

// PUT /api/levels/:id/complete - Mark a level as completed
levelsRouter.put('/:id/complete', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const levelId = parseInt(req.params.id);
    const { player_id, score, moves }: { player_id: string; score: number; moves: number } = req.body;

    if (isNaN(levelId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid level ID',
      });
    }

    if (!player_id || score === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: player_id, score',
      });
    }

    // Check if level exists
    const level = db.prepare('SELECT * FROM levels WHERE id = ?').get(levelId);
    if (!level) {
      return res.status(404).json({
        success: false,
        error: 'Level not found',
      });
    }

    // Update or create player progress
    const existingProgress = db.prepare('SELECT * FROM player_progress WHERE player_id = ?').get(player_id);

    if (existingProgress) {
      db.prepare(`
        UPDATE player_progress
        SET current_level = MAX(current_level, ?),
            high_score = MAX(high_score, ?),
            total_moves = total_moves + ?,
            total_score = total_score + ?,
            levels_completed = levels_completed + 1,
            last_played = CURRENT_TIMESTAMP
        WHERE player_id = ?
      `).run(levelId, score, moves, score, player_id);
    } else {
      db.prepare(`
        INSERT INTO player_progress (player_id, current_level, high_score, total_moves, total_score, levels_completed)
        VALUES (?, ?, ?, ?, ?, 1)
      `).run(player_id, levelId, score, moves, score);
    }

    res.json({
      success: true,
      message: 'Level completed successfully',
      data: {
        level_id: levelId,
        score,
        moves,
      },
    });
  } catch (error) {
    console.error('Error completing level:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete level',
    });
  }
});

// GET /api/levels/next/:currentLevel - Get next level
levelsRouter.get('/next/:currentLevel', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const currentLevel = parseInt(req.params.currentLevel);

    if (isNaN(currentLevel)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid level ID',
      });
    }

    const nextLevel = db.prepare(`
      SELECT id, name, target_score, max_moves, board_rows, board_cols
      FROM levels
      WHERE id = ?
    `).get(currentLevel + 1) as Level | undefined;

    if (!nextLevel) {
      return res.json({
        success: true,
        message: 'All levels completed!',
        data: null,
      });
    }

    res.json({
      success: true,
      data: nextLevel,
    });
  } catch (error) {
    console.error('Error fetching next level:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch next level',
    });
  }
});
