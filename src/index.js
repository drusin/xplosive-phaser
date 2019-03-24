import Phaser from 'phaser';
import mapJson from './assets/map.json';
import tiles from './assets/brick-sheet.png';
import sheet from './assets/textures.png';

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

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
    frameRate: 3,
    repeat: -1
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('dude', { start: 2, end: 5 }),
    frameRate: 6,
    repeat: -1
  });
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('dude', { start: 14, end: 15 }),
    frameRate: 6,
    repeat: -1
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 9 }),
    frameRate: 6,
    repeat: -1
  });
  this.anims.create({
    key: 'left',
    flipX: true,
    frames: this.anims.generateFrameNumbers('dude', { start: 10, end: 13 }),
    frameRate: 6,
    repeat: -1
  });
}

function update() {
  movement();
  animation();
}

function animation() {
  const velocity = player.body.velocity;
  if (velocity.x === 0 && velocity.y === 0) {
    player.anims.play('idle', true);
  }
  else if (velocity.y !== 0) {
    player.anims.play(velocity.y > 0 ? 'down' : 'up', true);
  }
  else if (velocity.x < 0) {
    player.anims.play('left', true);
  }
  else {
    player.anims.play('right', true);
  }
}

function movement() {
  if (cursors.left.isDown) {
    player.setVelocityX(-16);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(16);
  }
  else {
    player.setVelocityX(0);
  }
  if (cursors.up.isDown) {
    player.setVelocityY(-16);
  }
  else if (cursors.down.isDown) {
    player.setVelocityY(16);
  }
  else {
    player.setVelocityY(0);
  }
}

