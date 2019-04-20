import System from "../yanecs/System";
import TimerComponent from "./timerComponent";
import BodyComponent from "./BodyComponent";
import globalState from '../globalState';
import SpriteComponent from "./SpriteComponent";

export default class ExplosionSystem extends System {
    constructor() {
        super(TimerComponent.name, BodyComponent.name, SpriteComponent.name);
    }

    process(entity) {
        if (entity.getComponent(TimerComponent.name).time < 0) {
            entity.getComponent(SpriteComponent.name).sprite.destroy();
            entity.markForRemoval();
        }
    }
}