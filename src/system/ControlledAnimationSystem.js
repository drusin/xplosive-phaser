import SpriteComponent from "./SpriteComponent";
import AnimationComponent from "./AnimationComponent";
import System from '../yanecs/System';
import ControlComponent from './ControlComponent';

export default class ControlledAnimationSystem extends System {
    constructor () {
        super (SpriteComponent.name, AnimationComponent.name, ControlComponent.name);
    }

    process(entity) {
        const controls = entity.getComponent(ControlComponent.name);
        const { anims } = entity.getComponent(SpriteComponent.name).sprite;
        const animNames = entity.getComponent(AnimationComponent.name);

        if (controls.left && !controls.up && !controls.down) {
            anims.play(animNames.left, true);
        }
        else if (controls.left && controls.up) {
            anims.play(animNames.upLeft, true);
        }
        else if (controls.up && !controls.left && !controls.right) {
            anims.play(animNames.up, true);
        }
        else if (controls.up && controls.right) {
            anims.play(animNames.upRight, true);
        }
        else if (controls.right && !controls.up && !controls.down) {
            anims.play(animNames.right, true);
        }
        else if (controls.right && controls.down) {
            anims.play(animNames.downRight, true);
        }
        else if (controls.down && !controls.left && !controls.right) {
            anims.play(animNames.down, true);
        }
        else if (controls.left && controls.down) {
            anims.play(animNames.downLeft, true);
        }
        else {
            anims.play(animNames.idle, true);
        }
    }
}