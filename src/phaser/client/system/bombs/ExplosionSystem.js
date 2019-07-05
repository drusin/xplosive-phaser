import System from "../../../../yanecs/System";
import TimerComponent from "../TimerComponent";
import SpriteComponent from "../graphics/SpriteComponent";
import BombComponent from "./BombComponent";
import utils from "../../utils";
import FireComponent from "./FireComponent";
import engine from "../../../../yanecs/engine";
import globalState from '../../globalState';
import DestroyableComponent from "./DestroyableComponent";
import createFire from "../entity-creators/createFire";

export default class ExplosionSystem extends System {
    constructor() {
        super(TimerComponent.name, SpriteComponent.name, BombComponent.name, DestroyableComponent.name);
    }

    _createFire(bombX, bombY) {
        const { x, y } = utils.quantizeCoordinates(bombX, bombY, 4);
        const fireSprite = globalState.fire.create(x, y, 'fire');
        fireSprite.setSize(6, 6);
        fireSprite.setOffset(1);
        fireSprite.anims.play('fire.center');
        engine.addEntities(createFire(fireSprite, FireComponent.defaultState()));
    }

    process(entity) {
        const destroyableComponent = entity.getComponent(DestroyableComponent.name);
        if (entity.getComponent(TimerComponent.name).time < 0) {
            destroyableComponent.destroyed = true;
        }

        if (destroyableComponent.destroyed) {
            const { x, y } = entity.getComponent(SpriteComponent.name).sprite.body;
            entity.getComponent(BombComponent.name).munitionComponent.amount ++;
            this._createFire(x, y);
            entity.markForRemoval();
        }
    }
}