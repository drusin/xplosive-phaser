import globalState from "./globalState";

function quantizeCoordinate(coord, offset = 0) {
	return Math.round(coord / 8) * 8 + offset;
}

function quantizeCoordinates(x, y, offset = 0) {
	return {
		x: quantizeCoordinate(x, offset),
		y: quantizeCoordinate(y, offset)
	};
}

function getAnimsFor(playerColor) {
	return {
		left: globalState.anims[`${playerColor}.left`],
		upLeft: globalState.anims[`${playerColor}.up`],
		up: globalState.anims[`${playerColor}.up`],
		upRight: globalState.anims[`${playerColor}.up`],
		right: globalState.anims[`${playerColor}.right`],
		downRight: globalState.anims[`${playerColor}.down`],
		down: globalState.anims[`${playerColor}.down`],
		downLeft: globalState.anims[`${playerColor}.down`],
		idle: globalState.anims[`${playerColor}.idle`],
		dead: globalState.anims[`${playerColor}.dead`]
	};
}

export default {
	quantizeCoordinate,
	quantizeCoordinates,
	getAnimsFor
}