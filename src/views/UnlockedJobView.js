import 'phaser';
import StartButtonView from './StartButtonView';
import TimeLeftView from './TimeLeftView';
import UpgradeButton from './UprgradeButton';

export default class UnlockedJobView {
  constructor({ scene, x, y, model, dispatch }) {

    const { title } = model;
    this.model = model;

    this.titleText = scene.add.text( 
      x, y, title, 
      {fontFamily: 'Muli', fontSize: '18px', color: '0xffffff'});

    this.startButton = new StartButtonView({ 
      scene, 
      x, 
      y: y + 36, dispatch});
    
    this.pointsText = scene.add.text(
      x + 30, y + 22, this.pointsString, 
      {fontFamily: 'Muli', fontSize: 12} );

    this.upgradeButton = new UpgradeButton({
      scene, 
      x: x + 70, 
      y: y + 70, 
      model,
      emitter: dispatch
    });
    // this.upgradeButton.x = -this.upgradeButton.displayWidth / 2;

    this.timeDisplay = new TimeLeftView({
      scene, 
      x: x - 50, 
      y: y + 30, 
      model 
    });
  }

  update( score ) {
    this.startButton.setState( this.model.startButtonState );
    this.timeDisplay.update();
    this.upgradeButton.update( score );
    this.pointsText.text = this.pointsString;
  }

  setVisible( value ) {
    this.startButton.setVisible( value );
    this.titleText.setVisible( value );
    this.pointsText.setVisible( value );
    this.timeDisplay.setVisible( value );
    this.upgradeButton.setVisible( value );
  }

  get pointsString() {
    return "Level: " + (this.model.numUpgrades + 1) +
      "\nEarns " + this.model.benefit.toFixed(2);
  }
}