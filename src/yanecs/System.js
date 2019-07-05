export default class System {
	constructor(...componentNames) {
		this._componentNames = componentNames;
	}
	
	get componentNames() {
		return this._componentNames;
	}
	
	processAll(entities, delta, time) {
		entities.forEach(entity => this.process(entity, delta, time));
	}
	
	process(entity, delta, time) {
		console.error(`${this.constructor.name} does not overwrite the "process" method!`);
	}
}