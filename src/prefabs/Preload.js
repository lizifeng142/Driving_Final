class Preload extends Phaser.Scene {
    constructor() {
        super("preloadScene");
    }

    preload() {

        // Start button ("startMiniGame.png")
        this.load.image("startMiniGame","assets/startMiniGameOne.png")

        // Load background image 
        this.load.image("minigameBg", "assets/Minigame_Background.PNG"); 
        
        // Load sky sprite sheet ("cloudAnim.png")
         this.load.spritesheet("sky","assets/cloudAnim.png", {
            frameWidth: 1280,
            frameHeight: 720
        })

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




        
        // Load first knob sprite sheet ("Knob_Sprite1.png")
        this.load.spritesheet("knob", "assets/Knob_Sprite1.png", {
            frameWidth: 800,  
            frameHeight: 500,
            endFrame: 8       
        });

        // Load second knob sprite sheet ("Knob_Sprite2.png")
        this.load.spritesheet("knob2", "assets/Knob_Sprite2.png", {
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
