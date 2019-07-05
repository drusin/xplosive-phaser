export class InputMessage {
	constructor({left, right, up, down, action}) {
		Object.assign(this, arguments[0]);
	}
}

export function fromComponent(controlComponent) {
	return new InputMessage({
		left: controlComponent.left.isDown(),
		right: controlComponent.right.isDown(),
		up: controlComponent.up.isDown(),
		down: controlComponent.down.isDown(),
		action: controlComponent.action.isDown()
	});
}