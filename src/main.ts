import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  scene: {
    preload() {
      // 生成卡牌纹理
      for (let i = 0; i < 6; i++) {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle([0xff4444, 0x4444ff, 0x44ff44, 0xffff44, 0xff44ff, 0x44ffff][i], 1);
        graphics.fillRoundedRect(0, 0, 64, 64, 8);
        graphics.fillStyle(0xffffff, 1);
        graphics.setFontSize(32);
        graphics.fillText(['⚔️', '🛡️', '🧪', '👑', '💎', '📜'][i], 16, 42);
        graphics.generateTexture('card_' + i, 64, 64);
      }
    },
    create() {
      document.getElementById('loading')!.style.display = 'none';
      
      this.add.text(400, 30, '王者萌萌消', { font: 'bold 32px Arial', fill: '#f39c12' }).setOrigin(0.5);
      
      let selected: Phaser.GameObjects.Image | null = null;
      const cards: Phaser.GameObjects.Image[][] = [];
      
      for (let row = 0; row < 8; row++) {
        cards[row] = [];
        for (let col = 0; col < 8; col++) {
          const type = Math.floor(Math.random() * 6);
          const card = this.add.image(100 + col * 72, 80 + row * 72, 'card_' + type)
            .setInteractive({ useHandCursor: true })
            .setData('type', type);
          
          card.on('pointerdown', () => {
            if (selected && selected !== card) {
              if (selected.getData('type') === card.getData('type')) {
                this.tweens.add({ targets: [selected, card], alpha: 0, scale: 1.2, duration: 300,
                  onComplete: () => {
                    selected!.setTexture('card_' + Math.floor(Math.random() * 6)).setAlpha(1).setScale(1);
                    card.setTexture('card_' + Math.floor(Math.random() * 6)).setAlpha(1).setScale(1);
                  }
                });
                selected = null;
              } else {
                selected.setScale(1);
                selected = null;
              }
            } else if (!selected) {
              selected = card;
              this.tweens.add({ targets: card, scale: 1.1, duration: 200, yoyo: true, repeat: 1 });
            }
          });
          cards[row][col] = card;
        }
      }
      
      this.add.text(400, 580, '点击两个相同的卡牌消除！', { font: '18px Arial', fill: '#fff' }).setOrigin(0.5);
    }
  },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }
};

new Phaser.Game(config);
