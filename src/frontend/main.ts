import Phaser from 'phaser';
import { MatchGame } from './game/MatchGame';
import { MainMenu } from './ui/MainMenu';
import { GameUI } from './ui/GameUI';
import { ResultScreen } from './ui/ResultScreen';

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1a1a2e',
  parent: 'game-container',
  scene: [MainMenu, MatchGame, GameUI, ResultScreen],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
    antialias: false,
  },
};

// Initialize the game
const game = new Phaser.Game(config);

// Handle window resize
window.addEventListener('resize', () => {
  game.scale.refresh();
});

// Export game instance for debugging
export { game };

// Log initialization
console.log('🎮 王者萌萌消 - Game Initialized');
console.log(`📐 Game Size: ${config.width}x${config.height}`);
console.log(`🎭 Scenes: ${config.scene?.length || 0} loaded`);

// Notify that game is loaded (for GitHub Pages loading screen)
if (typeof window !== 'undefined') {
  (window as any).gameLoaded?.();
}
