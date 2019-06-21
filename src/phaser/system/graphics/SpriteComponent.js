import Component from "../../../yanecs/Component";

export default class SpriteComponent extends Component {
    constructor(sprite) {
        super();
        this.sprite = sprite;
    }

    cleanUp() {
        this.sprite.destroy();
    }
}