import Phaser from 'phaser';
import engine from '../yanecs/engine';
import preload from './preload';
import create from './create';

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
	scene: { 
		preload,
		create,
		update
	},
	physics: {
		default: 'arcade',
		arcade: { debug: false }
	}
};

function update(time, delta) {
	engine.process(time, delta);
}

export function start () {
	new Phaser.Game(config);
}
