import Phaser from 'phaser';
import { Card } from './Card';

export class Board extends Phaser.GameObjects.Container {
  private rows: number;
  private cols: number;
  private cardSize: number = 64;
  private spacing: number = 8;
  private background: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    rows: number = 8,
    cols: number = 8
  ) {
    super(scene, x, y);
    this.rows = rows;
    this.cols = cols;

    // Create board background
    this.background = scene.add.graphics();
    this.add(this.background);
    this.drawBackground();

    this.setSize(
      cols * (this.cardSize + this.spacing),
      rows * (this.cardSize + this.spacing)
    );
  }

  private drawBackground(): void {
    const width = this.cols * (this.cardSize + this.spacing);
    const height = this.rows * (this.cardSize + this.spacing);

    this.background.clear();
    this.background.fillStyle(0x16213e, 0.8);
    this.background.fillRoundedRect(
      -this.spacing,
      -this.spacing,
      width + this.spacing * 2,
      height + this.spacing * 2,
      16
    );

    this.background.lineStyle(2, 0x4a69bd, 1);
    this.background.strokeRoundedRect(
      -this.spacing,
      -this.spacing,
      width + this.spacing * 2,
      height + this.spacing * 2,
      16
    );
  }

  public getCellPosition(row: number, col: number): { x: number; y: number } {
    return {
      x: col * (this.cardSize + this.spacing) + this.cardSize / 2,
      y: row * (this.cardSize + this.spacing) + this.cardSize / 2,
    };
  }

  public getRowColFromPosition(x: number, y: number): { row: number; col: number } | null {
    const col = Math.floor(x / (this.cardSize + this.spacing));
    const row = Math.floor(y / (this.cardSize + this.spacing));

    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      return { row, col };
    }

    return null;
  }

  public areAdjacent(
    row1: number,
    col1: number,
    row2: number,
    col2: number
  ): boolean {
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  public highlightCell(row: number, col: number, color: number = 0xffff00): void {
    const pos = this.getCellPosition(row, col);
    const graphics = this.scene.add.graphics();
    graphics.lineStyle(3, color, 1);
    graphics.strokeRect(
      pos.x - this.cardSize / 2,
      pos.y - this.cardSize / 2,
      this.cardSize,
      this.cardSize
    );
  }

  public getRows(): number {
    return this.rows;
  }

  public getCols(): number {
    return this.cols;
  }
}
