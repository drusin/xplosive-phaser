import engine from './yanecs/engine';
import AnimationComponent from './system/AnimationComponent.js';
import AnimationSystem from './system/AnimationSystem.js';
import Entity from './yanecs/Entity.js';
import SpriteComponent from './system/SpriteComponent.js';
import ControlComponent from './system/ControlComponent.js';
import MovementSystem from './system/MovementSystem.js';
import ControlSystem from './system/ControlSystem.js';
import BodyComponent from "./system/BodyComponent";

function createAnims(creator) {
    const idle = creator.anims.create({
        key: 'idle',
        frames: creator.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
    });
    const down = creator.anims.create({
        key: 'down',
        frames: creator.anims.generateFrameNumbers('dude', { start: 2, end: 5 }),
        frameRate: 6,
        repeat: -1
    });
    const up = creator.anims.create({
        key: 'up',
        frames: creator.anims.generateFrameNumbers('dude', { start: 14, end: 15 }),
        frameRate: 6,
        repeat: -1
    });
    const right = creator.anims.create({
        key: 'right',
        frames: creator.anims.generateFrameNumbers('dude', { start: 6, end: 9 }),
        frameRate: 6,
        repeat: -1
    });
    const left = creator.anims.create({
        key: 'left',
        flipX: true,
        frames: creator.anims.generateFrameNumbers('dude', { start: 10, end: 13 }),
        frameRate: 6,
        repeat: -1
    });

    return new AnimationComponent({
        left,
        upLeft: left,
        up,
        upRight: right,
        right,
        downRight: right,
        down,
        downLeft: left,
        idle
    })
}

export default function () {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('brick-sheet', 'tiles');
    const walls = map.createStaticLayer('map', tileset, 0, 0);
    walls.setCollisionByProperty({ collision: true });

    const player = this.physics.add.sprite(4, 4, 'dude');
    player.setSize(6, 6, true);
    player.setCollideWorldBounds(true);

    const cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, walls);

    const animComponent = createAnims(this);

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