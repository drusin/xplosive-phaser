import Entity from "./yanecs/Entity";
import SpriteComponent from "./system/graphics/SpriteComponent";
import RemoveAfterTimeOutComponent from "./system/RemoveAfterTimeOutComponent";
import TimerComponent from "./system/TimerComponent";

function quantizeCoordinate(coord, offset = 0) {
    return Math.round(coord / 8) * 8 + offset;
}

function quantizeCoordinates(x, y, offset = 0) {
    return {
        x: quantizeCoordinate(x, offset),
        y: quantizeCoordinate(y, offset)
    };
}

function createFireEntity(sprite, fireComponent) {
    return new Entity()
    .addComponent(new SpriteComponent(sprite))
    .addComponent(fireComponent)
    .addComponent(new RemoveAfterTimeOutComponent())
    .addComponent(new TimerComponent(2000));
}

export default {
    quantizeCoordinate,
    quantizeCoordinates,
    createFireEntity
}