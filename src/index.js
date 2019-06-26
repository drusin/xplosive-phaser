import './menu/simple-menu';

import GAME from './phaser';
import constants from './phaser/constants';

const elements = [
	{ text: 'Local Game', callback: () => GAME.scene.start(constants.SCENES.GAME) },
	{ text: 'Network Game', callback: () => alert('Network!'), disabled: true},
	{ text: 'Options', callback: () => alert('Options!')}
	];

const menu = document.createElement('simple-menu');
const menuContainer = document.getElementById('menu');
menuContainer.appendChild(menu);
menu.elements = elements;


GAME.scale.on('resize', (gameSize, baseSize, displaySize) => resizeMenu(displaySize.width, displaySize.height));

function resizeMenu(width, height) {
	menuContainer.style.width = width + 'px';
	menuContainer.style.height = height + 'px';
}