import 'phaser';

const LABEL_TEXT = "SCORE: ";

class ScoreView {
  constructor({ scene, x, y, score }) {
    this.label = scene.add.text( x, y, LABEL_TEXT + score);
  }

  update( score ) {
    this.label.text = LABEL_TEXT + score;
  }
}

export default ScoreView;