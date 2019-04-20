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

function createAnimComponent() {
    return new AnimationComponent({
        left: globalState.anims['blue.left'],
        upLeft: globalState.anims['blue.left'],
        up: globalState.anims['blue.up'],
        upRight: globalState.anims['blue.right'],
        right: globalState.anims['blue.right'],
        downRight: globalState.anims['blue.right'],
        down: globalState.anims['blue.down'],
        downLeft: globalState.anims['blue.left'],
        idle: globalState.anims['blue.idle'],
    });
}

export default function () {
    globalState.world = this.physics.world;
    globalState.bombs = this.physics.add.group();
    globalState.anims = textureHelper.createAnims(globalState.animTags, this);

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('brick-sheet', 'tiles');
    const walls = map.createStaticLayer('map', tileset, 0, 0);
    walls.setCollisionByProperty({ collision: true });

    const player = this.physics.add.sprite(4, 4, 'blue');
    player.setSize(6, 6, true);
    player.setCollideWorldBounds(true);
    player.depth = 10;

    const cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, walls);

    const animComponent = createAnimComponent();

    const playerEntity = new Entity()
        .addComponent(new MunitionComponent())
        .addComponent(new SpriteComponent(player))
        .addComponent(new BodyComponent(player.body))
        .addComponent(new ControlComponent())
        .addComponent(animComponent);
    engine.addEntities(playerEntity);
    engine.addSystems(new ControlledAnimationSystem(),
        new MovementSystem(),
        new ControlSystem(cursors),
        new BombPlantSystem(this));
}