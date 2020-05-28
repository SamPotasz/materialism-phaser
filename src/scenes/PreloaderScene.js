import 'phaser';
import {CONFIG} from '../constants';

export default class PreloaderScene extends Phaser.Scene 
{
	constructor () 
	{
		super('Preloader');
	}
	
	preload () 
	{
		// display progress bar
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(240, 270, 320, 50);
		
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);
		
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);
		
		var assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		assetText.setOrigin(0.5, 0.5);
		
		// update progress bar
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(250, 280, 300 * value, 30);
		});
		
		// update file progress text
		this.load.on('fileprogress', function (file) {
			assetText.setText('Loading asset: ' + file.key);
		});
		
		// remove progress bar when complete
		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
			this.ready();
		}.bind(this));
		
		this.timedEvent = this.time.delayedCall(1000, this.ready, [], this);
		
		//load atlases
		this.load.atlas(CONFIG.ATLAS_NAME, 'assets/TextureAtlas.png', 'assets/TextureAtlas.json')
		// this.load.multiatlas('spriteAtlas', 'assets/atlases/EggHuntAtlas.json', 'assets/atlases');
		
		// this.load.image('livingroom_base', 'assets/pngs/livingroom_base.png');
		// this.load.image("logo", logoImg);
		
		// this.load.bitmapFont('comicSans', 'assets/fonts/comic_sans_ms_regular_8.PNG', 'assets/fonts/comic_sans_ms_regular_8.xml');
		
		//load webfont scripts (https://labs.phaser.io/edit.html?src=src/game%20objects/text/static/google%20webfont.js)
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		
		
    /******************************************************************
    *
    *      LOAD MUSIC FUNCTIONS
    *
    ***************************************************************/
    this.load.audio(CONFIG.OPEN_SFX, [
        `assets/sfx/${CONFIG.OPEN_SFX}.ogg`,
        `assets/sfx/${CONFIG.OPEN_SFX}.mp3`
    ]);
    this.load.audio(CONFIG.CLOSED_SFX, [
      `assets/sfx/${CONFIG.CLOSED_SFX}.ogg`,
      `assets/sfx/${CONFIG.CLOSED_SFX}.mp3`
    ]);
    this.load.audio(CONFIG.UNLOCK_SFX, [
      `assets/sfx/${CONFIG.UNLOCK_SFX}.ogg`,
      `assets/sfx/${CONFIG.UNLOCK_SFX}.mp3`
    ]);
    this.load.audio(CONFIG.APP_BUY_SFX, [
      `assets/sfx/${CONFIG.APP_BUY_SFX}.ogg`,
      `assets/sfx/${CONFIG.APP_BUY_SFX}.mp3`
    ]);
  }
		
  init()
  {
    this.readyCount = 0;
  }
		
  ready()
  {
    this.readyCount++;
    if( this.readyCount === 1 )
    {
      var toStart = this.scene;
      WebFont.load({
        google: {
          families: [ 'Boogaloo', 'Muli' ]
        },
        active: function()
        {
          toStart.start('Game');
        }
      })
    }
  }
		
  create () 
  {
  }
};