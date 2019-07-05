import constants from './constants';
import create from './create';
import engine from '../../yanecs/engine';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: constants.SCENES.GAME });
    }

    create() {
        this.cameras.main.setBackgroundColor('#cccccc');
        create.bind(this)();
    }

    update(time, delta) {
        engine.process(time, delta);
    }
}