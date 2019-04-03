import mapJson from './assets/map.json';
import tiles from './assets/brick-sheet.png';
import sheet from './assets/textures.png';

export default function () {
    this.load.image('tiles', tiles);
    this.load.tilemapTiledJSON('map', mapJson);
    this.load.spritesheet('dude', sheet, { frameWidth: 8, frameHeight: 8, startFrame: 0, endFrame: 16 });
}