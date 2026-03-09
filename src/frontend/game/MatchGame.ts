import Phaser from 'phaser';
import { Card, CardType } from './Card';
import { MatchLogic, MatchResult } from './MatchLogic';
import { Board } from './Board';

export class MatchGame extends Phaser.Scene {
  private matchLogic!: MatchLogic;
  private board!: Board;
  private cards: Card[][] = [];
  private selectedCard: Card | null = null;
  private score: number = 0;
  private moves: number = 0;
  private level: number = 1;
  private targetScore: number = 1000;
  private isProcessing: boolean = false;

  constructor() {
    super({ key: 'MatchGame' });
  }

  init(data: { level?: number } = {}) {
    this.level = data.level || 1;
    this.targetScore = this.level * 1000;
    this.score = 0;
    this.moves = 20;
  }

  create() {
    // Initialize match logic
    this.matchLogic = new MatchLogic(8, 8);

    // Create game board
    this.createBoard();

    // Create UI
    this.createUI();

    // Load card sprites (placeholder colors for now)
    this.loadCardSprites();
  }

  private loadCardSprites(): void {
    const graphics = this.add.graphics();
    const cardTypes: CardType[] = ['sword', 'shield', 'potion', 'crown', 'gem', 'scroll'];
    const colors = [0xff4444, 0x4444ff, 0x44ff44, 0xffff44, 0xff44ff, 0x44ffff];

    cardTypes.forEach((type, index) => {
      graphics.clear();
      graphics.fillStyle(colors[index], 1);
      graphics.fillRoundedRect(-32, -32, 64, 64, 8);
      graphics.generateTexture(`card_${type}`, 64, 64);
    });
  }

  private createBoard(): void {
    const boardX = 100;
    const boardY = 100;

    this.board = new Board(this, boardX, boardY, 8, 8);

    // Create cards from match logic
    const boardData = this.matchLogic.getBoard();
    
    for (let row = 0; row < 8; row++) {
      this.cards[row] = [];
      for (let col = 0; col < 8; col++) {
        const cardData = {
          id: `${row}-${col}`,
          type: boardData[row][col],
          row,
          col,
          isSelected: false,
          isMatched: false,
          isLocked: false,
        };

        const x = boardX + col * 72;
        const y = boardY + row * 72;

        const card = new Card(this, x, y, cardData);
        card.on('cardClicked', this.handleCardClick, this);
        this.cards[row][col] = card;
        this.add.existing(card);
      }
    }
  }

  private createUI(): void {
    const style = { font: '24px Arial', fill: '#ffffff' };

    // Score
    this.add.text(600, 100, 'Score:', style);
    this.scoreText = this.add.text(680, 100, '0', style);

    // Moves
    this.add.text(600, 140, 'Moves:', style);
    this.movesText = this.add.text(680, 140, this.moves.toString(), style);

    // Level
    this.add.text(600, 180, 'Level:', style);
    this.add.text(680, 180, this.level.toString(), style);

    // Target
    this.add.text(600, 220, 'Target:', style);
    this.add.text(680, 220, this.targetScore.toString(), style);
  }

  private scoreText!: Phaser.GameObjects.Text;
  private movesText!: Phaser.GameObjects.Text;

  private handleCardClick(card: Card): void {
    if (this.isProcessing) return;

    if (!this.selectedCard) {
      // First card selection
      this.selectedCard = card;
      card.select();
    } else if (this.selectedCard === card) {
      // Deselect same card
      card.deselect();
      this.selectedCard = null;
    } else {
      // Second card - attempt swap
      this.attemptSwap(this.selectedCard, card);
      this.selectedCard.deselect();
      this.selectedCard = null;
    }
  }

  private async attemptSwap(card1: Card, card2: Card): Promise<void> {
    this.isProcessing = true;

    const result = this.matchLogic.swapCards(
      card1.data.row,
      card1.data.col,
      card2.data.row,
      card2.data.col
    );

    if (result.success && result.match) {
      this.moves--;
      this.updateUI();
      
      await this.processMatch(result.match);
    }

    this.isProcessing = false;
  }

  private async processMatch(match: MatchResult): Promise<void> {
    this.score += match.score;
    this.updateUI();

    // Mark cards as matched
    match.matches.forEach((cardData) => {
      const card = this.cards[cardData.row][cardData.col];
      card.match();
    });

    // Wait for animation
    await this.delay(300);

    // Remove matched cards
    this.matchLogic.removeMatches(match.matches);

    // Apply gravity
    const newCards = this.matchLogic.applyGravity();
    
    // Update card positions and types
    newCards.forEach((cardData) => {
      const card = this.cards[cardData.row][cardData.col];
      card.reset();
      // Update card type visually
    });

    // Check for chain reactions
    const newMatches = this.matchLogic.findAllMatches();
    if (newMatches.length > 0) {
      await this.delay(200);
      // Process chain matches (simplified)
    }

    // Check win/lose conditions
    this.checkGameEnd();
  }

  private checkGameEnd(): void {
    if (this.score >= this.targetScore) {
      this.scene.start('ResultScreen', { win: true, score: this.score, level: this.level });
    } else if (this.moves <= 0) {
      this.scene.start('ResultScreen', { win: false, score: this.score, level: this.level });
    }
  }

  private updateUI(): void {
    this.scoreText.setText(this.score.toString());
    this.movesText.setText(this.moves.toString());
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
