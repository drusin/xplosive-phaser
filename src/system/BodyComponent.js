import Component from "../yanecs/Component";

export default class BodyComponent extends Component {
	constructor(body) {
		super();
		this.body = body;
	}

	cleanUp() {
		this.body.destroy();
	}
	
	toJSON() {
		return { __name: this.name, message: 'unsupported' };
	}
}