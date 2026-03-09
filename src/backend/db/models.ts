export interface Level {
  id: number;
  name: string;
  target_score: number;
  max_moves: number;
  board_rows: number;
  board_cols: number;
  created_at: string;
  updated_at: string;
}

export interface LeaderboardEntry {
  id: number;
  player_name: string;
  score: number;
  level: number;
  completed_at: string;
}

export interface PlayerProgress {
  id: number;
  player_id: string;
  current_level: number;
  high_score: number;
  total_moves: number;
  total_score: number;
  levels_completed: number;
  last_played: string;
  created_at: string;
}

export interface CreateLeaderboardEntry {
  player_name: string;
  score: number;
  level: number;
}

export interface CreatePlayerProgress {
  player_id: string;
}

export interface UpdatePlayerProgress {
  current_level?: number;
  high_score?: number;
  total_moves?: number;
  total_score?: number;
  levels_completed?: number;
}
