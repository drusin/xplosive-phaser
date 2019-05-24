import Component from "../yanecs/Component";

export default class WallComponent extends Component {
    constructor(tile, cleanUp) {
        super();
        this.tile = tile;
        this._cleanUp = cleanUp;
    }

    cleanUp() {
        console.log('destroying tile');
        this._cleanUp();
        this.tile.destroy();
    }
}