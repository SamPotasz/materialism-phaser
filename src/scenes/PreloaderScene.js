import 'phaser';
import CONFIG from '../gameConfig';

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
		// this.load.audio('LabMusic', [
		//     'assets/audio/MUS_ShopMusic_Lp.ogg',
		//     'assets/audio/MUS_ShopMusic_Lp.mp3'
		// ]);
		
		// this.load.audio('GameMusic', [
		//     'assets/audio/Chemix_GameMusic_Lp_3_UpdatedMix.ogg',
		//     'assets/audio/Chemix_GameMusic_Lp_3_UpdatedMix.mp3'
		// ]);
		
		// Sound effects in a audioSprite.
		// this.load.audioSprite('sfx', 
		// 'assets/sfx/output.json', [
		// 	'assets/sfx/output.ogg',
		// 	'assets/sfx/output.mp3'
		// ]);
		
		// this.load.audio(config.SFX.CATCH.key, 
		// 	['assets/sfx/' + config.SFX.CATCH.mp3, 'assets/sfx/' + config.SFX.CATCH.ogg]);
			
		}
		
		init()
		{
			this.readyCount = 0;
		}
		
		ready()
		{
			this.readyCount++;
			console.log("readyCount = " + this.readyCount);
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