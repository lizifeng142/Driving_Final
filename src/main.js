// Virtual Stuck Behind a Bus 
// Group project by Ruby Hirsch and Calvin Li 
// 3/18/25

// Major Phaser Components: 
// - Physics Systems 
// - Animation Manager 
// - Tween Manager 
// - Timers 
// - Tilemaps, Parallax 

// Audio Sources: 
// "Driving, traffic, construction.wav" by hatchetgirl from Freesound.org, Creative Commons 0
// https://freesound.org/people/hatchetgirl/sounds/207441/

// "Guitar Background Sample" by uEffects, from Freesound.org, Creative Commons 0 
//https://freesound.org/people/uEffects/sounds/327575/

// "Continous Static.wav" by Jace from Freesound.org, Creative Commons 0 
// https://freesound.org/people/Jace/sounds/35291/

// "230707 Car alarm horn honks, roof, EM272s Toronto 12pm" by TRP from Freesound.org, Creative Commons 0 
// https://freesound.org/people/TRP/sounds/717865/

//"Car Crash (with Glass)" by magnuswanker from Freesound.org, Creative Commons 0
// https://freesound.org/people/magnuswaker/sounds/592388/

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 820,
    scene: [ Preload, Menu, Credits, Tutorial,  Play, MiniGame, MiniGame2, Gameover],
    physics: {
      default: 'arcade',
      arcade: {
          debug: false
      }
  }
};

let game = new Phaser.Game(config);
