import { GameObjects } from 'phaser';

class ToggleableButton extends GameObjects.Image {
  constructor({
    scene, x, y, atlas, onFrame, offFrame, emitter, eventName,
  }) {
    super( scene, x, y, atlas, onFrame );

    this.onFrame = onFrame;
    this.offFrame = offFrame;
    this.isActive = true;

    this.setInteractive({useHandCursor: true});
    this.on('pointerdown', () => {
      emitter.emit(eventName);
    });

    scene.add.existing(this);
  }

  setActive( value ) {
    //don't do anything if we're not changing anything
    if( value === this.isActive ) {
      return;
    }

    if( value ) {
      this.setFrame(this.onFrame)
      this.setInteractive({useHandCursor: true});
    }
    else {
      this.setFrame(this.offFrame);
      this.disableInteractive();
    }
    this.isActive = value;
  }
}

export default ToggleableButton;