import System from "../../../../yanecs/System";
import ControlComponent from "../movement/ControlComponent";
import SpriteComponent from "../graphics/SpriteComponent";
import AnimationComponent from "../graphics/AnimationComponent";
import DestroyableComponent from "./DestroyableComponent";
import RemoveAfterTimeOutComponent from "../RemoveAfterTimeOutComponent";
import TimerComponent from "../TimerComponent";

export default class KillPlayerSystem extends System {
    constructor () {
        super (ControlComponent.name, SpriteComponent.name, DestroyableComponent.name);
    }

    process(entity) {
        const { destroyed } = entity.getComponent(DestroyableComponent.name);
        if (!destroyed) {
            return;
        }

        const { sprite } = entity.getComponent(SpriteComponent.name);
        sprite.body.setVelocity(0, 0);
        // sprite.anims.play(entity.getComponent(AnimationComponent.name).dead);
        entity.removeComponent(ControlComponent.name)
            .addComponent(new TimerComponent(3000))
            .addComponent(new RemoveAfterTimeOutComponent());
    }
}