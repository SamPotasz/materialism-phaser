import 'phaser';
import { CONFIG } from '../constants';
import AppButton from './AppButton';

const MENU_BG = 'grey_panel';

export default class AppsMenu extends Phaser.GameObjects.Container {
  constructor( scene, x, y, model, emitter ) {
    console.log({scene, x, y})
    super( scene, x, y );
    this.model = model;
    this.emitter = emitter;

    const menuBG = scene.add.image(0, 0, CONFIG.ATLAS_NAME, MENU_BG).setScale(4.0, 3.0);
    const closeButton = 
      scene.add.image(menuBG.displayWidth / 2, -menuBG.displayHeight / 2,
        CONFIG.ATLAS_NAME, "red_boxCross");
    closeButton.setInteractive({useHandCursor: true});
    closeButton.on('pointerdown', () => { this.setVisible(false); })

    this.add(menuBG);
    //create a bunch of buttons!
    this.buttons = [];
    this.model.jobs.forEach((model, i) => {
      const appButton = new AppButton({ 
        scene, 
        x: 0, 
        y: i * 30 - (menuBG.displayHeight / 4),
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

  update() {
    this.buttons.forEach( button => button.update( this.model.score ));
  }
}