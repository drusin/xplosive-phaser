import Component from "../../../yanecs/Component";

export default class DestroyableComponent extends Component {
    constructor() {
        super();
        this.destroyed = false;
    }
}