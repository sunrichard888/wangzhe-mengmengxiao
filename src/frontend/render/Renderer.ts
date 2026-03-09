import Phaser from 'phaser';

export class Renderer {
  private scene: Phaser.Scene;
  private effects: Map<string, Phaser.GameObjects.Particles.ParticleEmitter>;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.effects = new Map();
  }

  public createCardEffect(x: number, y: number, color: number): void {
    const particles = this.scene.add.particles(x, y, 'particle', {
      speed: { min: 50, max: 150 },
      scale: { start: 0.5, end: 0 },
      lifespan: 500,
      gravityY: 100,
      quantity: 10,
      tint: color,
    });

    setTimeout(() => {
      particles.destroy();
    }, 500);
  }

  public createMatchEffect(cards: Array<{ x: number; y: number }>): void {
    cards.forEach((card) => {
      this.createCardEffect(card.x, card.y, 0xffff00);
    });
  }

  public createComboEffect(x: number, y: number, combo: number): void {
    const text = this.scene.add.text(x, y, `COMBO x${combo}!`, {
      font: 'bold 32px Arial',
      fill: '#ff6b6b',
      stroke: '#ffffff',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.scene.tweens.add({
      targets: text,
      y: y - 50,
      alpha: 0,
      scale: 1.5,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => text.destroy(),
    });
  }

  public createLevelCompleteEffect(): void {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;

    // Create star burst
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      const x = width / 2 + Math.cos(angle) * 100;
      const y = height / 2 + Math.sin(angle) * 100;

      const star = this.scene.add.text(x, y, '⭐', {
        font: '24px Arial',
      }).setOrigin(0.5);

      this.scene.tweens.add({
        targets: star,
        x: width / 2 + Math.cos(angle) * 300,
        y: height / 2 + Math.sin(angle) * 300,
        alpha: 0,
        scale: 0,
        duration: 1500,
        ease: 'Power2',
        delay: i * 50,
        onComplete: () => star.destroy(),
      });
    }
  }

  public fadeIn(duration: number = 500): Promise<void> {
    return new Promise((resolve) => {
      const flash = this.scene.add.rectangle(
        0,
        0,
        this.scene.scale.width,
        this.scene.scale.height,
        0x000000,
        1
      );
      flash.setOrigin(0);

      this.scene.tweens.add({
        targets: flash,
        alpha: 0,
        duration,
        ease: 'Linear',
        onComplete: () => {
          flash.destroy();
          resolve();
        },
      });
    });
  }

  public fadeOut(duration: number = 500): Promise<void> {
    return new Promise((resolve) => {
      const flash = this.scene.add.rectangle(
        0,
        0,
        this.scene.scale.width,
        this.scene.scale.height,
        0x000000,
        0
      );
      flash.setOrigin(0);

      this.scene.tweens.add({
        targets: flash,
        alpha: 1,
        duration,
        ease: 'Linear',
        onComplete: () => {
          flash.destroy();
          resolve();
        },
      });
    });
  }

  public shakeCamera(intensity: number = 10, duration: number = 300): void {
    this.scene.cameras.main.shake(duration, intensity / 1000);
  }

  public flashScreen(color: number = 0xffffff, duration: number = 200): void {
    const flash = this.scene.add.rectangle(
      0,
      0,
      this.scene.scale.width,
      this.scene.scale.height,
      color,
      1
    );
    flash.setOrigin(0);
    flash.setAlpha(0);

    this.scene.tweens.add({
      targets: flash,
      alpha: 0.5,
      yoyo: true,
      duration,
      ease: 'Linear',
      onComplete: () => flash.destroy(),
    });
  }
}
