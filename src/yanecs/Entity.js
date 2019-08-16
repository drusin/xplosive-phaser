export default class Entity {
	constructor() {
		this._components = new Map();
		this._toRemove = false;
	}

	get components() {
		return Array.from(this._components.values());
	}

	getComponent(name) {
		return this._components.get(name);
	}

	get componentNames() {
		return Array.from(this._components.keys());
	}

	addComponent(component) {
		this._components.set(component.name, component);
		return this;
	}

	removeComponent(componentName) {
		this._components.get(componentName).cleanUp();
		this._components.delete(componentName);
		return this;
	}

	markForRemoval() {
		this._toRemove = true;
	}
}