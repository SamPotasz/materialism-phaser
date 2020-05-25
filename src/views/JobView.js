import 'phaser';
import CONFIG from '../gameConfig';

import StartButtonView from './StartButtonView';

/**
 * The class which actually displays the things to start!
 */
export default class JobView {
  constructor({ scene, x, y, model }) {
    const { jobData: {title} } = model;
    
    // console.log({jobData})
    // console.log({data});
    // console.log(`adding ${title} @ ${x}, ${y}`);
    
    this.titleText = scene.add.text(x, y, title);
    
    this.startButton = new StartButtonView({ 
      scene, x, y});
    // this.startButton.enable();
    if(Math.random() > 0.5) { this.startButton.enable() } else { this.startButton.disable() }
  }

  // create
}