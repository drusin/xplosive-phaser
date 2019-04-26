import Component from "../yanecs/Component";

export default class WallComponent extends Component {
    constructor(tile) {
        super();
        this.tile = tile;
        if (!window.tile) {
            window.tile = tile;
        }
    }
}