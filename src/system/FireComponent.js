import Component from "../yanecs/Component";

export default class FireComponent extends Component {
    constructor({ up, down, left, right }) {
        super();
        Object.assign(this, arguments[0]);
    }

    static zeroState() {
        return { up: 0, down: 0, left: 0, right: 0 };
    }

    static defaultState() {
        return { up: 2, down: 2, left: 2, right: 2 };
    }
}