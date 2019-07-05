import System from "../../../../yanecs/System";
import FireComponent from "./FireComponent";
import utils from "../../utils";
import engine from "../../../../yanecs/engine";
import globalState from "../../globalState";
import SpriteComponent from "../graphics/SpriteComponent";
import WallComponent from "./WallComponent";
import DestroyableComponent from "./DestroyableComponent";
import createFire from "../entity-creators/createFire";

export default class FireSystem extends System {
    constructor() {
        super(FireComponent.name, SpriteComponent.name);
        this._walls = engine.getEntities(WallComponent.name, SpriteComponent.name);
    }

    process(entity) {
        const fire = entity.getComponent(FireComponent.name);
        const { x, y } = entity.getComponent(SpriteComponent.name).sprite.body;
        const { sprite } = entity.getComponent(SpriteComponent.name);

        const destroyables = engine.getEntities(SpriteComponent.name, DestroyableComponent.name);
        destroyables.forEach(destroyableEntity => {
            const destroyableSprite = destroyableEntity.getComponent(SpriteComponent.name).sprite;
            globalState.world.overlap(destroyableSprite, sprite, () => destroyableEntity.getComponent(DestroyableComponent.name).destroyed = true);
        });

        this._walls.forEach(wallEntity => {
            const wallSprite = wallEntity.getComponent(SpriteComponent.name).sprite;
            globalState.world.overlap(wallSprite, sprite, () => Object.assign(fire, FireComponent.zeroState()));
        });

        this._spreadFire(fire, x, y);
    }

    _spreadFire(fire, x, y) {
        if (fire.up > 0) {
            const sprite = this._createFireSprite(x, y - 8, fire.up > 1 ? 'fire.vertical' : 'fire.up');
            engine.addEntities(createFire(sprite, Object.assign(FireComponent.zeroState(), { up: fire.up - 1 })));
        }
        if (fire.down > 0) {
            const sprite = this._createFireSprite(x, y + 8, fire.down > 1 ? 'fire.vertical' : 'fire.down');
            engine.addEntities(createFire(sprite, Object.assign(FireComponent.zeroState(), { down: fire.down - 1 })));
        }
        if (fire.left > 0) {
            const sprite = this._createFireSprite(x - 8, y, fire.left > 1 ? 'fire.horizontal' : 'fire.left');
            engine.addEntities(createFire(sprite, Object.assign(FireComponent.zeroState(), { left: fire.left - 1 })));
        }
        if (fire.right > 0) {
            const sprite = this._createFireSprite(x + 8, y, fire.up > 1 ? 'fire.horizontal' : 'fire.right');
            engine.addEntities(createFire(sprite, Object.assign(FireComponent.zeroState(), { right: fire.right - 1 })));
        }
        Object.assign(fire, FireComponent.zeroState());
    }

    _createFireSprite(oldX, oldY, spriteName) {
        const { x, y } = utils.quantizeCoordinates(oldX, oldY, 16);
        const fireSprite = globalState.fire.create(x, y);
        fireSprite.setSize(6, 6, true);
        fireSprite.visible = false;
        fireSprite.setOffset(2, 1);
        return fireSprite;
    }
}