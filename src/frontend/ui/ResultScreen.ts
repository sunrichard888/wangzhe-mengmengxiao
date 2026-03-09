import Phaser from 'phaser';

export class ResultScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultScreen' });
  }

  init(data: { win: boolean; score: number; level: number }) {
    this.win = data.win;
    this.score = data.score;
    this.level = data.level;
  }

  private win: boolean = false;
  private score: number = 0;
  private level: number = 1;

  create() {
    // Background
    const graphics = this.add.graphics();
    graphics.fillStyle(0x1a1a2e, 1);
    graphics.fillRect(0, 0, 800, 600);

    // Result message
    const title = this.win ? 'LEVEL COMPLETE!' : 'GAME OVER';
    const color = this.win ? '#2ecc71' : '#e74c3c';

    this.add.text(400, 150, title, {
      font: 'bold 48px Arial',
      fill: color,
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Score display
    this.add.text(400, 240, 'Final Score', {
      font: '24px Arial',
      fill: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(400, 280, this.score.toString(), {
      font: 'bold 56px Arial',
      fill: '#f39c12',
    }).setOrigin(0.5);

    // Level info
    this.add.text(400, 350, `Level ${this.level}`, {
      font: '20px Arial',
      fill: '#3498db',
    }).setOrigin(0.5);

    // Stars (if won)
    if (this.win) {
      this.displayStars();
    }

    // Buttons
    if (this.win) {
      this.createButton(400, 450, 'NEXT LEVEL', () => {
        this.scene.start('MatchGame', { level: this.level + 1 });
      });
    } else {
      this.createButton(300, 450, 'TRY AGAIN', () => {
        this.scene.start('MatchGame', { level: this.level });
      });

      this.createButton(500, 450, 'MAIN MENU', () => {
        this.scene.start('MainMenu');
      });
    }

    // Save progress if won
    if (this.win) {
      this.saveProgress();
    }

    // Add confetti if won
    if (this.win) {
      this.createConfetti();
    }
  }

  private displayStars(): void {
    const starCount = this.getStarCount();
    const starX = 400 - (starCount - 1) * 40;

    for (let i = 0; i < starCount; i++) {
      this.add.text(starX + i * 80, 390, '⭐', {
        font: '40px Arial',
      }).setOrigin(0.5);
    }
  }

  private getStarCount(): number {
    // Simple star rating based on score
    const targetScore = this.level * 1000;
    if (this.score >= targetScore * 1.5) return 3;
    if (this.score >= targetScore * 1.2) return 2;
    return 1;
  }

  private createButton(
    x: number,
    y: number,
    text: string,
    callback: () => void
  ): void {
    const container = this.add.container(x, y);

    const button = this.add.graphics();
    button.fillStyle(0x3498db, 1);
    button.fillRoundedRect(-100, -30, 200, 60, 10);
    button.lineStyle(3, 0x2980b9, 1);
    button.strokeRoundedRect(-100, -30, 200, 60, 10);

    const buttonText = this.add.text(0, 0, text, {
      font: 'bold 20px Arial',
      fill: '#ffffff',
    }).setOrigin(0.5);

    container.add([button, buttonText]);
    container.setSize(200, 60);
    container.setInteractive({ useHandCursor: true });

    container.on('pointerover', () => {
      button.clear();
      button.fillStyle(0x5dade2, 1);
      button.fillRoundedRect(-100, -30, 200, 60, 10);
      button.lineStyle(3, 0x3498db, 1);
      button.strokeRoundedRect(-100, -30, 200, 60, 10);
    });

    container.on('pointerout', () => {
      button.clear();
      button.fillStyle(0x3498db, 1);
      button.fillRoundedRect(-100, -30, 200, 60, 10);
      button.lineStyle(3, 0x2980b9, 1);
      button.strokeRoundedRect(-100, -30, 200, 60, 10);
    });

    container.on('pointerdown', callback);
  }

  private createConfetti(): void {
    const colors = [0xff4444, 0x4444ff, 0x44ff44, 0xffff44, 0xff44ff, 0x44ffff];

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 800;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const particle = this.add.circle(x, -20, 5, color);
      
      this.tweens.add({
        targets: particle,
        y: 620,
        x: x + (Math.random() - 0.5) * 200,
        rotation: Math.random() * Math.PI * 2,
        duration: 2000 + Math.random() * 2000,
        delay: Math.random() * 1000,
        ease: 'Linear',
        repeat: -1,
      });
    }
  }

  private saveProgress(): void {
    const progress = {
      currentLevel: this.level + 1,
      highScore: this.score,
      timestamp: Date.now(),
    };
    localStorage.setItem('wangzhe-mengmengxiao-progress', JSON.stringify(progress));
  }
}
