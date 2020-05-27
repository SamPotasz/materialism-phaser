import 'phaser';
import StartButtonView from './StartButtonView';
import TimeLeftView from './TimeLeftView';
import UpgradeButton from './UprgradeButton';

export default class UnlockedJobView  {
  constructor({ scene, x, y, model, dispatch }) {

    const { title } = model;
    this.model = model;

    this.startButton = new StartButtonView({ 
      scene, x, y, dispatch});

    const titleX = x + ( this.startButton.width / 2 ) + 5;
    this.titleText = scene.add.text( 
      titleX, y - 10, title);

    this.pointsText = scene.add.text(
      titleX, y + 15, this.pointsString );

    this.upgradeButton = new UpgradeButton({
      scene, x, 
      y: y + 15, 
      model,
      emitter: dispatch
    });

    this.timeDisplay = new TimeLeftView({
      scene, x: titleX + this.titleText.width + 5, y, model 
    });
  }

  update( score ) {
    this.startButton.setEnabled( !this.model.isActive );
    this.timeDisplay.update();
    this.upgradeButton.update( score );
    this.pointsText.text = this.pointsString;
  }

  setVisible( value ) {
    this.startButton.setVisible( value );
    this.titleText.setVisible( value );
    this.pointsText.setVisible( value );
    this.timeDisplay.setVisible( value );
  }

  get pointsString() {
    return "Earns " + this.model.benefit.toFixed(2);
  }
}