import engine from './yanecs/engine';
import AnimationComponent from './system/graphics/AnimationComponent.js';
import ControlledAnimationSystem from './system/graphics/ControlledAnimationSystem.js';
import Entity from './yanecs/Entity.js';
import SpriteComponent from './system/graphics/SpriteComponent.js';
import ControlComponent from './system/movement/ControlComponent.js';
import MovementSystem from './system/movement/MovementSystem.js';
import ControlSystem from './system/movement/ControlSystem.js';
import textureHelper from './textureHelper';
import globalState from './globalState';
import MunitionComponent from './system/bombs/MunitionComponent';
import BombPlantSystem from './system/bombs/BombPlantSystem';
import TimerSystem from './system/TimerSystem';
import ExplosionSystem from './system/bombs/ExplosionSystem';
import RemoveAfterTimeOutSystem from './system/RemoveAfterTimeOutSystem';
import FireSystem from './system/bombs/FireSystem';
import WallComponent from './system/bombs/WallComponent';
import DestroyableComponent from './system/bombs/DestroyableComponent';
import WallDestroySystem from './system/bombs/WallDestroySystem';
import KillPlayerSystem from './system/bombs/KillPlayerSystem';

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
        const wallEntity = new Entity()
            .addComponent(new SpriteComponent(sprite))
            .addComponent(new WallComponent(tile));
        engine.addEntities(wallEntity);
    });
    
    const destructibleLayer = map.createDynamicLayer('destructible', tileset, 0, 0);
    destructibleLayer.setCollisionByProperty({ collision: true });
    destructibleLayer.depth = 5;
    destructibleLayer.filterTiles(tile => tile.properties.collision).forEach(tile => {
        const sprite = globalState.walls.create(tile.pixelX, tile.pixelY);
        sprite.setSize(8, 8);
        sprite.setOffset(16);
        sprite.visible = false;
        const wallEntity = new Entity()
            .addComponent(new DestroyableComponent())
            .addComponent(new SpriteComponent(sprite))
            .addComponent(new WallComponent(tile, () => map.removeTileAt(tile.x, tile.y)));
        engine.addEntities(wallEntity);
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

    const playerEntity = new Entity()
        .addComponent(new MunitionComponent())
        .addComponent(new SpriteComponent(player))
        .addComponent(new ControlComponent())
        .addComponent(new DestroyableComponent())
        .addComponent(animComponent);
    engine.addEntities(playerEntity);
    engine.addSystems(new ControlledAnimationSystem(),
        new TimerSystem(),
        new FireSystem(this),
        new RemoveAfterTimeOutSystem(),
        new ExplosionSystem(this),
        new MovementSystem(),
        new ControlSystem(cursors),
        new WallDestroySystem(),
        new KillPlayerSystem(),
        new BombPlantSystem(this));
}