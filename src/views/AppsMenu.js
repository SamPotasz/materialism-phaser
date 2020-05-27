import {Display} from 'phaser';
import { CONFIG } from '../constants';
import AppButton from './AppButton';

const MENU_BG = 'grey_panel_big';

export default class AppsMenu extends Phaser.GameObjects.Container {
  constructor( scene, x, y, model, emitter ) {
    console.log({scene, x, y})
    super( scene, x, y );
    this.model = model;
    this.emitter = emitter;

    const modal = scene.add.image(0, 0, CONFIG.ATLAS_NAME, MENU_BG)
      .setScale(15.0).setTint('0xcccccc').setAlpha(0.6)
      .setInteractive().on('pointerdown', () => { this.setVisible(false); });
    this.add(modal);

    const menuBG = scene.add.image(0, 0, CONFIG.ATLAS_NAME, MENU_BG); //.setScale(4.0, 3.0);
    this.add(menuBG);
    
    const menuTop = -menuBG.displayHeight / 2
    const closeButton = 
      scene.add.image(menuBG.displayWidth / 2, menuTop,
        CONFIG.ATLAS_NAME, "red_boxCross");
    closeButton.setInteractive({useHandCursor: true});
    closeButton.on('pointerdown', () => { this.setVisible(false); })

    const title = scene.add.text(0, 
      menuTop + 18, CONFIG.APP_MENU_TITLE,
      {fontFamily: 'Muli', fontSize: '22px', color: '0xffffff'})
      .setOrigin(0.5);
    this.add(title);
    
    const desc = scene.add.text(0, 0, CONFIG.APP_MENU_DESC,
      {fontFamily: 'Muli', fontSize: '16px', color: '0xffffff', align: 'center'})
      .setOrigin(0.5);
    desc.y = title.y + 30;
    this.add(desc);

    //create a bunch of buttons!
    this.buttons = [];
    this.model.jobs.forEach((model, i) => {
      const appButton = new AppButton({ 
        scene, 
        x: 0, 
        y: menuTop + 152 + i * 32,
        atlas: CONFIG.ATLAS_NAME,
        model,
        emitter: this.emitter
       })
       this.add( appButton );
       this.buttons.push(appButton);
    });

    this.add(closeButton);

    this.scene.add.existing(this);
  }

  setVisible(value) {
    const sfxKey = value ? CONFIG.CLOSED_SFX : CONFIG.OPEN_SFX;
    this.scene.sound.play(sfxKey);
    super.setVisible( value );
  }

  update() {
    this.buttons.forEach( button => button.update( this.model.score ));
  }
}