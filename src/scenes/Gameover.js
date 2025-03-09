class Gameover extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    create(data) {  
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

        this.add.image(640, 380, "gameOverScene");

        // Display "GAME OVER" text
        this.add.text(640, 250, "GAME OVER", { 
            fontSize: "64px", 
            fontStyle: "bold", 
            fill: "#ff0000"
        }).setOrigin(0.5);

        // Retrieve last score (fix error)
        let lastScore = data.lastScore || 0;

        // Convert to MM:SS format
        let minutes = Math.floor(lastScore / 60);
        let seconds = lastScore % 60;
        let formattedLastScore = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Display "Your Time: MM:SS" on the Game Over screen
        this.add.text(640, 320, `Your Time: ${formattedLastScore}`, {
            fontSize: "35px",
            fontStyle: "bold",
            fill: "#FF4500",  // Orange-Red color for visibility
            stroke: "#000000", // Black outline for contrast
            strokeThickness: 4
        }).setOrigin(0.5, 0.5);

        // Restart Button
        let restartButton = this.add.text(640, 400, "Restart Game", {
            fontSize: "28px",
            fontStyle: "bold",
            fill: "#FFFFFF",
            backgroundColor: "#228B22", // Green button
            padding: { x: 15, y: 5 }
        }).setOrigin(0.5).setInteractive();

        restartButton.on("pointerdown", () => {
            this.scene.start("playScene"); // Restart the game
        });

        // Main Menu Button
        let menuButton = this.add.text(640, 500, "Main Menu", {
            fontSize: "28px",
            fontStyle: "bold",
            fill: "#FFFFFF",
            backgroundColor: "#0000FF",  // Blue button
            padding: { x: 15, y: 5 }
        }).setOrigin(0.5).setInteractive();

        menuButton.on("pointerdown", () => {
            this.scene.start("menuScene"); // Go back to the Main Menu
        });
    }
}
