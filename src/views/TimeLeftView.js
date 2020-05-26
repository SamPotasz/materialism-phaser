import 'phaser';

export default class TimeLeftView {
  constructor({ scene, x, y, duration }) {
    this.text = scene.add.text( 
      x, y, msToTimeString( duration ));
  }

  setVisible( value ) {
    this.text.setVisible( value );
  }
}

const msToTimeString = ms => {
  const seconds = ms / 1000;
  const hours = Math.floor( seconds / 3600 );
  const minutes = Math.floor(
     hours > 0 ? (seconds % hours) / 60 : seconds / 60);
  console.log(`${hours}:${minutes}:${seconds}`)

  const hourString = hours > 0 ? `${hours}:` : '';
  const minuteString = minutes > 0 || hours > 0 ? `${minutes}:` : '';

  return hourString + minuteString + seconds;
}