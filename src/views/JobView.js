import {Events} from 'phaser';
import CONFIG from '../constants';

import LockedJobView from './LockedJobView';
import UnlockedJobView from './UnlockedJobView';

/**
 * The class which actually displays the things to start!
 */
export default class JobView {
  constructor({ scene, x, y, model }) {
    
    this.emitter = new Events.EventEmitter();
    this.model = model;
    // this.unlockClicked = new Events.EventEmitter();
    // this.unlockClicked.on('', () => console.log('clicked'));

    this.lockedView = new LockedJobView({
      scene, 
      x, 
      y: y + 20, model, 
      dispatch: this.emitter,
    });

    this.unlockedView = new UnlockedJobView({
      scene, x, y, model,
      dispatch: this.emitter
    });
  }

  update( score ) {
    this.displayIsUnlocked( this.model.isUnlocked )
    this.unlockedView.update( score );
    this.lockedView.update( score );
  }

  displayIsUnlocked( isUnlocked ) {
    this.unlockedView.setVisible( isUnlocked );
    this.lockedView.setVisible( !isUnlocked );
  }
}