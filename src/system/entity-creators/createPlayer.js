import Entity from "../../yanecs/Entity";
import MunitionComponent from "../bombs/MunitionComponent";
import SpriteComponent from "../graphics/SpriteComponent";
import ControlComponent from "../movement/ControlComponent";
import DestroyableComponent from "../bombs/DestroyableComponent";

export default function (playerSprite, animationComponent) {
	return new Entity()
		.addComponent(new MunitionComponent())
		.addComponent(new SpriteComponent(playerSprite))
		.addComponent(new ControlComponent())
		.addComponent(new DestroyableComponent())
		.addComponent(animationComponent);
};