import System from "../yanecs/System";
import TimerComponent from "./TimerComponent";
import BodyComponent from "./BodyComponent";
import globalState from '../globalState';
import SpriteComponent from "./SpriteComponent";
import BombComponent from "./BombComponent";
import utils from "../utils";
import Entity from "../yanecs/Entity";

export default class ExplosionSystem extends System {
    constructor(creator) {
        super(TimerComponent.name, BodyComponent.name, SpriteComponent.name, BombComponent.name);
        this._creator = creator;
    }

    _createFire(bombX, bombY) {
        const { x, y } = utils.quantizeCoordinates(bombX, bombY);
        const fireSprite = this._creator.physics.add.sprite(x, y, 'fire');
        fireSprite.anims.play('fire.center');
        // const fire = new Entity()
            // .addComponent()
            // .addComponent();
    }

    process(entity) {
        if (entity.getComponent(TimerComponent.name).time < 0) {
            const { x, y } = entity.getComponent(BodyComponent.name).body;
            entity.getComponent(SpriteComponent.name).sprite.destroy();
            entity.getComponent(BombComponent.name).munitionComponent.amount ++;
            this._createFire(x, y);
            entity.markForRemoval();
        }
    }
}