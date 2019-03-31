import Component from "../yanecs/Component";

export default class AnimationComponent extends Component {
    constructor({ left, upLeft, up, upRight, right, downRight, down, downLeft, idle }) {
        super();
        this.left = left;
        this.upLeft = upLeft;
        this.up = up;
        this.upRight = upRight;
        this.right = right;
        this.downRight = downRight;
        this.down = down;
        this.downLeft = downLeft;
        this.idle = idle;
    }
}