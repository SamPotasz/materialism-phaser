import 'phaser';
import {CONFIG, EVENT_TYPES} from '../constants';

const BG_NAME = 'blue_button13';
const BUY_BUTTON = 'yellow_button10';
const BUY_BUTTON_OFF = 'grey_button10';

class AppButton extends Phaser.GameObjects.Container {
  constructor({scene, x, y, atlas, model, emitter}) {
    super(scene, x, y);
    
    this.model = model;

    this.bg = scene.add.image(x, y, atlas, BG_NAME);
    
    this.nameText = scene.add.text(x, y, model.name, {color: '0xffffff'});
    this.descText = scene.add.text(x, y + 15, model.description, {color: '0xffffff'});
    this.nameText.x -= Math.floor(this.nameText.width / 2);
    this.descText.x -= Math.floor(this.descText.width / 2);

    this.buyButton = scene.add.image(x + 30, y, atlas, BUY_BUTTON);
    this.buyButton.setInteractive({useHandCursor: true});
    this.buyButton.on('pointerdown', 
      () => emitter.emit(EVENT_TYPES.APP_PURCHASED, model.id))

    this.buyText = scene.add.text(
      this.buyButton.x,
      this.buyButton.y,
      `$${model.cost}`
    )

    this.add(this.bg);
    this.add(this.nameText);
    this.add(this.descText);
    this.add(this.buyButton);
    this.add(this.buyText);
  }

  update( score ) {
    // console.log('updating button for ' + this.model.name + " " + score);
    if( this.model.isActive ){
      this.buyButton.setFrame(BUY_BUTTON_OFF);
      this.buyText.text = "BOUGHT!";
    }
    else {
      if( score >= this.model.cost ) {
        this.buyButton.setInteractive({useHandCursor: true});
        this.buyButton.setFrame(BUY_BUTTON);
      }
      else {
        this.buyButton.disableInteractive();
        this.buyButton.setFrame(BUY_BUTTON_OFF);
      }
    }
  }
}

export default AppButton;