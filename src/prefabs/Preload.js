class Preload extends Phaser.Scene {
    constructor() {
        super("preloadScene");
    }

    preload() {
        // Load background image
        this.load.image("minigameBg", "assets/Minigame_Background.PNG"); 
        
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
    }

    create() {
        this.scene.start("menuScene");
    }
}
