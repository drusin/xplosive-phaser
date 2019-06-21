import System from "../../yanecs/System";
import TimerComponent from "./TimerComponent";
import RemoveAfterTimeOutComponent from "./RemoveAfterTimeOutComponent";

export default class RemoveAfterTimeOutSystem extends System {
    constructor() {
        super(TimerComponent.name, RemoveAfterTimeOutComponent.name);
    }

    process(entity) {
        if (entity.getComponent(TimerComponent.name).time < 0) {
            entity.markForRemoval();
        }
    }
}