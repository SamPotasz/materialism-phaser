import {Events} from 'phaser';
import CONFIG from '../constants';

export default class LockedJobView {
  constructor({ scene, x, y, 
    model: {jobData: {title, unlockCost} },
    dispatch}) {

    // this.clicked = new Events.EventEmitter();
    // this.group = scene.add.group();

    this.button = scene.add.image( x, y, 
      CONFIG.ATLAS_NAME, 'red_button01');
    this.button.setInteractive({useHandCursor: true});
    this.button.on('pointerdown', () => {
      dispatch.emit('');
    })

    this.label = scene.add.text( x, y,
      `Unlock ${title}: ${unlockCost}`)

    // this.group.add(this.button);
    // this.group.add(this.label);
  }

  setVisible( value ) {
    this.button.setVisible( value );
    this.label.setVisible( value );
  }
}