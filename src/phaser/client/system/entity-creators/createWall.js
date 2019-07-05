import Entity from "../../../../yanecs/Entity";
import SpriteComponent from "../graphics/SpriteComponent";
import WallComponent from "../bombs/WallComponent";
import DestroyableComponent from "../bombs/DestroyableComponent";

export default function (sprite, tile, destroyable = false, cleanUpCallback = () => {}) {
	const entity =  new Entity()
		.addComponent(new SpriteComponent(sprite))
		.addComponent(new WallComponent(tile, cleanUpCallback));
	if (destroyable) {
		entity.addComponent(new DestroyableComponent());
	}
	return entity;
};