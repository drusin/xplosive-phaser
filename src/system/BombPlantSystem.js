import System from "../yanecs/System";
import MunitionComponent from "./MunitionComponent";
import ControlComponent from "./ControlComponent";
import SpriteComponent from "./SpriteComponent";
import globalState from '../globalState';
import Entity from "../yanecs/Entity";
import TimerComponent from "./TimerComponent";
import engine from "../yanecs/engine";
import BombComponent from "./BombComponent";
import utils from "../utils";
import DestroyableComponent from "./DestroyableComponent";

export default class BombPlantSystem extends System {
    constructor(creator) {
        super(MunitionComponent.name, ControlComponent.name, SpriteComponent.name);
        this._creator = creator;
    }

    _plantBomb(pX, pY, munitionComponent) {
        const { x, y } = utils.quantizeCoordinates(pX, pY, 4);
        const bomb = globalState.bombs.create(x, y, 'bomb');
        bomb.setSize(4, 4);
        bomb.setOffset(2);
        bomb.anims.play(globalState.anims.bomb);
        munitionComponent.amount--;

        const bombEntity = new Entity();
        bombEntity.addComponent(new SpriteComponent(bomb))
            .addComponent(new BombComponent(munitionComponent))
            .addComponent(new DestroyableComponent())
            .addComponent(new TimerComponent(3000));
        
        engine.addEntities(bombEntity);
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