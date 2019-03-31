import System from "../yanecs/System";
import SpriteComponent from "./SpriteComponent";
import ControlComponent from "./ControlComponent";

export default class MovementSystem extends System {
    constructor() {
        super(SpriteComponent.name, ControlComponent.name)
    }

    process(entity) {
        const { sprite } = entity.getComponent(SpriteComponent.name);
        const { left, right, up, down } = entity.getComponent(ControlComponent.name);

        if (!(left || right)) {
            sprite.setVelocityX(0);
        }
        else {
            sprite.setVelocityX(left ? -16 : 16);
        }

        if (!(up || down)) {
            sprite.setVelocityY(0);
        }
        else {
            sprite.setVelocityY(up ? -16 : 16);
        }
    }
}