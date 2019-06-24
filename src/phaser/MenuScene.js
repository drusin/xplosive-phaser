import constants from './constants';
import preload from './preload';

export default class MenuScene extends Phaser.Scene {
    constructor () {
        super ({ key: constants.SCENES.MENU });
    }

    preload() {
        preload.bind(this)();
    }
}