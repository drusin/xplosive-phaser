import './menu/simple-menu';

const elements = [
	{ text: 'Local Game', callback: () => alert('Local!')},
	{ text: 'Network Game', callback: () => alert('Network!'), disabled: true},
	{ text: 'Options', callback: () => alert('Options!')}
	];

const menu = document.createElement('simple-menu');
document.getElementById('menu').appendChild(menu);
menu.elements = elements;

console.log(window.matchMedia('only screen'));