import { CardType, CardData } from './Card';

export interface MatchResult {
  matches: CardData[];
  score: number;
  combo: number;
}

export interface SwapResult {
  success: boolean;
  match?: MatchResult;
}

export class MatchLogic {
  private board: CardType[][];
  private rows: number;
  private cols: number;

  private static readonly CARD_TYPES: CardType[] = [
    'sword',
    'shield',
    'potion',
    'crown',
    'gem',
    'scroll',
  ];

  private static readonly MIN_MATCH = 3;
  private static readonly BASE_SCORE = 10;
  private static readonly COMBO_MULTIPLIER = 1.5;

  constructor(rows: number = 8, cols: number = 8) {
    this.rows = rows;
    this.cols = cols;
    this.board = [];
    this.initializeBoard();
  }

  private initializeBoard(): void {
    this.board = [];
    for (let row = 0; row < this.rows; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this.board[row][col] = this.getRandomType(row, col);
      }
    }

    // Remove any initial matches
    while (this.findAllMatches().length > 0) {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.board[row][col] = this.getRandomType(row, col);
        }
      }
    }
  }

  private getRandomType(row: number, col: number): CardType {
    let type: CardType;
    let attempts = 0;

    do {
      type = MatchLogic.CARD_TYPES[
        Math.floor(Math.random() * MatchLogic.CARD_TYPES.length)
      ];
      attempts++;
    } while (
      this.wouldCreateMatch(row, col, type) &&
      attempts < 10
    );

    return type;
  }

  private wouldCreateMatch(row: number, col: number, type: CardType): boolean {
    // Check horizontal
    if (
      col >= 2 &&
      this.board[row][col - 1] === type &&
      this.board[row][col - 2] === type
    ) {
      return true;
    }

    // Check vertical
    if (
      row >= 2 &&
      this.board[row - 1] &&
      this.board[row - 1][col] === type &&
      this.board[row - 2] &&
      this.board[row - 2][col] === type
    ) {
      return true;
    }

    return false;
  }

  public swapCards(
    row1: number,
    col1: number,
    row2: number,
    col2: number
  ): SwapResult {
    if (!this.isValidSwap(row1, col1, row2, col2)) {
      return { success: false };
    }

    // Perform swap
    const temp = this.board[row1][col1];
    this.board[row1][col1] = this.board[row2][col2];
    this.board[row2][col2] = temp;

    // Check for matches
    const matches = this.findAllMatches();

    if (matches.length === 0) {
      // Swap back if no matches
      this.board[row2][col2] = this.board[row1][col1];
      this.board[row1][col1] = temp;
      return { success: false };
    }

    // Calculate score
    const score = this.calculateScore(matches, 1);

    return {
      success: true,
      match: {
        matches: this.getMatchedCards(matches),
        score,
        combo: 1,
      },
    };
  }

  private isValidSwap(
    row1: number,
    col1: number,
    row2: number,
    col2: number
  ): boolean {
    // Check bounds
    if (
      row1 < 0 ||
      row1 >= this.rows ||
      col1 < 0 ||
      col1 >= this.cols ||
      row2 < 0 ||
      row2 >= this.rows ||
      col2 < 0 ||
      col2 >= this.cols
    ) {
      return false;
    }

    // Check adjacency (must be next to each other)
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  private findAllMatches(): Array<{ row: number; col: number; type: CardType }> {
    const matches: Array<{ row: number; col: number; type: CardType }> = [];

    // Check horizontal matches
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols - 2; col++) {
        const type = this.board[row][col];
        if (
          type === this.board[row][col + 1] &&
          type === this.board[row][col + 2]
        ) {
          matches.push({ row, col, type });
        }
      }
    }

    // Check vertical matches
    for (let row = 0; row < this.rows - 2; row++) {
      for (let col = 0; col < this.cols; col++) {
        const type = this.board[row][col];
        if (
          type === this.board[row + 1][col] &&
          type === this.board[row + 2][col]
        ) {
          matches.push({ row, col, type });
        }
      }
    }

    return matches;
  }

  private getMatchedCards(
    matches: Array<{ row: number; col: number; type: CardType }>
  ): CardData[] {
    const matchedCards: CardData[] = [];
    const seen = new Set<string>();

    for (const match of matches) {
      // Find all cards in this match
      const type = match.type;
      const { row, col } = match;

      // Check horizontal
      for (let c = col; c < this.cols; c++) {
        if (this.board[row][c] === type) {
          const key = `${row}-${c}`;
          if (!seen.has(key)) {
            seen.add(key);
            matchedCards.push({
              id: `${row}-${c}`,
              type,
              row,
              col: c,
              isSelected: false,
              isMatched: true,
              isLocked: false,
            });
          }
        } else {
          break;
        }
      }

      // Check vertical
      for (let r = row; r < this.rows; r++) {
        if (this.board[r][col] === type) {
          const key = `${r}-${col}`;
          if (!seen.has(key)) {
            seen.add(key);
            matchedCards.push({
              id: `${r}-${col}`,
              type,
              row: r,
              col,
              isSelected: false,
              isMatched: true,
              isLocked: false,
            });
          }
        } else {
          break;
        }
      }
    }

    return matchedCards;
  }

  private calculateScore(matches: any[], combo: number = 1): number {
    const baseScore = matches.length * MatchLogic.BASE_SCORE;
    const comboBonus = combo > 1 ? MatchLogic.COMBO_MULTIPLIER : 1;
    return Math.floor(baseScore * comboBonus);
  }

  public removeMatches(matchedCards: CardData[]): void {
    for (const card of matchedCards) {
      this.board[card.row][card.col] = null as any;
    }
  }

  public applyGravity(): Array<{ row: number; col: number; type: CardType }> {
    const newCards: Array<{ row: number; col: number; type: CardType }> = [];

    for (let col = 0; col < this.cols; col++) {
      let emptyRow = this.rows - 1;

      // Move existing cards down
      for (let row = this.rows - 1; row >= 0; row--) {
        if (this.board[row][col] !== null) {
          if (row !== emptyRow) {
            this.board[emptyRow][col] = this.board[row][col];
            this.board[row][col] = null as any;
          }
          emptyRow--;
        }
      }

      // Fill empty spaces with new cards
      for (let row = emptyRow; row >= 0; row--) {
        const newType =
          MatchLogic.CARD_TYPES[
            Math.floor(Math.random() * MatchLogic.CARD_TYPES.length)
          ];
        this.board[row][col] = newType;
        newCards.push({ row, col, type: newType });
      }
    }

    return newCards;
  }

  public getBoard(): CardType[][] {
    return this.board.map((row) => [...row]);
  }

  public getRows(): number {
    return this.rows;
  }

  public getCols(): number {
    return this.cols;
  }

  public hasPossibleMoves(): boolean {
    // Check all possible swaps
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        // Check right swap
        if (col < this.cols - 1) {
          const result = this.swapCards(row, col, row, col + 1);
          if (result.success) {
            // Swap back
            this.board[row][col + 1] = this.board[row][col];
            this.board[row][col] = result.match?.matches[0].type || this.board[row][col];
            return true;
          }
        }

        // Check down swap
        if (row < this.rows - 1) {
          const result = this.swapCards(row, col, row + 1, col);
          if (result.success) {
            // Swap back
            this.board[row + 1][col] = this.board[row][col];
            this.board[row][col] = result.match?.matches[0].type || this.board[row][col];
            return true;
          }
        }
      }
    }

    return false;
  }

  public reset(): void {
    this.initializeBoard();
  }
}
