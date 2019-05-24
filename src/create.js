import engine from './yanecs/engine';
import AnimationComponent from './system/AnimationComponent.js';
import ControlledAnimationSystem from './system/ControlledAnimationSystem.js';
import Entity from './yanecs/Entity.js';
import SpriteComponent from './system/SpriteComponent.js';
import ControlComponent from './system/ControlComponent.js';
import MovementSystem from './system/MovementSystem.js';
import ControlSystem from './system/ControlSystem.js';
import BodyComponent from "./system/BodyComponent";
import textureHelper from './textureHelper';
import globalState from './globalState';
import MunitionComponent from './system/MunitionComponent';
import BombPlantSystem from './system/BombPlantSystem';
import TimerSystem from './system/TimerSystem';
import ExplosionSystem from './system/ExplosionSystem';
import RemoveAfterTimeOutSystem from './system/RemoveAfterTimeOutSystem';
import FireSystem from './system/FireSystem';
import WallComponent from './system/WallComponent';
import DestroyableComponent from './system/DestroyableComponent';
import WallDestroySystem from './system/WallDestroySystem';

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
    });
}

export default function () {
    globalState.world = this.physics.world;
    globalState.bombs = this.physics.add.staticGroup();
    globalState.fire = this.physics.add.staticGroup();
    globalState.walls = this.physics.add.staticGroup();
    globalState.anims = textureHelper.createAnims(globalState.animTags, this, ['bomb']);

    globalState.world.TILE_BIAS = 8; // tilemap tiles are 8x8, default bias is for 16x16 and breaks collision
    globalState.world.OVERLAP_BIAS = 1; // we don't want to automatically resolve overlaps

    const map = this.make.tilemap({ key: 'map' });
    console.log(map);
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
        .addComponent(new BodyComponent(player.body))
        .addComponent(new ControlComponent())
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
        new BombPlantSystem(this));
}