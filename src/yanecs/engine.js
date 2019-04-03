import Entity from "./Entity";

const entities = new Set();

const addEntities = (...newEntities) => {
	newEntities.forEach(entity => entities.add(entity));
};

const getSerializedEntities = () => {
	return Array.from(entities.values());
};

const loadSerializedEntities = (json) => {
	const obj = JSON.parse(json);
	entities.clear();
	Object.values(obj).forEach(entity => entities.add(Entity.fromJson(entity)));
};

const systems = new Set();

const addSystems = (...newSystems) => {
	newSystems.forEach(system => systems.add(system));
};

const process = () => {
	for (const system of systems.values()) {
		const componentNames = system.componentNames;
		const neededEntities = Array.from(entities.values()).filter(entity => componentNames.every(component => entity.componentNames.includes(component)));
		neededEntities.forEach(entity => system.process(entity));
	}
};

export default {
	addEntities,
	addSystems,
	process,
	getSerializedEntities,
	loadSerializedEntities
}