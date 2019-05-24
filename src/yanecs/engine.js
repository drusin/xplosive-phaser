import Entity from "./Entity";

const entities = new Set();

function addEntities(...newEntities) {
	newEntities.forEach(entity => entities.add(entity));
};

function getEntities(...componentNames) {
	return Array.from(entities.values())
		.filter(entity => componentNames.every(component => entity.componentNames.includes(component)));
}

function getSerializedEntities() {
	return Array.from(entities.values());
};

function loadSerializedEntities(json) {
	const obj = JSON.parse(json);
	entities.clear();
	Object.values(obj).forEach(entity => entities.add(Entity.fromJson(entity)));
};

const systems = new Set();

function addSystems(...newSystems) {
	newSystems.forEach(system => systems.add(system));
};

function process(time, delta) {
	Array.from(entities.values()).filter(entity => entity._toRemove).forEach(entity => {
		entity.components.forEach(component => component.cleanUp());
		entities.delete(entity)
	});
	for (const system of systems.values()) {
		const componentNames = system.componentNames;
		const neededEntities = getEntities(...componentNames)
		neededEntities.forEach(entity => system.process(entity, delta, time));
	}
};

export default {
	addEntities,
	getEntities,
	addSystems,
	process,
	getSerializedEntities,
	loadSerializedEntities
}