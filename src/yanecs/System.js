export default class System {
	constructor(...componentNames) {
		this._componentNames = componentNames;
	}
	
	get componentNames() {
		return this._componentNames;
	}
	
	process(entities) {}
}