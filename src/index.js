import Phaser from "phaser";
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';

export const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  dom: {
    createContainer: true
  },
  scale: {
    mode: Phaser.Scale.NONE,
  },
  scene: [
    PreloaderScene,
    GameScene
  ],
  backgroundColor: '0xcccccc'
};

const game = new Phaser.Game(config);
