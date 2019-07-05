import Entity from "../../../../yanecs/Entity";
import MunitionComponent from "../bombs/MunitionComponent";
import SpriteComponent from "../graphics/SpriteComponent";
import ControlComponent from "../movement/ControlComponent";
import DestroyableComponent from "../bombs/DestroyableComponent";
import AnimationComponent from "../graphics/AnimationComponent";
import globalState from "../../globalState";
import utils from "../../utils";

export default function (x, y, spriteName, controlKeys) {
	const sprite = globalState.players.create(x, y);
	sprite.visible = false;
	sprite.setSize(6, 6);
	sprite.setCollideWorldBounds(true);
	return new Entity()
		.addComponent(new MunitionComponent())
		.addComponent(new SpriteComponent(sprite))
		.addComponent(new ControlComponent(controlKeys))
		.addComponent(new DestroyableComponent());
};