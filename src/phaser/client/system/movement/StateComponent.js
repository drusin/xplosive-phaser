import Component from "../../../../yanecs/Component";

export default class StateComponent extends Component {
	constructor() {
		super();
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;
		this.dead = false;
	}
}