import 'phaser';
import { loadStore } from '../models/store.js';

import ScoreView from '../views/ScoreView';
import AllJobsView from '../views/AllJobsView.js';

export default class GameScene extends Phaser.Scene 
{
	constructor() 
	{
		super('Game');
	}

	init()
	{
    this.gameState = loadStore();
    console.log("JOBS:");
    console.log(this.gameState.jobs);
	}

	create() 
	{
    console.log("create game")
    this.scoreDisplay = new ScoreView({
      scene: this,
      x: 35, y: 15,
      score: this.gameState.score,
    })

    this.jobsDisplay = new AllJobsView({
      scene: this,
      x: 50, y: 100,
      data: this.gameState.jobs
    })
	}
}