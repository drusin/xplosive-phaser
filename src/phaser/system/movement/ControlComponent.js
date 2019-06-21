import Component from "../../../yanecs/Component";

export default class ControlComponent extends Component {
    constructor({ up, down, left, right, action }) {
        super();
        Object.assign(this, arguments[0]);
    }
}