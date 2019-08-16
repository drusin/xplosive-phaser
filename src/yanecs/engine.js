const entities = new Set();

function addEntities(...newEntities) {
	newEntities.forEach(entity => entities.add(entity));
}

function getEntities(...componentNames) {
	return Array.from(entities.values())
		.filter(entity => componentNames.every(component => entity.componentNames.includes(component)));
}

const systems = new Set();

function addSystems(...newSystems) {
	newSystems.forEach(system => systems.add(system));
}

function process(delta) {
	Array.from(entities.values())
		.filter(entity => entity._toRemove)
		.forEach(entity => {
			entity.components.forEach(component => component.cleanUp());
			entities.delete(entity)
		});
	
	for (const system of systems.values()) {
		const componentNames = system.componentNames;
		const neededEntities = getEntities(...componentNames);
		system.processAll(neededEntities, delta);
	}
}

export default {
	addEntities,
	getEntities,
	addSystems,
	process
}