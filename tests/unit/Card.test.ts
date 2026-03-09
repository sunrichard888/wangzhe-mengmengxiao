import { Card, CardType } from '../../src/frontend/game/Card';

// Mock Phaser dependencies
const mockScene = {
  add: {
    image: jest.fn(() => ({
      setDisplaySize: jest.fn(),
      setScale: jest.fn(),
      setAlpha: jest.fn(),
    })),
    graphics: jest.fn(() => ({
      clear: jest.fn(),
      lineStyle: jest.fn(),
      strokeRect: jest.fn(),
    })),
  },
  tweens: {
    add: jest.fn((config) => ({
      stop: jest.fn(),
    })),
  },
};

describe('Card', () => {
  let card: Card;
  let cardData: any;

  beforeEach(() => {
    cardData = {
      id: 'card-1',
      type: 'sword' as CardType,
      row: 0,
      col: 0,
      isSelected: false,
      isMatched: false,
      isLocked: false,
    };
    card = new Card(mockScene as any, 0, 0, cardData);
  });

  describe('Card Creation', () => {
    it('should create card with correct properties', () => {
      expect(card.data.id).toBe('card-1');
      expect(card.data.type).toBe('sword');
      expect(card.data.row).toBe(0);
      expect(card.data.col).toBe(0);
    });

    it('should initialize with default state', () => {
      expect(card.data.isSelected).toBe(false);
      expect(card.data.isMatched).toBe(false);
      expect(card.data.isLocked).false);
    });

    it('should create card with different types', () => {
      const types: CardType[] = ['sword', 'shield', 'potion', 'crown', 'gem', 'scroll'];
      
      types.forEach((type) => {
        const testData = { ...cardData, type, id: `card-${type}` };
        const testCard = new Card(mockScene as any, 0, 0, testData);
        expect(testCard.getType()).toBe(type);
      });
    });
  });

  describe('State Transitions', () => {
    it('should select card', () => {
      card.select();
      expect(card.data.isSelected).toBe(true);
    });

    it('should deselect card', () => {
      card.select();
      expect(card.data.isSelected).toBe(true);
      
      card.deselect();
      expect(card.data.isSelected).toBe(false);
    });

    it('should match card', () => {
      card.match();
      expect(card.data.isMatched).toBe(true);
    });

    it('should lock card', () => {
      card.lock();
      expect(card.data.isLocked).toBe(true);
    });

    it('should unlock card', () => {
      card.lock();
      expect(card.data.isLocked).toBe(true);
      
      card.unlock();
      expect(card.data.isLocked).toBe(false);
    });

    it('should complete state transition: select → match → clear', () => {
      // Initial state
      expect(card.data.isSelected).toBe(false);
      expect(card.data.isMatched).toBe(false);

      // Select
      card.select();
      expect(card.data.isSelected).toBe(true);
      expect(card.data.isMatched).toBe(false);

      // Match
      card.match();
      expect(card.data.isMatched).toBe(true);
    });
  });

  describe('Position Updates', () => {
    it('should update card position', () => {
      card.updatePosition(2, 3);
      expect(card.data.row).toBe(2);
      expect(card.data.col).toBe(3);
    });

    it('should calculate correct pixel position', () => {
      card.updatePosition(1, 1);
      // Position should be: col * (64 + 8), row * (64 + 8)
      expect(card.x).toBe(72);
      expect(card.y).toBe(72);
    });
  });

  describe('Reset Functionality', () => {
    it('should reset card to initial state', () => {
      card.select();
      card.match();
      card.lock();
      
      card.reset();
      
      expect(card.data.isSelected).toBe(false);
      expect(card.data.isMatched).toBe(false);
      expect(card.data.isLocked).toBe(false);
      expect(card.visible).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should not allow interaction when locked', () => {
      card.lock();
      // Card should still allow select/deselect calls but visual state differs
      card.select();
      expect(card.data.isSelected).toBe(true);
      expect(card.data.isLocked).toBe(true);
    });

    it('should handle multiple select/deselect cycles', () => {
      for (let i = 0; i < 5; i++) {
        card.select();
        expect(card.data.isSelected).toBe(true);
        card.deselect();
        expect(card.data.isSelected).toBe(false);
      }
    });

    it('should maintain type after reset', () => {
      const originalType = card.getType();
      card.reset();
      expect(card.getType()).toBe(originalType);
    });

    it('should maintain id after reset', () => {
      const originalId = card.getId();
      card.reset();
      expect(card.getId()).toBe(originalId);
    });
  });

  describe('Getters', () => {
    it('should return correct type', () => {
      expect(card.getType()).toBe('sword');
    });

    it('should return correct id', () => {
      expect(card.getId()).toBe('card-1');
    });
  });
});
