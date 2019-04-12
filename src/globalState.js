class GlobalState {
    constructor() {
        this.anims = {};
        this.animTags = {};
    }
}

const SINGELTON = new GlobalState();
export default SINGELTON;