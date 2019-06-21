import Component from "../../yanecs/Component";

export default class BombComponent extends Component {
    constructor(munitionComponent) {
        super();
        this.munitionComponent = munitionComponent;
    }
}