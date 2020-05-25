import Phaser from "phaser";
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  resolution: window.devicePixelRatio,
  width: 800,
  height: 600,
  dom: {
    createContainer: true
  },
  scene: [
    PreloaderScene,
    GameScene
  ],
  backgroundColor: '0xcccccc'
};

const game = new Phaser.Game(config);
