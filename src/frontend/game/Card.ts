import Phaser from 'phaser';

export type CardType = 
  | 'sword'
  | 'shield'
  | 'potion'
  | 'crown'
  | 'gem'
  | 'scroll';

export interface CardData {
  id: string;
  type: CardType;
  row: number;
  col: number;
  isSelected: boolean;
  isMatched: boolean;
  isLocked: boolean;
}

export class Card extends Phaser.GameObjects.Container {
  public data: CardData;
  private sprite: Phaser.GameObjects.Image;
  private highlight: Phaser.GameObjects.Graphics;
  private tween: Phaser.Tweens.Tween | null;

  private static readonly CARD_SIZE = 64;
  private static readonly SPACING = 8;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    data: CardData
  ) {
    super(scene, x, y);
    this.data = data;
    this.setSize(Card.CARD_SIZE, Card.CARD_SIZE);

    // Create card sprite
    this.sprite = scene.add.image(0, 0, `card_${data.type}`);
    this.sprite.setDisplaySize(Card.CARD_SIZE, Card.CARD_SIZE);
    this.add(this.sprite);

    // Create highlight overlay
    this.highlight = scene.add.graphics();
    this.add(this.highlight);

    // Enable interaction
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -Card.CARD_SIZE / 2,
        -Card.CARD_SIZE / 2,
        Card.CARD_SIZE,
        Card.CARD_SIZE
      ),
      Phaser.Geom.Rectangle.Contains
    );

    this.setupInteractions();
    this.updateVisuals();
  }

  private setupInteractions(): void {
    this.on('pointerover', () => {
      if (!this.data.isLocked && !this.data.isMatched) {
        this.sprite.setScale(1.1);
      }
    });

    this.on('pointerout', () => {
      if (!this.data.isSelected) {
        this.sprite.setScale(1.0);
      }
    });

    this.on('pointerdown', () => {
      if (!this.data.isLocked && !this.data.isMatched) {
        this.emit('cardClicked', this);
      }
    });
  }

  public select(): void {
    this.data.isSelected = true;
    this.updateVisuals();
  }

  public deselect(): void {
    this.data.isSelected = false;
    this.updateVisuals();
  }

  public match(): void {
    this.data.isMatched = true;
    this.createMatchEffect();
  }

  public lock(): void {
    this.data.isLocked = true;
    this.sprite.setAlpha(0.5);
  }

  public unlock(): void {
    this.data.isLocked = false;
    this.sprite.setAlpha(1.0);
  }

  public updatePosition(row: number, col: number): void {
    this.data.row = row;
    this.data.col = col;
    
    const x = col * (Card.CARD_SIZE + Card.SPACING);
    const y = row * (Card.CARD_SIZE + Card.SPACING);
    
    this.createMoveTween(x, y);
  }

  private createMoveTween(targetX: number, targetY: number): void {
    if (this.tween) {
      this.tween.stop();
    }

    this.tween = this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: 200,
      ease: 'Power2',
    });
  }

  private createMatchEffect(): void {
    this.scene.tweens.add({
      targets: this.sprite,
      scale: 1.3,
      alpha: 0,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        this.setVisible(false);
      },
    });
  }

  private updateVisuals(): void {
    this.highlight.clear();

    if (this.data.isSelected) {
      this.highlight.lineStyle(3, 0xffff00, 1);
      this.highlight.strokeRect(
        -Card.CARD_SIZE / 2,
        -Card.CARD_SIZE / 2,
        Card.CARD_SIZE,
        Card.CARD_SIZE
      );
      this.sprite.setScale(1.1);
    } else if (this.data.isMatched) {
      this.sprite.setAlpha(0);
    } else {
      this.sprite.setScale(1.0);
      this.sprite.setAlpha(1.0);
    }
  }

  public reset(): void {
    this.data.isSelected = false;
    this.data.isMatched = false;
    this.data.isLocked = false;
    this.setVisible(true);
    this.updateVisuals();
  }

  public getType(): CardType {
    return this.data.type;
  }

  public getId(): string {
    return this.data.id;
  }
}
