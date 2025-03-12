let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [ Preload, Menu, Credits, Play, MiniGame, MiniGame2, Gameover],
    physics: {
      default: 'arcade',
      arcade: {
          debug: false
      }
  }
};

let game = new Phaser.Game(config);
