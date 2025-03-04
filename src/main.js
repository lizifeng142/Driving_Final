let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [ Preload, Menu, Play, ]
  }

let game = new Phaser.Game(config);

hello