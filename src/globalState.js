class GlobalState {
    constructor() {
        this.anims = {};
        this.animTags = {};
        this.bombs = null;
        this.world = null;
        this.fire = null;
        this.walls = null;
        this.players = null;
    }
}

const SINGELTON = new GlobalState();
export default SINGELTON;