import Phaser from 'phaser';
import engine from './yanecs/engine';
import preload from './preload';
import create from './create';

let anims = {};

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
  scene: { 
    preload,
    create,
    update },
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
};

new Phaser.Game(config);

function update() {
  engine.process();
}
