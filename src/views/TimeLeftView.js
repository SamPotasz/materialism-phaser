import 'phaser';

export default class TimeLeftView {
  constructor({ scene, x, y, model }) {

    this.model = model;

    this.text = scene.add.text( 
      x, y, msToTimeString( this.model.duration ),
      {fontFamily: 'Muli'});
  }

  setVisible( value ) {
    this.text.setVisible( value );
  }

  update() {
    if( !this.model.isActive ) {
      this.text.text = msToTimeString( this.model.duration );
    }
    else {
      const msLeft = this.model.finishesAt - this.model.lastUpdate;
      this.text.text = msToTimeString( msLeft );
    }
  }
}

const msToTimeString = ms => {
  const seconds = Math.floor( ms / 1000 );
  const hours = Math.floor( seconds / 3600 );
  const minutes = Math.floor(
     hours > 0 ? (seconds % hours) / 60 : seconds / 60);

  const hourString = hours > 0 ? `${hours}:` : '';
  const minuteString = minutes > 0 || hours > 0 ? `${minutes}:` : '';

  return hourString + minuteString + seconds;
}