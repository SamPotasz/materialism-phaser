import 'phaser';
import GameState from '../models/store.js';

import ScoreView from '../views/ScoreView';
import AllJobsController from '../controllers/AllJobsController.js';

export default class GameScene extends Phaser.Scene 
{
	constructor() 
	{
		super('Game');
	}

	init()
	{
    this.gameState = new GameState();
    console.log("JOBS:");
    console.log(this.gameState.jobs);
	}

	create() 
	{
    console.log("create game")

    //don't need a controller really. this scene acts as the controller
    this.scoreDisplay = new ScoreView({
      scene: this,
      x: 65, y: 15,
      score: this.gameState.score,
    })

    this.jobsController = new AllJobsController({
      scene: this,
      x: 50, y: 100,
      model: this.gameState
    })

    //add timer
    // this.time.addEvent({
    //   delay: 1000,
    //   loop: true,
    //   callback: () => { this.gameState.onTimePassed() }
    // })

    window.addEventListener('resize', () => this.resize() );
    this.resize();
  }

  update() {
    this.gameState.onTimePassed();
    this.jobsController.update();
    this.scoreDisplay.update( this.gameState.score )
  }
  
  resize() {
    console.log("Resizing app in " + this.key)
    
    // Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
    let game_ratio = 800 / 600;
  
    // Make div full height of browser and keep the ratio of game resolution
    let div = document.getElementById('phaser-example');
    div.style.width = (window.innerHeight * game_ratio) + 'px';
    div.style.height = window.innerHeight + 'px';
  
    // Check if device DPI messes up the width-height-ratio
    let canvas	= document.getElementsByTagName('canvas')[0];
  
    let dpi_w	= parseInt(div.style.width) / canvas.width;
    let dpi_h	= parseInt(div.style.height) / canvas.height;		
  
    let height	= window.innerHeight * (dpi_w / dpi_h);
    let width	= height * game_ratio;
  
    // Scale canvas	
    canvas.style.width	= width + 'px';
    canvas.style.height	= height + 'px';
    
    let newWidth = (window.innerHeight * game_ratio) + 'px';
			
    // let overlay = document.getElementById('overlay')
    // overlay.style.width = newWidth
    // overlay.style.height = window.innerHeight + 'px';
    // overlay.style.transform = "translate(-50%, -50%)";
        
  }
}