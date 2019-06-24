import './menu/simple-menu';

import GAME from './phaser';
import constants from './phaser/constants';

const elements = [
	{ text: 'Local Game', callback: () => GAME.scene.start(constants.SCENES.GAME) },
	{ text: 'Network Game', callback: () => alert('Network!'), disabled: true},
	{ text: 'Options', callback: () => alert('Options!')}
	];

const menu = document.createElement('simple-menu');
document.getElementById('menu').appendChild(menu);
menu.elements = elements;

console.log(window.matchMedia('only screen'));