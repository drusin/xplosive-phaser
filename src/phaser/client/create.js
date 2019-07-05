import engine from '../../yanecs/engine';
import ControlledAnimationSystem from './system/graphics/ControlledAnimationSystem.js';
import MovementSystem from './system/movement/MovementSystem.js';
import textureHelper from './textureHelper';
import globalState from './globalState';
import BombPlantSystem from './system/bombs/BombPlantSystem';
import TimerSystem from './system/TimerSystem';
import ExplosionSystem from './system/bombs/ExplosionSystem';
import RemoveAfterTimeOutSystem from './system/RemoveAfterTimeOutSystem';
import FireSystem from './system/bombs/FireSystem';
import WallDestroySystem from './system/bombs/WallDestroySystem';
import KillPlayerSystem from './system/bombs/KillPlayerSystem';
import createPlayer from "./system/entity-creators/createPlayer";
import createWall from "./system/entity-creators/createWall";

export default function () {
    globalState.world = this.physics.world;
    globalState.bombs = this.physics.add.staticGroup();
    globalState.fire = this.physics.add.staticGroup();
    globalState.walls = this.physics.add.staticGroup();
    globalState.anims = textureHelper.createAnims(globalState.animTags, this, ['bomb', 'dead']);

    globalState.world.TILE_BIAS = 8; // tilemap tiles are 8x8, default bias is for 16x16 and breaks collision
    globalState.world.OVERLAP_BIAS = 1; // we don't want to automatically resolve overlaps

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('brick-sheet', 'tiles');
    const undestructibleLayer = map.createStaticLayer('undestructible', tileset, 0, 0);
    undestructibleLayer.setCollisionByProperty({ collision: true });
    undestructibleLayer.depth = 5;
    undestructibleLayer.filterTiles(tile => tile.properties.collision).forEach(tile => {
        const sprite = globalState.walls.create(tile.pixelX, tile.pixelY);
        sprite.setSize(8, 8);
        sprite.setOffset(16);
        sprite.visible = false;
        engine.addEntities(createWall(sprite, tile));
    });
    
    const destructibleLayer = map.createDynamicLayer('destructible', tileset, 0, 0);
    destructibleLayer.setCollisionByProperty({ collision: true });
    destructibleLayer.depth = 5;
    destructibleLayer.filterTiles(tile => tile.properties.collision).forEach(tile => {
        const sprite = globalState.walls.create(tile.pixelX, tile.pixelY);
        sprite.setSize(8, 8);
        sprite.setOffset(16);
        sprite.visible = false;
        engine.addEntities(createWall(sprite, tile, true, () => map.removeTileAt(tile.x, tile.y)));
    });
    
    globalState.players = this.physics.add.group();
    this.physics.add.collider(globalState.players, globalState.bombs);
    this.physics.add.collider(globalState.players, undestructibleLayer);
    this.physics.add.collider(globalState.players, destructibleLayer);

    const savedPlayerOneKeys = JSON.parse(window.localStorage.playerOneKeys);
    const playerOneKeys = this.input.keyboard.addKeys({
        up: savedPlayerOneKeys.up,
        down: savedPlayerOneKeys.down,
        left: savedPlayerOneKeys.left,
        right: savedPlayerOneKeys.right,
        action: savedPlayerOneKeys.action
    });

    const savedPlayerTwoKeys = JSON.parse(window.localStorage.playerTwoKeys);
    const playerTwoKeys = this.input.keyboard.addKeys({
        up: savedPlayerTwoKeys.up,
        down: savedPlayerTwoKeys.down,
        left: savedPlayerTwoKeys.left,
        right: savedPlayerTwoKeys.right,
        action: savedPlayerTwoKeys.action
    });
    
    engine.addEntities(
        createPlayer(4, 4, 'blue', playerOneKeys),
        createPlayer(60, 4, 'red', playerTwoKeys)
    );
    
    engine.addSystems(new ControlledAnimationSystem(),
        new TimerSystem(),
        new FireSystem(),
        new RemoveAfterTimeOutSystem(),
        new ExplosionSystem(this),
        new MovementSystem(),
        new WallDestroySystem(),
        new KillPlayerSystem(),
        new BombPlantSystem());
}