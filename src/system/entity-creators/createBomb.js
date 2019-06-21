import SpriteComponent from "../graphics/SpriteComponent";
import BombComponent from "../bombs/BombComponent";
import DestroyableComponent from "../bombs/DestroyableComponent";
import TimerComponent from "../TimerComponent";
import Entity from "../../yanecs/Entity";
import constants from "../../constants"

export default function (sprite, munitionComponent) {
	return new Entity()
		.addComponent(new SpriteComponent(sprite))
		.addComponent(new BombComponent(munitionComponent))
		.addComponent(new DestroyableComponent())
		.addComponent(new TimerComponent(constants.BOMB_TIMER));
};