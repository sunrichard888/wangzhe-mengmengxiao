export interface LevelConfig {
  id: number;
  name: string;
  targetScore: number;
  maxMoves: number;
  boardRows: number;
  boardCols: number;
  cardTypes: number;  // Number of card types to use
  tutorial?: boolean;
  specialCards?: string[];
  obstacles?: ObstacleConfig[];
}

export interface ObstacleConfig {
  type: 'ice' | 'rock' | 'chain';
  row: number;
  col: number;
  health?: number;
}

export interface WinCondition {
  win: boolean;
  reason: 'score' | 'moves' | 'complete';
  score: number;
  targetScore: number;
  movesRemaining: number;
}

export class LevelManager {
  private levels: LevelConfig[] = [];
  private currentLevel: number = 1;
  private currentScore: number = 0;
  private movesRemaining: number = 0;

  private static readonly CARD_TYPES = [
    'sword',
    'shield',
    'potion',
    'crown',
    'gem',
    'scroll',
  ];

  constructor() {
    this.initializeLevels();
  }

  private initializeLevels(): void {
    this.levels = [
      // Level 1: Tutorial
      {
        id: 1,
        name: 'First Steps',
        targetScore: 1000,
        maxMoves: 20,
        boardRows: 6,
        boardCols: 6,
        cardTypes: 3,  // sword, shield, potion
        tutorial: true,
      },
      // Level 2: Easy
      {
        id: 2,
        name: 'Getting Started',
        targetScore: 2000,
        maxMoves: 25,
        boardRows: 6,
        boardCols: 6,
        cardTypes: 4,  // + crown
      },
      // Level 3: Medium
      {
        id: 3,
        name: 'Challenge',
        targetScore: 3500,
        maxMoves: 30,
        boardRows: 7,
        boardCols: 7,
        cardTypes: 5,  // + gem
        obstacles: [
          { type: 'ice', row: 3, col: 3, health: 2 },
          { type: 'ice', row: 3, col: 4, health: 2 },
        ],
      },
      // Level 4: Hard
      {
        id: 4,
        name: 'Ice Breaker',
        targetScore: 5000,
        maxMoves: 35,
        boardRows: 8,
        boardCols: 8,
        cardTypes: 6,  // all types
        obstacles: [
          { type: 'ice', row: 4, col: 4, health: 3 },
        ],
      },
      // Level 5: Challenge
      {
        id: 5,
        name: 'Rock Solid',
        targetScore: 7500,
        maxMoves: 40,
        boardRows: 8,
        boardCols: 8,
        cardTypes: 6,
        obstacles: [
          { type: 'rock', row: 5, col: 5, health: 5 },
        ],
      },
    ];
  }

  public getLevel(levelId: number): LevelConfig | null {
    return this.levels.find((level) => level.id === levelId) || null;
  }

  public getCurrentLevel(): LevelConfig | null {
    return this.getLevel(this.currentLevel);
  }

  public getNextLevel(): LevelConfig | null {
    return this.getLevel(this.currentLevel + 1);
  }

  public advanceLevel(): boolean {
    if (this.getNextLevel()) {
      this.currentLevel++;
      return true;
    }
    return false;
  }

  public getTotalLevels(): number {
    return this.levels.length;
  }

  public reset(): void {
    this.currentLevel = 1;
    this.currentScore = 0;
    this.movesRemaining = 0;
  }

  public setCurrentLevel(levelId: number): void {
    if (this.getLevel(levelId)) {
      this.currentLevel = levelId;
    }
  }

  public startLevel(levelId: number): void {
    const level = this.getLevel(levelId);
    if (level) {
      this.currentLevel = levelId;
      this.currentScore = 0;
      this.movesRemaining = level.maxMoves;
    }
  }

  public addScore(points: number): void {
    this.currentScore += points;
  }

  public useMove(): void {
    if (this.movesRemaining > 0) {
      this.movesRemaining--;
    }
  }

  public getScore(): number {
    return this.currentScore;
  }

  public getMovesRemaining(): number {
    return this.movesRemaining;
  }

  public checkWinCondition(): WinCondition {
    const level = this.getCurrentLevel();
    if (!level) {
      return {
        win: false,
        reason: 'complete',
        score: this.currentScore,
        targetScore: 0,
        movesRemaining: this.movesRemaining,
      };
    }

    const reachedTargetScore = this.currentScore >= level.targetScore;
    const outOfMoves = this.movesRemaining <= 0;

    if (reachedTargetScore) {
      return {
        win: true,
        reason: 'score',
        score: this.currentScore,
        targetScore: level.targetScore,
        movesRemaining: this.movesRemaining,
      };
    }

    if (outOfMoves) {
      return {
        win: false,
        reason: 'moves',
        score: this.currentScore,
        targetScore: level.targetScore,
        movesRemaining: 0,
      };
    }

    // Game still in progress
    return {
      win: false,
      reason: 'complete',
      score: this.currentScore,
      targetScore: level.targetScore,
      movesRemaining: this.movesRemaining,
    };
  }

  public getActiveCardTypes(): string[] {
    const level = this.getCurrentLevel();
    if (!level) {
      return LevelManager.CARD_TYPES;
    }
    return LevelManager.CARD_TYPES.slice(0, level.cardTypes);
  }

  public isTutorialLevel(): boolean {
    const level = this.getCurrentLevel();
    return level?.tutorial ?? false;
  }
}
