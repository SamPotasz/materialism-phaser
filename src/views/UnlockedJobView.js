import 'phaser';
import StartButtonView from './StartButtonView';
import TimeLeftView from './TimeLeftView';

export default class UnlockedJobView  {
  constructor({ scene, x, y, model, dispatch }) {

    const { title, duration} = model;
    this.model = model;

    this.startButton = new StartButtonView({ 
      scene, x, y, dispatch});
    // if(Math.random() > 0.5) { this.startButton.enable() } else { this.startButton.disable() }

    const titleX = x + ( this.startButton.width / 2 ) + 5;
    this.titleText = scene.add.text( 
      titleX, y - 10, title);

    this.pointsText = scene.add.text(
      titleX, y + 15, this.pointsString )

    this.timeDisplay = new TimeLeftView({
      scene, x: titleX + this.titleText.width + 5, y, model 
    });
  }

  update( score ) {
    this.startButton.setEnabled( !this.model.isActive );
    this.timeDisplay.update();
  }

  setVisible( value ) {
    this.startButton.setVisible( value );
    this.titleText.setVisible( value );
    this.pointsText.setVisible( value );
    this.timeDisplay.setVisible( value );
  }

  get pointsString() {
    return "Earns " + this.model.benefit;
  }
}