import Phaser from 'phaser';

export interface EffectConfig {
  type: 'sparkle' | 'explosion' | 'float' | 'pulse';
  x: number;
  y: number;
  color?: number;
  duration?: number;
}

export class Effects {
  private scene: Phaser.Scene;
  private activeEffects: Map<number, Phaser.GameObjects.GameObject[]>;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.activeEffects = new Map();
  }

  public playSparkle(x: number, y: number, color: number = 0xffff00): void {
    const sparkles: Phaser.GameObjects.GameObject[] = [];

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const distance = 30;
      const sparkleX = x + Math.cos(angle) * distance;
      const sparkleY = y + Math.sin(angle) * distance;

      const sparkle = this.scene.add.circle(sparkleX, sparkleY, 3, color);
      sparkles.push(sparkle);

      this.scene.tweens.add({
        targets: sparkle,
        x: x + Math.cos(angle) * 60,
        y: y + Math.sin(angle) * 60,
        alpha: 0,
        scale: 0,
        duration: 500,
        ease: 'Power2',
        onComplete: () => sparkle.destroy(),
      });
    }

    this.trackEffect(Date.now(), sparkles);
  }

  public playExplosion(x: number, y: number, color: number = 0xff6b6b): void {
    const particles: Phaser.GameObjects.GameObject[] = [];

    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 100;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const particle = this.scene.add.circle(x, y, 4 + Math.random() * 4, color);
      particles.push(particle);

      this.scene.tweens.add({
        targets: particle,
        x: x + vx * 5,
        y: y + vy * 5,
        alpha: 0,
        scale: 0,
        duration: 600 + Math.random() * 400,
        ease: 'Power2',
        onComplete: () => particle.destroy(),
      });
    }

    this.trackEffect(Date.now(), particles);
  }

  public playFloatText(
    x: number,
    y: number,
    text: string,
    color: number = 0xffffff
  ): void {
    const floatText = this.scene.add.text(x, y, text, {
      font: 'bold 24px Arial',
      fill: '#' + color.toString(16).padStart(6, '0'),
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    this.scene.tweens.add({
      targets: floatText,
      y: y - 50,
      alpha: 0,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => floatText.destroy(),
    });
  }

  public playPulse(gameObject: Phaser.GameObjects.GameObject, duration: number = 300): void {
    this.scene.tweens.add({
      targets: gameObject,
      scale: 1.2,
      yoyo: true,
      repeat: 1,
      duration,
      ease: 'Sine.easeInOut',
    });
  }

  public playCardSwap(
    card1: Phaser.GameObjects.GameObject,
    card2: Phaser.GameObjects.GameObject,
    duration: number = 200
  ): Promise<void> {
    return new Promise((resolve) => {
      const x1 = card1.x;
      const y1 = card1.y;
      const x2 = card2.x;
      const y2 = card2.y;

      this.scene.tweens.add({
        targets: [card1, card2],
        x: [x1, x2],
        y: [y1, y2],
        duration,
        ease: 'Power2',
        onComplete: () => {
          // Swap back for failed swap
          this.scene.tweens.add({
            targets: [card1, card2],
            x: [x2, x1],
            y: [y2, y1],
            duration,
            ease: 'Power2',
            onComplete: () => resolve(),
          });
        },
      });
    });
  }

  public playCardFall(
    card: Phaser.GameObjects.GameObject,
    fromY: number,
    toY: number,
    duration: number = 300
  ): void {
    card.y = fromY;
    card.setAlpha(0);

    this.scene.tweens.add({
      targets: card,
      y: toY,
      alpha: 1,
      duration,
      ease: 'Bounce.easeOut',
    });
  }

  private trackEffect(id: number, objects: Phaser.GameObjects.GameObject[]): void {
    this.activeEffects.set(id, objects);

    // Auto-cleanup after 2 seconds
    setTimeout(() => {
      this.activeEffects.delete(id);
    }, 2000);
  }

  public clearAllEffects(): void {
    this.activeEffects.forEach((objects) => {
      objects.forEach((obj) => obj.destroy());
    });
    this.activeEffects.clear();
  }
}
