const template = document.createElement('template');
template.innerHTML = `
<style>
	@import '../global-style.css';
</style>
<style>
	nav {
		list-style-type: none;
		padding: 0;
		margin: auto;
		margin-top: 40%;
		width: 300px;
	}

	button {
		width: 100%;
		background-color: Transparent;
		margin: 10px;
		padding: 10px;
		border-style: dashed;
	}

	button:enabled {
		color: white;
	}

	button:focus {
		border-style: solid;
		outline: 0;
	}
</style>

<nav></nav>
`;

class SimpleMenu extends HTMLElement {
	constructor () {
		super();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
		this._shadowRoot.appendChild(template.content.cloneNode(true));
		this._rootElement = this._shadowRoot.querySelector('nav');
		this._elements = [];
	}
	
	_rerenderElements() {
		this._rootElement.innerHTML = '';
		this._elements.forEach(element => {
			const li = document.createElement('li');
			const button = document.createElement('button');
			button.innerText = element.text;
			button.addEventListener('click', element.callback);
			if (element.disabled) {
				button.setAttribute('disabled','disabled');
			}
			this._rootElement.appendChild(li);
			li.appendChild(button);
			element.html = button;
		});
		if (this._elements.length) {
			this._elements[0].html.focus();
		}
	}
	
	set elements(elements) {
		this._elements = elements;
		this._rerenderElements();
	}

	show() {
		this._rootElement.style.display = '';
	}

	hide() {
		this._rootElement.style.display = 'none';
	}
}

window.customElements.define('simple-menu', SimpleMenu);