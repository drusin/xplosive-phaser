import System from "../../../../yanecs/System";
import WallComponent from "../../../common/system/bombs/WallComponent";
import DestroyableComponent from "../../../common/system/bombs/DestroyableComponent";
import SpriteComponent from "../../../common/system/SpriteComponent";
import TimerComponent from "../../../common/system/TimerComponent";
import RemoveAfterTimeOutComponent from "../../../common/system/RemoveAfterTimeOutComponent";

export default class WallDestroySystem extends System {
    constructor() {
        super(WallComponent.name, DestroyableComponent.name, SpriteComponent.name);
    }

    process(entity) {
        if (!entity.getComponent(DestroyableComponent.name).destroyed) {
            return;
        }
        
        const timerComponent = entity.getComponent(TimerComponent.name);
        if (!timerComponent) {
            entity.addComponent(new TimerComponent(2000));
            entity.addComponent(new RemoveAfterTimeOutComponent());
        }
    }
}