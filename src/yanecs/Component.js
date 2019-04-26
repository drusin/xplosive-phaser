export default class Component {
	constructor() {
		this.__name = this.constructor.name;
	}
	
	get name() {
		return this.__name;
	}

	cleanUp() {
		//overwrite this for cleanup at removal
	}
	
	static fromJson(json) {
		const component = new Component();
		Object.keys(json).forEach(key => component[key] = json[key]);
		return component;
	}
}
