export default class Component {
	constructor() {
		this.__name = this.constructor.name;
	}
	
	get name() {
		return this.__name;
	}

	cleanUp() {
		//overwrite this for cleanup at removal if needed
	}
}
