import System from "../yanecs/System";
import FireComponent from "./FireComponent";
import BodyComponent from "./BodyComponent";
import utils from "../utils";
import engine from "../yanecs/engine";
import globalState from "../globalState";
import SpriteComponent from "./SpriteComponent";

export default class FireSpreadSystem extends System {
    constructor(creator) {
        super(FireComponent.name, BodyComponent.name);
        this._creator = creator;
    }

    _createFireSprite(oldX, oldY, spriteName) {
        const { x, y } = utils.quantizeCoordinates(oldX, oldY, 4);
        const fireSprite = this._creator.physics.add.sprite(x, y, 'fire');
        fireSprite.anims.play(spriteName);
        return fireSprite;
    }

    process(entity) {
        const { body } = entity.getComponent(BodyComponent.name);
        const { x, y } = body;
        const fire = entity.getComponent(FireComponent.name);

        globalState.world.overlap(globalState.walls, entity.getComponent(SpriteComponent.name).sprite, (left) => console.log(left));

        if (fire.up > 0) {
            const sprite = this._createFireSprite(x, y - 8, fire.up > 1 ? 'fire.vertical' : 'fire.up')
            engine.addEntities(utils.createFireEntity(sprite, new FireComponent(Object.assign(FireComponent.zeroState(), { up: fire.up - 1 }))));
        }
        if (fire.down > 0) {
            const sprite = this._createFireSprite(x, y + 8, fire.down > 1 ? 'fire.vertical' : 'fire.down')
            engine.addEntities(utils.createFireEntity(sprite, new FireComponent(Object.assign(FireComponent.zeroState(), { down: fire.down - 1 }))));
        }
        if (fire.left > 0) {
            const sprite = this._createFireSprite(x - 8, y, fire.left > 1 ? 'fire.horizontal' : 'fire.left')
            engine.addEntities(utils.createFireEntity(sprite, new FireComponent(Object.assign(FireComponent.zeroState(), { left: fire.left - 1 }))));
        }
        if (fire.right > 0) {
            const sprite = this._createFireSprite(x + 8, y, fire.up > 1 ? 'fire.horizontal' : 'fire.right')
            engine.addEntities(utils.createFireEntity(sprite, new FireComponent(Object.assign(FireComponent.zeroState(), { right: fire.right - 1 }))));
        }


        Object.assign(fire, FireComponent.zeroState());
    }
}