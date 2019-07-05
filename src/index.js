import './menu/simple-menu';

import GAME from './phaser/server';
import constants from './phaser/client/constants';

const menu = document.createElement('simple-menu');
const menuContainer = document.getElementById('menu');
menuContainer.appendChild(menu);

const elements = [
	{ text: 'Local Game', callback: () => {
		menu.hide();
		GAME.scene.start(constants.SCENES.GAME);
	} },
	{ text: 'Network Game', callback: () => alert('Network!'), disabled: true},
	{ text: 'Settings', callback: () => alert('Settings!')}
];

menu.elements = elements;

GAME.scale.on('resize', (gameSize, baseSize, displaySize) => resizeMenu(displaySize.width, displaySize.height));

function resizeMenu(width, height) {
	menuContainer.style.width = width + 'px';
	menuContainer.style.height = height + 'px';
}

if (!window.localStorage.playerOneKeys) {
	window.localStorage.playerOneKeys = JSON.stringify({
		up: 'W',
		down: 'S',
		left: 'A',
		right: 'D',
		action: 'SPACE'
	});
}

if (!window.localStorage.playerTwoKeys) {
	window.localStorage.playerTwoKeys = JSON.stringify({
		up: 'UP',
		down: 'DOWN',
		left: 'LEFT',
		right: 'RIGHT',
		action: 'ALT'
	});
}