import Entity from "../../yanecs/Entity";
import MunitionComponent from "../bombs/MunitionComponent";
import SpriteComponent from "../graphics/SpriteComponent";
import ControlComponent from "../movement/ControlComponent";
import DestroyableComponent from "../bombs/DestroyableComponent";
import AnimationComponent from "../graphics/AnimationComponent";
import globalState from "../../globalState";
import utils from "../../utils";

export default function (x, y, spriteName, controlKeys) {
	const sprite = globalState.players.create(x, y, spriteName);
	sprite.setSize(6, 6, true);
	sprite.setCollideWorldBounds(true);
	sprite.depth = 10;
	const anims = utils.getAnimsFor(spriteName);
	return new Entity()
		.addComponent(new MunitionComponent())
		.addComponent(new SpriteComponent(sprite))
		.addComponent(new ControlComponent(controlKeys))
		.addComponent(new DestroyableComponent())
		.addComponent(new AnimationComponent(anims));
};