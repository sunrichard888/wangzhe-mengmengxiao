// Game Types for 王者萌萌消

export type CardType = 
  | 'sword'
  | 'shield'
  | 'potion'
  | 'crown'
  | 'gem'
  | 'scroll';

export interface CardData {
  id: string;
  type: CardType;
  row: number;
  col: number;
  isSelected: boolean;
  isMatched: boolean;
  isLocked: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface GridPosition {
  row: number;
  col: number;
}

export interface MatchResult {
  matches: CardData[];
  score: number;
  combo: number;
}

export interface GameState {
  score: number;
  moves: number;
  level: number;
  targetScore: number;
  isPlaying: boolean;
  isPaused: boolean;
}

export interface LevelConfig {
  id: number;
  name: string;
  targetScore: number;
  maxMoves: number;
  boardRows: number;
  boardCols: number;
  obstacles?: Obstacle[];
}

export interface Obstacle {
  type: 'ice' | 'rock' | 'chain';
  row: number;
  col: number;
  health: number;
}

export interface PlayerProgress {
  playerId: string;
  currentLevel: number;
  highScore: number;
  totalMoves: number;
  totalScore: number;
  levelsCompleted: number;
  lastPlayed: Date;
}

export interface LeaderboardEntry {
  id: number;
  playerName: string;
  score: number;
  level: number;
  completedAt: Date;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  animationsEnabled: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
}

export interface SwapResult {
  success: boolean;
  match?: MatchResult;
}
