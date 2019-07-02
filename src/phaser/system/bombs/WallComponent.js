import Component from "../../../yanecs/Component";

export default class WallComponent extends Component {
    constructor(tile) {
        super();
        this.tile = tile;
    }

    cleanUp() {
    	// TODO: recalculate faces of remaining walls!
        this.tile.collideDown = false;
        this.tile.collideUp = false;
        this.tile.collideLeft = false;
        this.tile.collideRight = false;
        this.tile.setVisible(false);
    }
}