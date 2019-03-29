import Component from "../yanecs/Component";

export default class StringComponent extends Component {
	constructor(value) {
		super(StringComponent.getName());
		this.value = value;
	}
	
	static getName() {
		return 'StringComponent'
	}
}