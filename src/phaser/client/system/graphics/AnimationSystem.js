import SpriteComponent from "../../../common/system/SpriteComponent";
import AnimationComponent from "./AnimationComponent";
import System from '../../../../yanecs/System';
import StateComponent from '../../../common/system/movement/StateComponent';

export default class AnimationSystem extends System {
    constructor () {
        super (SpriteComponent.name, AnimationComponent.name, StateComponent.name);
    }

    process(entity) {
        const state = entity.getComponent(StateComponent.name);
        const { anims } = entity.getComponent(SpriteComponent.name).sprite;
        const animNames = entity.getComponent(AnimationComponent.name);
        
        if (state.dead) {
            anims.play(animNames.dead, true);
            entity.removeComponent(AnimationComponent.name);
            return;
        }

        if (state.left && !state.up && !state.down) {
            anims.play(animNames.left, true);
        }
        else if (state.left && state.up) {
            anims.play(animNames.upLeft, true);
        }
        else if (state.up && !state.left && !state.right) {
            anims.play(animNames.up, true);
        }
        else if (state.up && state.right) {
            anims.play(animNames.upRight, true);
        }
        else if (state.right && !state.up && !state.down) {
            anims.play(animNames.right, true);
        }
        else if (state.right && state.down) {
            anims.play(animNames.downRight, true);
        }
        else if (state.down && !state.left && !state.right) {
            anims.play(animNames.down, true);
        }
        else if (state.left && state.down) {
            anims.play(animNames.downLeft, true);
        }
        else {
            anims.play(animNames.idle, true);
        }
    }
}