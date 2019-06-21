import Component from "../../yanecs/Component";

export default class TimerComponent extends Component {
    constructor(time) {
        super();
        this.time = time;
    }
}