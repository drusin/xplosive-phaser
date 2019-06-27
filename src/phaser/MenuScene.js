import constants from './constants';
import preload from './preload';

export default class MenuScene extends Phaser.Scene {
    constructor () {
        super ({ key: constants.SCENES.MENU });
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');
    }

    preload() {
        preload.bind(this)();
    }
}