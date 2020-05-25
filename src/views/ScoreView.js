import 'phaser';

const LABEL_TEXT = "SCORE: ";

class ScoreView {
  constructor({ scene, x, y, score }) {
    // this.label = scene.add.text( x, y, LABEL_TEXT + score);
    this.label = document.createElement('div');
    this.label.innerText = LABEL_TEXT + score;
    scene.add.dom(x, y, this.label);
  }
}

export default ScoreView;