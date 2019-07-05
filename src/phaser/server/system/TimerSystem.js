import System from "../../../yanecs/System";
import TimerComponent from "./TimerComponent";

export default class TimerSystem extends System {
    constructor() {
        super(TimerComponent.name);
    }

    process(entity, delta) {
        entity.getComponent(TimerComponent.name).time -= delta;
    }
}