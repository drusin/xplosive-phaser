import System from "../yanecs/System";
import BodyComponent from "./BodyComponent";
import MunitionComponent from "./MunitionComponent";
import ControlComponent from "./ControlComponent";
import SpriteComponent from "./SpriteComponent";
import globalState from '../globalState';
import Entity from "../yanecs/Entity";
import TimerComponent from "./timerComponent";
import engine from "../yanecs/engine";

export default class BombPlantSystem extends System {
    constructor(creator) {
        super(BodyComponent.name, MunitionComponent.name, ControlComponent.name, SpriteComponent.name);
        this._creator = creator;
    }

    _plantBomb(pX, pY, munitionComponent) {
        const x = Math.round(pX / 8) * 8 + 4;
        const y = Math.round(pY / 8) * 8 + 4;
        const bomb = globalState.bombs.create(x, y, 'bomb');
        bomb.setSize(4, 4);
        bomb.setOffset(2);
        bomb.anims.play(globalState.anims.bomb);
        munitionComponent.amount--;

        const bombEntity = new Entity();
        bombEntity.addComponent(new SpriteComponent(bomb))
            .addComponent(new BodyComponent(bomb.body))
            .addComponent(new TimerComponent(3000));
        
        engine.addEntities(bombEntity);
    }

    process(entity) {
        const { action } = entity.getComponent(ControlComponent.name);
        const { x, y } = entity.getComponent(BodyComponent.name).body;
        const munitionComponent = entity.getComponent(MunitionComponent.name);
        const { sprite } = entity.getComponent(SpriteComponent.name);
        const playerIsOnBomb = globalState.world.overlap(sprite, globalState.bombs.getChildren())
        if (action && munitionComponent.amount && !playerIsOnBomb) {
            this._plantBomb(x, y, munitionComponent, sprite);
        }
    }
}