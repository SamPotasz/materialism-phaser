import 'phaser';
import {CONFIG, EVENT_TYPES, START_BUTTON_STATES} from '../constants';

const ON_NAME = 'play_button1';
const OFF_NAME = 'play_button2';
const COMPLETE_SPRITE = 'play_button3'

class StartButtonView {
  constructor({scene, x, y, dispatch}) {
    this.sprite = scene.add.sprite(x, y, 
      CONFIG.ATLAS_NAME, ON_NAME);

    this.currState = START_BUTTON_STATES.INACTIVE;

    this.sprite.setInteractive({useHandCursor: true});
    this.sprite.on('pointerdown', this.onStartClick, this);

    this.dispatch = dispatch;
  }

  get width() { return this.sprite.width }
  get height() { return this.sprite.height }
  set y(value) { this.sprite.y = value; }
  set x(value) { this.sprite.x = value; }

  setState( value ) {
    if( value !== this.currState )
    {
      switch( value ){
        case START_BUTTON_STATES.INACTIVE:
          this.sprite.setFrame(ON_NAME)
          this.sprite.setInteractive({useHandCursor: true});
          break;
        case START_BUTTON_STATES.ACTIVE:
          this.sprite.setFrame(OFF_NAME);
          this.sprite.disableInteractive();
          break;
        default:
          this.sprite.setFrame(COMPLETE_SPRITE);
          this.sprite.disableInteractive();
          break;
      }
      this.currState = value;
    }
  }

  onStartClick() {
    // console.log('start clicked')
    // console.log(this.dispatch);
    this.sprite.scene.sound.play(CONFIG.UNLOCK_SFX);
    this.dispatch.emit(EVENT_TYPES.JOB_START);
  }

  setVisible( value ) {
    this.sprite.setVisible( value );
  }
}

export default StartButtonView;