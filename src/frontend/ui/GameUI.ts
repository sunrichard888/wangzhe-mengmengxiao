import Phaser from 'phaser';

export class GameUI extends Phaser.Scene {
  private scoreText!: Phaser.GameObjects.Text;
  private movesText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;
  private targetText!: Phaser.GameObjects.Text;
  private progressBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'GameUI' });
  }

  init(data: { score?: number; moves?: number; level?: number; target?: number }) {
    this.score = data.score || 0;
    this.moves = data.moves || 20;
    this.level = data.level || 1;
    this.target = data.target || 1000;
  }

  private score: number = 0;
  private moves: number = 20;
  private level: number = 1;
  private target: number = 1000;

  create() {
    // Top bar background
    const bar = this.add.graphics();
    bar.fillStyle(0x16213e, 0.9);
    bar.fillRect(0, 0, 800, 60);

    // Score
    this.add.text(20, 15, 'Score:', { font: '18px Arial', fill: '#ffffff' });
    this.scoreText = this.add.text(90, 15, '0', {
      font: 'bold 20px Arial',
      fill: '#f39c12',
    });

    // Moves
    this.add.text(250, 15, 'Moves:', { font: '18px Arial', fill: '#ffffff' });
    this.movesText = this.add.text(320, 15, this.moves.toString(), {
      font: 'bold 20px Arial',
      fill: '#e74c3c',
    });

    // Level
    this.add.text(450, 15, 'Level:', { font: '18px Arial', fill: '#ffffff' });
    this.levelText = this.add.text(520, 15, this.level.toString(), {
      font: 'bold 20px Arial',
      fill: '#3498db',
    });

    // Target
    this.add.text(600, 15, 'Target:', { font: '18px Arial', fill: '#ffffff' });
    this.targetText = this.add.text(670, 15, this.target.toString(), {
      font: 'bold 20px Arial',
      fill: '#2ecc71',
    });

    // Progress bar
    this.progressBar = this.add.graphics();
    this.updateProgressBar();

    // Pause button
    const pauseBtn = this.add.text(760, 15, '⏸', {
      font: '24px Arial',
      fill: '#ffffff',
    }).setInteractive({ useHandCursor: true });

    pauseBtn.on('pointerdown', () => {
      this.scene.pause();
      this.showPauseMenu();
    });
  }

  private updateProgressBar(): void {
    this.progressBar.clear();
    
    // Background
    this.progressBar.fillStyle(0x2c3e50, 1);
    this.progressBar.fillRect(20, 50, 760, 8);

    // Progress
    const progress = Math.min(this.score / this.target, 1);
    this.progressBar.fillStyle(0x2ecc71, 1);
    this.progressBar.fillRect(20, 50, 760 * progress, 8);
  }

  private showPauseMenu(): void {
    // Darken background
    const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);

    // Pause menu
    const menu = this.add.container(400, 300);

    const bg = this.add.graphics();
    bg.fillStyle(0x34495e, 1);
    bg.fillRoundedRect(-150, -100, 300, 200, 15);
    menu.add(bg);

    const title = this.add.text(0, -50, 'PAUSED', {
      font: 'bold 32px Arial',
      fill: '#ffffff',
    }).setOrigin(0.5);
    menu.add(title);

    // Resume button
    const resumeBtn = this.add.text(0, 20, 'RESUME', {
      font: 'bold 20px Arial',
      fill: '#ffffff',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
    resumeBtn.on('pointerdown', () => {
      this.scene.resume();
      overlay.destroy();
      menu.destroy();
    });
    menu.add(resumeBtn);

    // Quit button
    const quitBtn = this.add.text(0, 60, 'QUIT', {
      font: 'bold 20px Arial',
      fill: '#e74c3c',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
    quitBtn.on('pointerdown', () => {
      this.scene.start('MainMenu');
    });
    menu.add(quitBtn);
  }

  public updateScore(score: number): void {
    this.score = score;
    this.scoreText.setText(score.toString());
    this.updateProgressBar();
  }

  public updateMoves(moves: number): void {
    this.moves = moves;
    this.movesText.setText(moves.toString());

    // Warn when low on moves
    if (moves <= 5) {
      this.movesText.setColor('#e74c3c');
    }
  }

  public updateLevel(level: number): void {
    this.level = level;
    this.levelText.setText(level.toString());
  }
}
