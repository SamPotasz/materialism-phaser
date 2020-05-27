import 'phaser';
import {CONFIG, EVENT_TYPES} from '../constants';

const BG_NAME = 'blue_button13';
const BUY_BUTTON = 'yellow_button10';
const BUY_BUTTON_OFF = 'grey_button10';

class AppButton extends Phaser.GameObjects.Container {
  constructor({scene, x, y, atlas, model, emitter}) {
    super(scene, x, y);
    
    this.parent = model;
    this.model = model.student;

    this.bg = scene.add.image(x, y, atlas, BG_NAME)
      .setScale(2.0, 1.35);

    const bgTop = this.bg.y - this.bg.displayHeight / 2;
    const bgLeft = this.bg.x - this.bg.displayWidth / 2;
    
    this.nameText = scene.add.text( bgLeft + 15, bgTop + 10,
      this.model.name, 
      {fontFamily: 'Muli', color: '0xffffff'});
    
    this.descText = scene.add.text(
      this.nameText.x, this.nameText.y + 20,
      this.model.description, 
      {fontFamily: 'Muli', color: '0xffffff'});

    this.buyButton = scene.add.image(x + 132, y - 4, atlas, BUY_BUTTON)
      .setScale(2.0, 1.0)
      .setInteractive({useHandCursor: true})
      .on('pointerdown', 
        () => {
          emitter.emit(EVENT_TYPES.APP_PURCHASED, model.id);
          this.scene.sound.play(CONFIG.APP_BUY_SFX);
        });

    this.buyText = scene.add.text(
      this.buyButton.x,
      this.buyButton.y,
      `${this.model.cost} pts`,
      {fontFamily: 'Muli', color: '0xffffff'}
    )
    Phaser.Display.Align.In.Center(this.buyText, this.buyButton);

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
      Phaser.Display.Align.In.Center(this.buyText, this.buyButton);
      this.buyButton.disableInteractive();
    }
    else {
      if( score >= this.model.cost && this.parent.isUnlocked ) {
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