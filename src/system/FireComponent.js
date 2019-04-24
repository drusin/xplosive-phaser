import Component from "../yanecs/Component";

export default class FireComponent extends Component {
    constructor({ up = 2, down = 2, left = 2, right = 2 }) {
        super();
        Object.assign(this, arguments[0]);
    }
}