import {Events} from 'phaser';
import CONFIG from '../constants';

import LockedJobView from './LockedJobView';
import UnlockedJobView from './UnlockedJobView';

/**
 * The class which actually displays the things to start!
 */
export default class JobView {
  constructor({ scene, x, y, model }) {
    
    this.startClicked = new Events.EventEmitter();
    this.unlockClicked = new Events.EventEmitter();
    this.unlockClicked.on('', () => console.log('clicked'));

    this.lockedView = new LockedJobView({
      scene, x, y, model, 
      dispatch: this.unlockClicked,
    });

    this.unlockedView = new UnlockedJobView({
      scene, x, y, model,
      dispatch: this.startClicked
    });

    this.displayIsUnlocked( model.jobData.isUnlocked );
  }

  displayIsUnlocked( isUnlocked ) {
    this.unlockedView.setVisible( isUnlocked );
    this.lockedView.setVisible( !isUnlocked );
  }
}