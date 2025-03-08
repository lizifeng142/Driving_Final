class Gameover extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    create() {
        // Stop all sounds when game over is triggered
        this.sound.stopAll();

        // Adding the animated sprites as the backgrounds - sky 
        this.clouds = this.add.sprite(640, 380, "sky").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "go_cloudAnim",
            frames: this.anims.generateFrameNumbers("sky", { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1
        });

        this.clouds.play("go_cloudAnim");



        this.add.image(640, 380, "gameOverScene")

        // Display "GAME OVER" text in red
        this.add.text(640, 300, "GAME OVER", { 
            fontSize: "64px", 
            fontStyle: "bold", 
            fill: "#ff0000"
        }).setOrigin(0.5);

        // Instruction text
        this.add.text(640, 400, "Click anywhere to restart", { 
            fontSize: "28px", 
            fill: "#ffffff" 
        }).setOrigin(0.5);

        // Restart the game when clicking anywhere
        this.input.on("pointerdown", () => {
            this.scene.start("playScene"); // Restart the game
        });
    }
}
