function quantizeCoordinate(coord) {
    return Math.round(coord / 8) * 8;
}

function quantizeCoordinates(x, y) {
    return {
        x: quantizeCoordinate(x),
        y: quantizeCoordinate(y)
    };
}

export default {
    quantizeCoordinate,
    quantizeCoordinates
}