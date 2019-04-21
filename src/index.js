import Phaser from 'phaser';
import engine from './yanecs/engine';
import preload from './preload';
import create from './create';

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    parent: 'xplosive',
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
    arcade: { debug: true }
  }
};

new Phaser.Game(config);

function update(time, delta) {
  engine.process(time, delta);
}
