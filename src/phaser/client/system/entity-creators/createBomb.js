import SpriteComponent from "../graphics/SpriteComponent";
import BombComponent from "../bombs/BombComponent";
import DestroyableComponent from "../bombs/DestroyableComponent";
import TimerComponent from "../TimerComponent";
import Entity from "../../../../yanecs/Entity";
import constants from "../../constants"
import utils from "../../utils";
import globalState from "../../globalState";

export default function(pX, pY, munitionComponent) {
	const { x, y } = utils.quantizeCoordinates(pX, pY, 4);
	const sprite = globalState.bombs.create(x, y, 'bomb');
	sprite.setSize(4, 4);
	sprite.setOffset(2);
	sprite.anims.play(globalState.anims.bomb);
	munitionComponent.amount --;
	return new Entity()
		.addComponent(new SpriteComponent(sprite))
		.addComponent(new BombComponent(munitionComponent))
		.addComponent(new DestroyableComponent())
		.addComponent(new TimerComponent(constants.BOMB_TIMER));
};