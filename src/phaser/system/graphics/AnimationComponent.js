import Component from "../../../yanecs/Component";

export default class AnimationComponent extends Component {
    constructor({ left, upLeft, up, upRight, right, downRight, down, downLeft, idle, dead }) {
        super();
        Object.assign(this, arguments[0]);
    }
}