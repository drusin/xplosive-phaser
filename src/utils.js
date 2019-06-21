function quantizeCoordinate(coord, offset = 0) {
	return Math.round(coord / 8) * 8 + offset;
}

function quantizeCoordinates(x, y, offset = 0) {
	return {
		x: quantizeCoordinate(x, offset),
		y: quantizeCoordinate(y, offset)
	};
}

export default {
	quantizeCoordinate,
	quantizeCoordinates
}