import System from "../yanecs/System";
import ControlComponent from "./ControlComponent";
import SpriteComponent from "./SpriteComponent";
import AnimationComponent from "./AnimationComponent";
import DestroyableComponent from "./DestroyableComponent";
import RemoveAfterTimeOutComponent from "./RemoveAfterTimeOutComponent";
import TimerComponent from "./TimerComponent";

export default class KillPlayerSystem extends System {
    constructor () {
        super (ControlComponent.name, SpriteComponent.name, AnimationComponent.name, DestroyableComponent.name);
    }

    process(entity) {
        const { destroyed } = entity.getComponent(DestroyableComponent.name);
        if (!destroyed) {
            return;
        }

        const { sprite } = entity.getComponent(SpriteComponent.name);
        sprite.body.setVelocity(0, 0);
        sprite.anims.play(entity.getComponent(AnimationComponent.name).dead);
        entity.removeComponent(ControlComponent.name)
            .addComponent(new TimerComponent(3000))
            .addComponent(new RemoveAfterTimeOutComponent());
    }
}