import Phaser from 'phaser';

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    // Background
    const graphics = this.add.graphics();
    graphics.fillStyle(0x1a1a2e, 1);
    graphics.fillRect(0, 0, 800, 600);

    // Title
    this.add.text(400, 150, '王者萌萌消', {
      font: 'bold 64px Arial',
      fill: '#f39c12',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.add.text(400, 220, "King's Cute Match-3", {
      font: '28px Arial',
      fill: '#ffffff',
    }).setOrigin(0.5);

    // Play button
    const playButton = this.createButton(400, 350, 'PLAY', () => {
      this.scene.start('MatchGame', { level: 1 });
    });

    // Continue button (if there's saved progress)
    const continueButton = this.createButton(400, 430, 'CONTINUE', () => {
      // Load saved level
      const savedLevel = this.loadProgress();
      this.scene.start('MatchGame', { level: savedLevel || 1 });
    });
    continueButton.setVisible(false); // Hidden by default

    // Settings button
    this.createButton(400, 510, 'SETTINGS', () => {
      console.log('Settings clicked');
      // TODO: Implement settings screen
    });

    // Decorative elements
    this.createDecorations();
  }

  private createButton(
    x: number,
    y: number,
    text: string,
    callback: () => void
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    // Button background
    const button = this.add.graphics();
    button.fillStyle(0x3498db, 1);
    button.fillRoundedRect(-100, -30, 200, 60, 10);
    button.lineStyle(3, 0x2980b9, 1);
    button.strokeRoundedRect(-100, -30, 200, 60, 10);

    // Button text
    const buttonText = this.add.text(0, 0, text, {
      font: 'bold 24px Arial',
      fill: '#ffffff',
    }).setOrigin(0.5);

    container.add([button, buttonText]);
    container.setSize(200, 60);
    container.setInteractive({ useHandCursor: true });

    // Hover effects
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

    return container;
  }

  private createDecorations(): void {
    // Add some decorative cards around the edges
    const cardTypes = ['sword', 'shield', 'potion', 'crown', 'gem', 'scroll'];
    const colors = [0xff4444, 0x4444ff, 0x44ff44, 0xffff44, 0xff44ff, 0x44ffff];

    // Top-left corner
    for (let i = 0; i < 3; i++) {
      const graphics = this.add.graphics();
      graphics.fillStyle(colors[i], 0.3);
      graphics.fillRoundedRect(20 + i * 50, 20, 40, 40, 5);
    }

    // Bottom-right corner
    for (let i = 0; i < 3; i++) {
      const graphics = this.add.graphics();
      graphics.fillStyle(colors[i + 3], 0.3);
      graphics.fillRoundedRect(740 - i * 50, 540, 40, 40, 5);
    }
  }

  private loadProgress(): number | null {
    const saved = localStorage.getItem('wangzhe-mengmengxiao-progress');
    if (saved) {
      const data = JSON.parse(saved);
      return data.currentLevel || 1;
    }
    return null;
  }
}
