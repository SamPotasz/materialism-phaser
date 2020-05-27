import { Display } from 'phaser';
import { CONFIG, EVENT_TYPES } from '../constants';
import ToggleableButton from "./ToggleableButton";

export default class UpgradeButton extends Phaser.GameObjects.Container {

  constructor({scene, x, y, model, emitter}) {
    super(scene, x, y);
    this.model = model;

    this.button = new ToggleableButton({
      scene,
      x: 0, y: 0,
      atlas: CONFIG.ATLAS_NAME,
      onFrame: CONFIG.SPRITES.UPGRADE_ON,
      offFrame: CONFIG.SPRITES.UPGRADE_OFF,
      emitter,
      eventName: EVENT_TYPES.UPGRADE_CLICK
    })
    this.button.setScale(1.0, 0.8);

    this.label = scene.add.text(x, y, this.labelText,
      {fontFamily: 'Muli', fontSize: '14px'});
    Display.Align.In.Center(this.label, this.button);

    this.add(this.button);
    this.add(this.label);
    this.scene.add.existing(this);
  }

  get labelText() {
    return `Upgrade: ${this.model.upgradeCost.toFixed(2)} pts`
  }

  update( score ) {
    this.label.text = this.labelText;
    this.button.setActive( 
      this.model.canUpgrade( score )
    );
    // Display.Align.In.Center(this.label, this.button);
  }
}