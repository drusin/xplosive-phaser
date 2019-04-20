class GlobalState {
    constructor() {
        this.anims = {};
        this.animTags = {};
        this.bombs = null;
        this.world = null;
    }
}

const SINGELTON = new GlobalState();
export default SINGELTON;