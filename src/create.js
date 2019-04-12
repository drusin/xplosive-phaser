import engine from './yanecs/engine';
import AnimationComponent from './system/AnimationComponent.js';
import AnimationSystem from './system/AnimationSystem.js';
import Entity from './yanecs/Entity.js';
import SpriteComponent from './system/SpriteComponent.js';
import ControlComponent from './system/ControlComponent.js';
import MovementSystem from './system/MovementSystem.js';
import ControlSystem from './system/ControlSystem.js';
import BodyComponent from "./system/BodyComponent";
import textureHelper from './textureHelper';
import globalState from './globalState';

function createAnimComponent() {
    return new AnimationComponent({
        left: globalState.anims['blue.left'],
        upLeft: globalState.anims['blue.left'],
        up: globalState.anims['blue.up'],
        upRight: globalState.anims['blue.right'],
        right: globalState.anims['blue.right'],
        downRight: globalState.anims['blue.down'],
        down: globalState.anims['blue.down'],
        downLeft: globalState.anims['blue.left'],
        idle: globalState.anims['blue.idle'],
    })
}

export default function () {
    globalState.anims = textureHelper.createAnims(globalState.animTags, this);
    console.log(globalState.anims);

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('brick-sheet', 'tiles');
    const walls = map.createStaticLayer('map', tileset, 0, 0);
    walls.setCollisionByProperty({ collision: true });

    const player = this.physics.add.sprite(4, 4, 'blue');
    player.setSize(6, 6, true);
    player.setCollideWorldBounds(true);

    const cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, walls);

    const animComponent = createAnimComponent();

    const playerEntity = new Entity()
        .addComponent(new SpriteComponent(player))
        .addComponent(new BodyComponent(player.body))
        .addComponent(new ControlComponent())
        .addComponent(animComponent);
    engine.addEntities(playerEntity);
    engine.addSystems(new AnimationSystem(),
        new MovementSystem(),
        new ControlSystem(cursors));
}