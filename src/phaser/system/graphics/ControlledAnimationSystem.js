import SpriteComponent from "./SpriteComponent";
import AnimationComponent from "./AnimationComponent";
import System from '../../../yanecs/System';
import ControlComponent from '../movement/ControlComponent';

export default class ControlledAnimationSystem extends System {
    constructor () {
        super (SpriteComponent.name, AnimationComponent.name, ControlComponent.name);
    }

    process(entity) {
        const controls = entity.getComponent(ControlComponent.name);
        const { anims } = entity.getComponent(SpriteComponent.name).sprite;
        const animNames = entity.getComponent(AnimationComponent.name);

        if (controls.left.isDown && !controls.up.isDown && !controls.down.isDown) {
            anims.play(animNames.left, true);
        }
        else if (controls.left.isDown && controls.up.isDown) {
            anims.play(animNames.upLeft, true);
        }
        else if (controls.up.isDown && !controls.left.isDown && !controls.right.isDown) {
            anims.play(animNames.up, true);
        }
        else if (controls.up.isDown && controls.right.isDown) {
            anims.play(animNames.upRight, true);
        }
        else if (controls.right.isDown && !controls.up.isDown && !controls.down.isDown) {
            anims.play(animNames.right, true);
        }
        else if (controls.right.isDown && controls.down.isDown) {
            anims.play(animNames.downRight, true);
        }
        else if (controls.down.isDown && !controls.left.isDown && !controls.right.isDown) {
            anims.play(animNames.down, true);
        }
        else if (controls.left.isDown && controls.down.isDown) {
            anims.play(animNames.downLeft, true);
        }
        else {
            anims.play(animNames.idle, true);
        }
    }
}