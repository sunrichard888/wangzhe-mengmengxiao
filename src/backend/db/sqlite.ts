import Database from 'better-sqlite3';
import { resolve } from 'path';

export let db: Database.Database | null = null;

export async function initDatabase(): Promise<void> {
  const dbPath = process.env.DATABASE_PATH || resolve(__dirname, '../../../data/game.db');
  
  db = new Database(dbPath);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS levels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      target_score INTEGER NOT NULL,
      max_moves INTEGER NOT NULL,
      board_rows INTEGER DEFAULT 8,
      board_cols INTEGER DEFAULT 8,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      level INTEGER NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS player_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id TEXT UNIQUE NOT NULL,
      current_level INTEGER DEFAULT 1,
      high_score INTEGER DEFAULT 0,
      total_moves INTEGER DEFAULT 0,
      total_score INTEGER DEFAULT 0,
      levels_completed INTEGER DEFAULT 0,
      last_played DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);
    CREATE INDEX IF NOT EXISTS idx_leaderboard_level ON leaderboard(level);
  `);

  // Insert default levels if empty
  const levelCount = db.prepare('SELECT COUNT(*) as count FROM levels').get() as { count: number };
  
  if (levelCount.count === 0) {
    const insertLevel = db.prepare(`
      INSERT INTO levels (name, target_score, max_moves, board_rows, board_cols)
      VALUES (?, ?, ?, ?, ?)
    `);

    const defaultLevels = [
      ['First Steps', 1000, 20, 8, 8],
      ['Getting Started', 2000, 25, 8, 8],
      ['Challenge', 3500, 30, 9, 9],
      ['Ice Breaker', 5000, 35, 9, 9],
      ['Rock Solid', 7500, 40, 10, 10],
    ];

    const insertMany = db.transaction((levels: any[]) => {
      for (const level of levels) {
        insertLevel.run(...level);
      }
    });

    insertMany(defaultLevels);
  }

  console.log('📦 Database initialized successfully');
}

export function getDatabase(): Database.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
