const template = document.createElement('template');
template.innerHTML = `
	<ul></ul>
`;

class SimpleMenu extends HTMLElement {
	constructor () {
		super();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
		this._shadowRoot.appendChild(template.content.cloneNode(true));
		this._rootElement = this._shadowRoot.querySelector('ul');
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
		});
	}
	
	set elements(elements) {
		this._elements = elements;
		this._rerenderElements();
	}
}

window.customElements.define('simple-menu', SimpleMenu);