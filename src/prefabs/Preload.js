class Preload extends Phaser.Scene {
    constructor() {
        super("preloadScene");
    }

    preload() {

        // "Driving, traffic, construction.wav" by hatchetgirl from Freesound.org, Creative Commons 0
        // https://freesound.org/people/hatchetgirl/sounds/207441/
        this.load.audio("drivingSound", "assets/driving.wav")

        // "Guitar Background Sample" by uEffects, from Freesound.org, Creative Commons 0
        //https://freesound.org/people/uEffects/sounds/327575/
        this.load.audio("backgroundMusic", "assets/music.wav")

        // "Continous Static.wav" by Jace from Freesound.org, Creative Commons 0 
        // https://freesound.org/people/Jace/sounds/35291/
        this.load.audio("staticSound", "assets/static.wav")

        // "230707 Car alarm horn honks, roof, EM272s Toronto 12pm" by TRP from Freesound.org, Creative Commons 0 
        // https://freesound.org/people/TRP/sounds/717865/
        this.load.audio("carHorn", "assets/carHorn.wav")

        //"Car Crash (with Glass)" by magnuswanker from Freesound.org, Creative Commons 0
        // https://freesound.org/people/magnuswaker/sounds/592388/
        this.load.audio("crash", "assets/crash.wav")

        // Start button ("startMiniGame.png")
        this.load.image("startMiniGame","assets/startMiniGameOne.png")

        // Load background image 
        this.load.image("minigameBg", "assets/Minigame_Background.PNG"); 
        
        // Load sky sprite sheet ("cloudAnim.png")
         this.load.spritesheet("sky","assets/cloudAnim.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

        // UI Box for timer 
        this.load.image("timerUI","assets/timer.png")

        // Load road sprite sheet ("roadAnim.png")
        this.load.spritesheet("road","assets/roadAnim.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

        // Load tree sprite sheet ("treesAnim.png")
        this.load.spritesheet("tree","assets/treesAnim.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

        
        // Load title screen bus sheet ("titleBus.png")
        this.load.spritesheet("titleBus","assets/titleBus.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

        // Load title screen bus sheet ("titleCar.png") - for menu screen
        this.load.spritesheet("titleCar","assets/titleCar.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

        // Load title screen bus sheet ("busBlank.png") - for game over
        this.load.spritesheet("busBlank","assets/busBlank.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

        // Load title screen bus sheet ("gameOver.png") - for game over & credits 
        this.load.spritesheet("gameOverScene","assets/gameOver.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

        // Load bus sprite sheet ("busAnim.png")
        this.load.spritesheet("bus","assets/busMiniMove.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

        // Load car sprite sheet ("carAnim.png")
        this.load.spritesheet("car","assets/carAnim.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

        // Load car sprite sheet ("carAnim.png")
        this.load.spritesheet("minigame2","assets/Minigame_2.PNG", {
            frameWidth: 800,
            frameHeight: 500
        })
        
        // Load first knob sprite sheet ("Knob_Sprite1.png")
        this.load.spritesheet("knob", "assets/Knob_Sprite1.png", {
            frameWidth: 800,  
            frameHeight: 500,
            endFrame: 8       
        });

        // New UI - minigame background
        this.load.image("newMinigameBG","assets/newMinigameBackground.png")

        // New UI - minigame radio
        this.load.image("newMinigameRadio","assets/newMinigame2.png")

        // New UI - Second Knob AC
        this.load.spritesheet("ACKnob", "assets/newKnobSprite2.png", {
            frameWidth: 800,  
            frameHeight: 500,
            endFrame: 8       
        });

        // New UI - First Knob AUTO
        this.load.spritesheet("AUTOKnob", "assets/newKnobSprite1.png", {
            frameWidth: 800,  
            frameHeight: 500,
            endFrame: 8       
        });


        // Start button ("startMiniGame.png")
        this.load.image("startMiniGame","assets/startMiniGameOne.png")

    }

    create() {
        this.scene.start("menuScene");
    }
}
