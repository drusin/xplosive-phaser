export default class System {
	constructor(...componentNames) {
		this._componentNames = componentNames;
	}
	
	get componentNames() {
		return this._componentNames;
	}
	
	process(entities) {
		console.error(`${this.constructor.name} does not overwrite the "process" method!`);
	}
}