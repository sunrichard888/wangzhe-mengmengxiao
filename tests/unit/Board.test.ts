import { Board } from '../../src/frontend/game/Board';

describe('Board', () => {
  let mockScene: any;
  let board: Board;

  beforeEach(() => {
    // Mock Phaser scene
    mockScene = {
      add: {
        graphics: jest.fn(() => ({
          clear: jest.fn(),
          fillStyle: jest.fn(),
          fillRoundedRect: jest.fn(),
          lineStyle: jest.fn(),
          strokeRoundedRect: jest.fn(),
        })),
        rectangle: jest.fn(),
      },
    };

    board = new Board(mockScene, 0, 0, 8, 8);
  });

  describe('Initialization', () => {
    it('should create board with correct dimensions', () => {
      expect(board.getRows()).toBe(8);
      expect(board.getCols()).toBe(8);
    });

    it('should accept custom dimensions', () => {
      const customBoard = new Board(mockScene, 0, 0, 10, 10);
      expect(customBoard.getRows()).toBe(10);
      expect(customBoard.getCols()).toBe(10);
    });
  });

  describe('Cell Position', () => {
    it('should calculate cell position correctly', () => {
      const pos = board.getCellPosition(0, 0);
      expect(pos.x).toBe(32); // cardSize / 2
      expect(pos.y).toBe(32);
    });

    it('should calculate position for any cell', () => {
      const pos = board.getCellPosition(3, 4);
      expect(pos.x).toBe(4 * 72 + 32);
      expect(pos.y).toBe(3 * 72 + 32);
    });
  });

  describe('Position to Grid Conversion', () => {
    it('should convert pixel position to grid coordinates', () => {
      const grid = board.getRowColFromPosition(100, 100);
      expect(grid).not.toBeNull();
      expect(grid!.row).toBeGreaterThanOrEqual(0);
      expect(grid!.col).toBeGreaterThanOrEqual(0);
    });

    it('should return null for out of bounds', () => {
      const grid = board.getRowColFromPosition(-100, -100);
      expect(grid).toBeNull();
    });
  });

  describe('Adjacency Check', () => {
    it('should identify horizontally adjacent cells', () => {
      expect(board.areAdjacent(0, 0, 0, 1)).toBe(true);
      expect(board.areAdjacent(3, 4, 3, 5)).toBe(true);
    });

    it('should identify vertically adjacent cells', () => {
      expect(board.areAdjacent(0, 0, 1, 0)).toBe(true);
      expect(board.areAdjacent(4, 3, 5, 3)).toBe(true);
    });

    it('should reject non-adjacent cells', () => {
      expect(board.areAdjacent(0, 0, 2, 2)).toBe(false);
      expect(board.areAdjacent(0, 0, 0, 2)).toBe(false);
      expect(board.areAdjacent(0, 0, 2, 0)).toBe(false);
    });

    it('should reject diagonal cells', () => {
      expect(board.areAdjacent(0, 0, 1, 1)).toBe(false);
      expect(board.areAdjacent(3, 3, 4, 4)).toBe(false);
    });
  });
});
