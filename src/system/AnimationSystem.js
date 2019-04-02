import SpriteComponent from "./SpriteComponent";
import AnimationComponent from "./AnimationComponent";
import System from '../yanecs/System';
import BodyComponent from "./BodyComponent";

export default class AnimationSystem extends System {
    constructor () {
        super (SpriteComponent.name, AnimationComponent.name, BodyComponent.name);
    }

    process(entity) {
        const { velocity, blocked } = entity.getComponent(BodyComponent.name).body;
        const { anims } = entity.getComponent(SpriteComponent.name).sprite;
        const animNames = entity.getComponent(AnimationComponent.name);

        if ((velocity.x < 0 || blocked.left) && velocity.y === 0) {
            anims.play(animNames.left, true);
        }
        else if ((velocity.x < 0 || blocked.left) && (velocity.y < 0 || blocked.up)) {
            anims.play(animNames.upLeft, true);
        }
        else if (velocity.x === 0 && (velocity.y < 0 || blocked.up)) {
            anims.play(animNames.up, true);
        }
        else if ((velocity.x > 0 || blocked.right) && (velocity.y < 0 || blocked.up)) {
            anims.play(animNames.upRight, true);
        }
        else if ((velocity.x > 0 || blocked.right) && velocity.y === 0) {
            anims.play(animNames.right, true);
        }
        else if ((velocity.x > 0 || blocked.right) && (velocity.y > 0 || blocked.down)) {
            anims.play(animNames.downRight, true);
        }
        else if (velocity.x === 0 && (velocity.y > 0 || blocked.down)) {
            anims.play(animNames.down, true);
        }
        else if ((velocity.x < 0 || blocked.left) && (velocity.y > 0 || blocked.down)) {
            anims.play(animNames.downLeft, true);
        }
        else {
            anims.play(animNames.idle, true);
        }
    }
}