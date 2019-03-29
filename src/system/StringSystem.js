import System from "../yanecs/System";
import StringComponent from "./StringComponent";

export default class StringSystem extends System {
	constructor() {
		super([StringComponent.getName()]);
	}
	
	process(entity) {
		console.log(entity.getComponent(StringComponent.getName()).value);
	}
}