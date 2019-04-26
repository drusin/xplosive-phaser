export default class System {
	constructor(...componentNames) {
		this._componentNames = componentNames;
	}
	
	get componentNames() {
		return this._componentNames;
	}
	
	process(entity) {
		console.error(`${this.constructor.name} does not overwrite the "process" method!`);
	}
}