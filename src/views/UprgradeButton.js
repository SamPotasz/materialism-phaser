import { Display } from 'phaser';
import { CONFIG, EVENT_TYPES } from '../constants';
import ToggleableButton from "./ToggleableButton";

export default class UpgradeButton {

  constructor({scene, x, y, model, emitter}) {
    this.model = model;

    this.button = new ToggleableButton({
      scene,
      x, y,
      atlas: CONFIG.ATLAS_NAME,
      onFrame: CONFIG.SPRITES.UPGRADE_ON,
      offFrame: CONFIG.SPRITES.UPGRADE_OFF,
      emitter,
      eventName: EVENT_TYPES.UPGRADE_CLICK
    })

    this.label = scene.add.text(x, y, this.labelText);
    Display.Align.In.Center(this.label, this.button);
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