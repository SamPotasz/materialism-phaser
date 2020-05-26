import {CONFIG, EVENT_TYPES} from '../constants';

const ENABLED_FRAME = 'red_button01';
const DISABLED_FRAME = 'grey_button01';

export default class LockedJobView {
  constructor({ scene, x, y, 
    model: {title, unlockCost},
    dispatch}) {

    this.emitter = dispatch;
    this.unlockCost = unlockCost;
    
    this.button = scene.add.image( x, y, 
      CONFIG.ATLAS_NAME, 'red_button01');
    this.button.on('pointerdown', () => {
        console.log('emitting')
        this.emitter.emit(EVENT_TYPES.UNLOCK_CLICK);
      })

    this.label = scene.add.text( x, y,
      `Unlock ${title}: ${unlockCost}`)
      
    // this.setEnabled( true );
  }

  setEnabled( value ) {
    const frame = value ? ENABLED_FRAME : DISABLED_FRAME;
    this.button.setFrame( frame );

    if( value ) {
      this.button.setInteractive({useHandCursor: true});
    }
    else {
      this.button.disableInteractive();
    }
  }

  /**
   * When the model's score value changes.
   * @param score 
   */
  update( score ) {
    this.setEnabled( score >= this.unlockCost );
  }

  setVisible( value ) {
    this.button.setVisible( value );
    this.label.setVisible( value );
  }
}