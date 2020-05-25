import 'phaser';
import CONFIG from '../gameConfig';

const ON_NAME = 'green_button11';
const OFF_NAME = 'grey_button11';

class StartButtonView {
  constructor({scene, x, y}) {
    this.sprite = scene.add.sprite(x, y, 
      CONFIG.ATLAS_NAME, ON_NAME);
  }

  enable() {
    this.sprite.setFrame(ON_NAME)
    this.sprite.setInteractive({useHandCursor: true});
    this.sprite.on('pointerdown', this.onStartClick, this)
  }

  disable() {
    this.sprite.setFrame(OFF_NAME);
    this.sprite.disableInteractive();
    // this.sprite
  }

  onStartClick() {
    console.log("start clicked!");
  }
}

export default StartButtonView;