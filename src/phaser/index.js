import Phaser from 'phaser';
import MenuScene from './MenuScene';
import GameScene from './GameScene';

const config = {
	type: Phaser.AUTO,
	pixelArt: true,
	scale: {
		parent: 'phaser',
		mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
		width: 64,
		height: 64,
		max: {
			width: 640,
			height: 640
		}
	},
	backgroundColor: '#cccccc',
	scene: [MenuScene, GameScene],
	physics: {
		default: 'arcade',
		arcade: { debug: false }
	}
};

const GAME = new Phaser.Game(config);

export default GAME;