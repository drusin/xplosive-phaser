import System from "../yanecs/System";
import ControlComponent from "./ControlComponent";
import engine from "../yanecs/engine";

export default class ControlSystem extends System {
    constructor (keys) {
        super (ControlComponent.name);
        this._keys = keys;
    }

    process(entity) {
        const control = entity.getComponent(ControlComponent.name);
        control.left = this._keys.left.isDown;
        control.right = this._keys.right.isDown;
        control.up = this._keys.up.isDown;
        control.down = this._keys.down.isDown;
        
        if (control.up) {
            console.log(engine.getSerializedEntities()[0]);
            console.log(JSON.stringify(engine.getSerializedEntities()[0]));
        }
    }
}