import System from "../yanecs/System";
import WallComponent from "./WallComponent";
import DestroyableComponent from "./DestroyableComponent";
import SpriteComponent from "./SpriteComponent";
import globalState from '../globalState';
import engine from "../yanecs/engine";
import TimerComponent from "./TimerComponent";

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
            return;
        }

        if (timerComponent.time < 0) {
            entity.markForRemoval();
        }
    }
}