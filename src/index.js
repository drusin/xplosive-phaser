import Phaser from 'phaser';
import mapJson from './assets/map.json';
import tiles from './assets/brick-sheet.png';
import sheet from './assets/textures.png';
import engine from './yanecs/Engine';
import AnimationComponent from './system/AnimationComponent.js';
import AnimationSystem from './system/AnimationSystem.js';
import Entity from './yanecs/Entity.js';
import SpriteComponent from './system/SpriteComponent.js';
import ControlComponent from './system/ControlComponent.js';
import MovementSystem from './system/MovementSystem.js';
import ControlSystem from './system/ControlSystem.js';

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    parent: 'phaser-example',
    mode: Phaser.Scale.FIT,
    width: 64,
    height: 64,
    max: {
      width: 640,
      height: 640
    }
  },
  backgroundColor: '#cccccc',
  scene: { preload, create, update },
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
};

const game = new Phaser.Game(config);
let player;
let cursors;

function preload() {
  this.load.image('tiles', tiles);
  this.load.tilemapTiledJSON('map', mapJson);
  this.load.spritesheet('dude', sheet, { frameWidth: 8, frameHeight: 8, startFrame: 0, endFrame: 16 });
}

function create() {
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('brick-sheet', 'tiles');
  const walls = map.createStaticLayer('map', tileset, 0, 0);
  walls.setCollisionByProperty({ collision: true });

  player = this.physics.add.sprite(4, 4, 'dude');
  player.setSize(6, 6, true);
  player.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();
  this.physics.add.collider(player, walls);

  const animComponent = createAnims(this);

  const playerEntity = new Entity()
    .addComponent(new SpriteComponent(player))
    .addComponent(new ControlComponent())
    .addComponent(animComponent);
  engine.addEntities(playerEntity);
  engine.addSystem(new AnimationSystem());
  engine.addSystem(new MovementSystem());
  engine.addSystem(new ControlSystem(cursors));
}

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

function update() {
  engine.process();

  console.log(player.body.velocity);
}
