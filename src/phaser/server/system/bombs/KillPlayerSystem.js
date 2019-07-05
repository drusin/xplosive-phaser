import System from "../../../../yanecs/System";
import ControlComponent from "../../../common/system/movement/ControlComponent";
import SpriteComponent from "../../../common/system/SpriteComponent";
import DestroyableComponent from "../../../common/system/bombs/DestroyableComponent";
import RemoveAfterTimeOutComponent from "../../../common/system/RemoveAfterTimeOutComponent";
import TimerComponent from "../../../common/system/TimerComponent";
import StateComponent from "../../../common/system/movement/StateComponent";

export default class KillPlayerSystem extends System {
    constructor () {
        super (ControlComponent.name, SpriteComponent.name, DestroyableComponent.name, StateComponent.name);
    }

    process(entity) {
        const { destroyed } = entity.getComponent(DestroyableComponent.name);
        if (!destroyed) {
            return;
        }

        const { sprite } = entity.getComponent(SpriteComponent.name);
        sprite.body.setVelocity(0, 0);
        entity.getComponent(StateComponent.name).dead = true;
        entity.removeComponent(ControlComponent.name)
            .addComponent(new TimerComponent(3000))
            .addComponent(new RemoveAfterTimeOutComponent());
    }
}