import System from "../../yanecs/System";
import MunitionComponent from "./MunitionComponent";
import ControlComponent from "../movement/ControlComponent";
import SpriteComponent from "../graphics/SpriteComponent";
import globalState from '../../globalState';
import engine from "../../yanecs/engine";
import createBomb from "../entity-creators/createBomb";

export default class BombPlantSystem extends System {
    constructor() {
        super(MunitionComponent.name, ControlComponent.name, SpriteComponent.name);
	}
	
	process(entity) {
        const { action } = entity.getComponent(ControlComponent.name);
        const { x, y } = entity.getComponent(SpriteComponent.name).sprite.body;
        const munitionComponent = entity.getComponent(MunitionComponent.name);
        const { sprite } = entity.getComponent(SpriteComponent.name);

        document.getElementById('blubb').innerHTML = munitionComponent.amount;

        const playerIsOnBomb = globalState.world.overlap(sprite, globalState.bombs.getChildren());
        if (action.isDown && munitionComponent.amount && !playerIsOnBomb) {
			engine.addEntities(createBomb(x, y, munitionComponent));
		}
    }
}