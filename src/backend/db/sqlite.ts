import initSqlJs, { Database } from 'sql.js';
import { resolve } from 'path';
import * as fs from 'fs';

export let db: Database | null = null;

export async function initDatabase(): Promise<void> {
  const SQL = await initSqlJs();
  
  const dbPath = process.env.DATABASE_PATH || resolve(__dirname, '../../../data/game.db');
  
  // Try to load existing database from file
  let dbBuffer: Uint8Array | undefined;
  if (fs.existsSync(dbPath)) {
    dbBuffer = fs.readFileSync(dbPath);
  }
  
  db = dbBuffer ? new SQL.Database(dbBuffer) : new SQL.Database();
  
  // Enable foreign keys
  db.run('PRAGMA foreign_keys = ON');

  // Create tables
  db.run(`
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

  // Check if we need to insert default levels
  const levelCountResult = db.exec('SELECT COUNT(*) as count FROM levels');
  const levelCount = levelCountResult.length > 0 
    ? (levelCountResult[0].values[0][0] as number) 
    : 0;
  
  if (levelCount === 0) {
    const defaultLevels = [
      ['First Steps', 1000, 20, 8, 8],
      ['Getting Started', 2000, 25, 8, 8],
      ['Challenge', 3500, 30, 9, 9],
      ['Ice Breaker', 5000, 35, 9, 9],
      ['Rock Solid', 7500, 40, 10, 10],
    ];

    db.run('BEGIN TRANSACTION');
    for (const level of defaultLevels) {
      db.run(
        `INSERT INTO levels (name, target_score, max_moves, board_rows, board_cols) VALUES (?, ?, ?, ?, ?)`,
        level
      );
    }
    db.run('COMMIT');
  }

  // Save database to file
  saveDatabase(dbPath);

  console.log('📦 Database initialized successfully');
}

function saveDatabase(dbPath: string): void {
  const data = db!.export();
  const buffer = Buffer.from(data);
  
  // Ensure directory exists
  const dir = dbPath.substring(0, dbPath.lastIndexOf('/'));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(dbPath, buffer);
}

export function getDatabase(): Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export function closeDatabase(): void {
  if (db) {
    // Save before closing
    const dbPath = process.env.DATABASE_PATH || resolve(__dirname, '../../../data/game.db');
    saveDatabase(dbPath);
    db.close();
    db = null;
  }
}
