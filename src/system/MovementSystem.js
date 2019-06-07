import System from '../yanecs/System';
import ControlComponent from './ControlComponent';
import constants from '../constants';
import SpriteComponent from "./SpriteComponent";

const { SPEED } = constants;

export default class MovementSystem extends System {
    constructor() {
        super(SpriteComponent.name, ControlComponent.name)
    }

    process(entity) {
        const { body } = entity.getComponent(SpriteComponent.name).sprite;
        const { left, right, up, down } = entity.getComponent(ControlComponent.name);

        if (!(left || right)) {
            body.setVelocityX(0);
        }
        else {
            body.setVelocityX(left ? -SPEED : SPEED);
        }

        if (!(up || down)) {
            body.setVelocityY(0);
        }
        else {
            body.setVelocityY(up ? -SPEED : SPEED);
        }
    }
}