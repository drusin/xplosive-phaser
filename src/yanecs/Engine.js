const entities = new Set();

const addEntities = (...newEntities) => {
	newEntities.forEach(entity => entities.add(entity));
};

const systems = new Set();

const addSystem = (system) => {
	systems.add(system);
};

const process = () => {
	for (const system of systems.values()) {
		const componentNames = system.componentNames;
		const neededEntities = Array.from(entities.values()).filter(entity => entity.componentNames.includes(...componentNames));
		neededEntities.forEach(entity => system.process(entity));
	}
};

export default {
	addEntities,
	addSystem,
	process
}