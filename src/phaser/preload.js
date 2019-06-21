import mapJson from '../assets/map.json';
import tiles from '../assets/brick-sheet.png';
import sheet from '../assets/textures.png';
import textureHelper from './textureHelper';
import texturesJson from '../assets/textures.json';
import globalState from './globalState';

export default function () {
    this.load.image('tiles', tiles);
    this.load.tilemapTiledJSON('map', mapJson);
    globalState.animTags = textureHelper.readJson(texturesJson);
    textureHelper.loadSheets(globalState.animTags, sheet, this);
}