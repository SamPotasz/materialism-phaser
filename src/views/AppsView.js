import { Events, Display } from 'phaser';
import AppButton from './AppButton';

// const ON_NAME = 'green_panel';
const OFF_NAME = 'green_button13';
const MENU_BG = 'grey_panel';
const LABEL_TEXT = "BUY AN APP";
const NOTIF_ICON = 'red_tick';

export default class AppsView {
    
  constructor({scene, atlas, model}) {
    this.model = model;
    this.numJobs = this.model.jobs.length;
    this.emitter = new Events.EventEmitter();

    const buttonX = scene.cameras.main.width / 3;
    const buttonY = scene.cameras.main.height;
    this.button = scene.add.sprite( buttonX, buttonY, 
      atlas, OFF_NAME);
    this.button.y = buttonY - ( this.button.height / 2 )+ 5;
    this.button.setInteractive({useHandCursor: true});
    this.button.on('pointerdown', this.onButtonClick, this);

    this.label = scene.add.text( buttonX, buttonY - 30,
      LABEL_TEXT, {color: '0xffffff'} );
    this.label.x -= Math.floor( this.label.width / 2 );

    this.alert = scene.add.image(0, 0, atlas, NOTIF_ICON);
    Display.Align.In.TopRight( this.alert, this.button );

    this.menu = scene.add.container(
      scene.cameras.main.width / 2,
      scene.cameras.main.height / 2);
    
    const menuBG = scene.add.image(0, 0, atlas, MENU_BG).setScale(4.0, 3.0);
    const closeButton = 
      scene.add.image(menuBG.displayWidth / 2, -menuBG.displayHeight / 2,
        atlas, "red_boxCross");
    closeButton.setInteractive({useHandCursor: true});
    closeButton.on('pointerdown', () => { this.menu.setVisible(false); })

    this.menu.add(menuBG);
    //create a bunch of buttons!
    this.buttons = [];
    this.model.jobs.forEach((model, i) => {
      const appButton = new AppButton({ 
        scene, 
        x: 0, 
        y: i * 30 - (menuBG.displayHeight / 4),
        atlas,
        model,
        emitter: this.emitter
       })
       this.menu.add( appButton );
       this.buttons.push(appButton);
    });

    this.menu.add(closeButton);

    this.menu.setVisible(false);
  }

  //on the button click, show the menu
  onButtonClick() {
    this.menu.setVisible( !this.menu.visible );
  }

  update() { 
    this.alert.setVisible( this.model.areAnyAppsAvailable() );
    
    this.buttons.forEach( button => button.update( this.model.score ));
  }
}