class Preload extends Phaser.Scene {
    constructor() {
        super("preloadScene");
    }

    preload() {
        // Load background image
        this.load.image("minigameBg", "assets/Minigame_Background.PNG"); 
        
        // Load knob sprite sheet (Assuming each frame is the same size)
        this.load.spritesheet("knob", "assets/Knob_Sprite.png", {
            frameWidth: 800,  // Adjust based on actual frame width
            frameHeight: 500, // Adjust based on actual frame height
            endFrame: 8       // Number of frames (0-indexed)
        });
    }

    create() {
        this.scene.start("menuScene");
    }
}
