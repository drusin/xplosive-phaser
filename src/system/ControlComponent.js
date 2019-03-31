import Component from "../yanecs/Component";

export default class ControlComponent extends Component {
    constructor() {
        super();
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.action = false;
    }
}