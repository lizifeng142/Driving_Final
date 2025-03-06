class Gameover extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    create() {
        // Stop all sounds when game over is triggered
        this.sound.stopAll();

        // Add a full-screen black background
        this.add.rectangle(640, 360, 1280, 720, 0x000000).setOrigin(0.5);

        // Display "GAME OVER" text in red
        this.add.text(640, 300, "GAME OVER", { 
            fontSize: "64px", 
            fill: "#ff0000", 
            fontStyle: "bold" 
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
