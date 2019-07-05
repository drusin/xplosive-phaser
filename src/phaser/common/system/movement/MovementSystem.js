import System from '../../../../yanecs/System';
import ControlComponent from './ControlComponent';
import constants from '../../constants';
import SpriteComponent from "../SpriteComponent";
import StateComponent from "./StateComponent";

const { SPEED } = constants;

export default class MovementSystem extends System {
    constructor() {
        super(SpriteComponent.name, ControlComponent.name, StateComponent.name)
    }

    process(entity) {
        const { body } = entity.getComponent(SpriteComponent.name).sprite;
        const { left, right, up, down } = entity.getComponent(ControlComponent.name);

        if (!(left.isDown || right.isDown)) {
            body.setVelocityX(0);
        }
        else {
            body.setVelocityX(left.isDown ? -SPEED : SPEED);
        }

        if (!(up.isDown || down.isDown)) {
            body.setVelocityY(0);
        }
        else {
            body.setVelocityY(up.isDown ? -SPEED : SPEED);
        }
        
        const state = entity.getComponent(StateComponent.name);
        state.up = up.isDown;
        state.down = down.isDown;
        state.left = left.isDown;
        state.right = right.isDown;
    }
}