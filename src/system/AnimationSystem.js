import SpriteComponent from "./SpriteComponent";
import AnimationComponent from "./AnimationComponent";
import System from '../yanecs/System';

export default class AnimationSystem extends System {
    constructor () {
        super (SpriteComponent.name, AnimationComponent.name);
    }

    process(entity) {
        const velocity = entity.getComponent(SpriteComponent.name).sprite.body.velocity;
        console.log(velocity);
        const { anims } = entity.getComponent(SpriteComponent.name).sprite;
        const animNames = entity.getComponent(AnimationComponent.name);

        if (velocity.x < 0 && velocity.y === 0) {
            anims.play(animNames.left, true);
        }
        else if (velocity.x < 0 && velocity.y < 0) {
            anims.play(animNames.upLeft, true);
        }
        else if (velocity.x === 0 && velocity.y < 0) {
            anims.play(animNames.up, true);
        }
        else if (velocity.x > 0 && velocity.y < 0) {
            anims.play(animNames.upRight, true);
        }
        else if (velocity.x > 0 && velocity.y === 0) {
            anims.play(animNames.right, true);
        }
        else if (velocity.x > 0 && velocity.y > 0) {
            anims.play(animNames.downRight, true);
        }
        else if (velocity.x === 0 && velocity.y > 0) {
            anims.play(animNames.down, true);
        }
        else if (velocity.x < 0 && velocity.y > 0) {
            anims.play(animNames.downLeft, true);
        }
        else {
            anims.play(animNames.idle, true);
        }
    }
}