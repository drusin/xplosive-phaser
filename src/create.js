import engine from './yanecs/engine';
import AnimationComponent from './system/graphics/AnimationComponent.js';
import ControlledAnimationSystem from './system/graphics/ControlledAnimationSystem.js';
import MovementSystem from './system/movement/MovementSystem.js';
import ControlSystem from './system/movement/ControlSystem.js';
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

function createAnimComponent() {
    return new AnimationComponent({
        left: globalState.anims['blue.left'],
        upLeft: globalState.anims['blue.up'],
        up: globalState.anims['blue.up'],
        upRight: globalState.anims['blue.up'],
        right: globalState.anims['blue.right'],
        downRight: globalState.anims['blue.down'],
        down: globalState.anims['blue.down'],
        downLeft: globalState.anims['blue.down'],
        idle: globalState.anims['blue.idle'],
        dead: globalState.anims['blue.dead']
    });
}

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

    const player = this.physics.add.sprite(4, 4, 'blue');
    player.setSize(6, 6, true);
    player.setCollideWorldBounds(true);
    player.depth = 10;
    this.physics.add.collider(player, globalState.bombs);
    this.physics.add.collider(player, undestructibleLayer);
    this.physics.add.collider(player, destructibleLayer);

    const cursors = this.input.keyboard.createCursorKeys();

    const animComponent = createAnimComponent();

    engine.addEntities(createPlayer(player, animComponent));
    engine.addSystems(new ControlledAnimationSystem(),
        new TimerSystem(),
        new FireSystem(this),
        new RemoveAfterTimeOutSystem(),
        new ExplosionSystem(this),
        new MovementSystem(),
        new ControlSystem(cursors),
        new WallDestroySystem(),
        new KillPlayerSystem(),
        new BombPlantSystem());
}