import 'phaser';

/**
 * The class which actually displays the things to start!
 */
export default class JobView {
  constructor({ scene, x, y, 
    data:{title, isUnlocked, unlockCost, upgradeCost, 
      benefit, ticksLeft} }) {
    
    console.log(scene)
    // console.log({data});
    console.log(`adding ${title} @ ${x}, ${y}`);
    this.titleText = scene.add.text(x, y, title);
  }

  // create
}