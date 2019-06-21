import System from "../../yanecs/System";
import MunitionComponent from "./MunitionComponent";
import ControlComponent from "../movement/ControlComponent";
import SpriteComponent from "../graphics/SpriteComponent";
import globalState from '../../globalState';
import engine from "../../yanecs/engine";
import utils from "../../utils";
import createBomb from "../entity-creators/createBomb";

export default class BombPlantSystem extends System {
    constructor() {
        super(MunitionComponent.name, ControlComponent.name, SpriteComponent.name);
    }

    _plantBomb(pX, pY, munitionComponent) {
        const { x, y } = utils.quantizeCoordinates(pX, pY, 4);
        const bomb = globalState.bombs.create(x, y, 'bomb');
        bomb.setSize(4, 4);
        bomb.setOffset(2);
        bomb.anims.play(globalState.anims.bomb);
        munitionComponent.amount--;

        engine.addEntities(createBomb(bomb, munitionComponent));
    }

    process(entity) {
        const { action } = entity.getComponent(ControlComponent.name);
        const { x, y } = entity.getComponent(SpriteComponent.name).sprite.body;
        const munitionComponent = entity.getComponent(MunitionComponent.name);
        const { sprite } = entity.getComponent(SpriteComponent.name);

        document.getElementById('blubb').innerHTML = munitionComponent.amount;

        const playerIsOnBomb = globalState.world.overlap(sprite, globalState.bombs.getChildren());
        if (action && munitionComponent.amount && !playerIsOnBomb) {
            this._plantBomb(x, y, munitionComponent, sprite);
        }
    }
}