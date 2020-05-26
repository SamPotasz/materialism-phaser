import 'phaser';
import StartButtonView from './StartButtonView';
import TimeLeftView from './TimeLeftView';

export default class UnlockedJobView  {
  constructor({ scene, x, y, model, dispatch }) {

    const { title, duration} = model;

    this.startButton = new StartButtonView({ 
      scene, x, y, dispatch});
    this.startButton.enable();
    // if(Math.random() > 0.5) { this.startButton.enable() } else { this.startButton.disable() }

    const titleX = x + ( this.startButton.width / 2 ) + 5;
    this.titleText = scene.add.text( 
      titleX, y - 10, title);

    this.timeDisplay = new TimeLeftView({
      scene, x: titleX + this.titleText.width + 5, y, duration 
    });
  }

  onScoreUpdate( score ) {
    
  }

  setVisible( value ) {
    this.startButton.setVisible( value );
    this.titleText.setVisible( value );
    this.timeDisplay.setVisible( value );
  }
}