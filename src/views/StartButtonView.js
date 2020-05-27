import 'phaser';
import {CONFIG, EVENT_TYPES} from '../constants';

const ON_NAME = 'green_button11';
const OFF_NAME = 'grey_button11';

class StartButtonView {
  constructor({scene, x, y, dispatch}) {
    this.sprite = scene.add.sprite(x, y, 
      CONFIG.ATLAS_NAME, ON_NAME);

    this.sprite.setInteractive({useHandCursor: true});
    this.sprite.on('pointerdown', this.onStartClick, this);

    this.dispatch = dispatch;
  }

  get width() { return this.sprite.width }
  get height() { return this.sprite.height }

  setEnabled( value ) {

    if( value ) {
      this.sprite.setFrame(ON_NAME)
      this.sprite.setInteractive({useHandCursor: true});
    }
    else {
      this.sprite.setFrame(OFF_NAME);
      this.sprite.disableInteractive();
    }
  }

  onStartClick() {
    // console.log('start clicked')
    // console.log(this.dispatch);
    this.dispatch.emit(EVENT_TYPES.JOB_START);
  }

  setVisible( value ) {
    this.sprite.setVisible( value );
  }
}

export default StartButtonView;