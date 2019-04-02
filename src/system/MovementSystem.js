import System from "../yanecs/System";
import ControlComponent from "./ControlComponent";
import BodyComponent from "./BodyComponent";

export default class MovementSystem extends System {
    constructor() {
        super(BodyComponent.name, ControlComponent.name)
    }

    process(entity) {
        const { body } = entity.getComponent(BodyComponent.name);
        const { left, right, up, down } = entity.getComponent(ControlComponent.name);

        if (!(left || right)) {
            body.setVelocityX(0);
        }
        else {
            body.setVelocityX(left ? -16 : 16);
        }

        if (!(up || down)) {
            body.setVelocityY(0);
        }
        else {
            body.setVelocityY(up ? -16 : 16);
        }
    }
}