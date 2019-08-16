export default class System {
	constructor(...componentNames) {
		this._componentNames = componentNames;
	}
	
	get componentNames() {
		return this._componentNames;
	}
	
	processAll(entities, delta) {
		entities.forEach(entity => this.process(entity, delta));
	}
	
	process(entity, delta) {
		console.error(`${this.constructor.name} does not overwrite the "processAll" or the "process" method!`);
	}
}