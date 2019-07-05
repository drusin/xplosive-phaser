import Entity from "../../../../yanecs/Entity";
import SpriteComponent from "../SpriteComponent";
import RemoveAfterTimeOutComponent from "../RemoveAfterTimeOutComponent";
import TimerComponent from "../TimerComponent";
import FireComponent from "../bombs/FireComponent";
import constants from "../../constants"

export default function (sprite, fireState) {
	return new Entity()
		.addComponent(new SpriteComponent(sprite))
		.addComponent(new FireComponent(fireState))
		.addComponent(new RemoveAfterTimeOutComponent())
		.addComponent(new TimerComponent(constants.FIRE_TIMER));
};