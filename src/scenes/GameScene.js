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

    window.addEventListener('resize', () => this.resize() );
    this.resize();
  }
  
  resize() {
    console.log("Resizing app in " + this.key)

    // const dpr = window.devicePixelRatio;
    // const widthDPR = Math.round(window.innerWidth * dpr);
    // const heightDPR = Math.round(window.innerHeight * dpr);

    // this.scale.parent.width = Math.round(window.innerWidth);
    // this.scale.parent.height = Math.round(window.innerHeight);

    // this.scale.canvas.width = widthDPR;
    // this.scale.canvas.height = heightDPR;

    // this.scale.canvas.style.width = Math.round(window.innerWidth) + 'px';
    // this.scale.canvas.style.height = Math.round(window.innerHeight) + 'px';

    // this.scale.setGameSize(widthDPR, heightDPR);
    // this.scale.setParentSize(window.innerWidth, window.innerHeight);

    
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