import Component from "../yanecs/Component";

export default class MunitionComponent extends Component {
    constructor (initialAmount = 2) {
        super();
        this.amount = initialAmount;
    }
}