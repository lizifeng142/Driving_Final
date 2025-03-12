class Gameover extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    create(data) {
        // Stop all sounds when game over is triggered
        this.sound.stopAll();

        let crashSound = this.sound.add("crash", { loop: false, volume: 0.3 })
        crashSound.play()

        let carHorns = this.sound.add("carHorn", { loop: true, volume: 0.3 })
        carHorns.play()


        // Adding the animated sprites as the backgrounds - sky 
        this.clouds = this.add.sprite(640, 380, "sky").setOrigin(0.5, 0.5)

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
        this.add.text(640, 250, "GAME", {
            fontSize: "64px",
            fontStyle: "bold",
            fill: "#ff0000"
        }).setOrigin(0.5);

        this.add.text(840, 300, "OVER", {
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
            console.log("Restarting game...");
        
            // Stop and fully remove EventManagerScene before restarting
            if (this.scene.get("EventManagerScene")) {
                this.scene.stop("EventManagerScene");
                this.scene.remove("EventManagerScene");
            }
        
            // Stop all active scenes before restarting
            this.scene.stop("playScene");
            this.scene.stop("MiniGameScene");
            this.scene.stop("MiniGameScene2");
        
            // Stop all sounds and reset game state
            this.sound.stopAll();
            this.time.removeAllEvents();
            this.tweens.killAll();
        
            // Restart the game fresh
            this.scene.start("playScene");
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
            console.log("Main Menu button clicked!");
        
            // Stop and fully remove EventManagerScene
            if (this.scene.get("EventManagerScene")) {
                this.scene.stop("EventManagerScene");
                this.scene.remove("EventManagerScene");
            }
        
            // Stop all other active scenes
            this.scene.stop("playScene");
            this.scene.stop("MiniGameScene");
            this.scene.stop("MiniGameScene2");
    
            // Stop all sounds and timers
            this.sound.stopAll();
            this.time.removeAllEvents();
            this.tweens.killAll();
        
            // Transition to the main menu
            this.scene.start("menuScene");
        });
        

    }
    
    resetGameState() {
        // Stop all sounds
        this.sound.stopAll();
    
        // Clear active timers (if any exist)
        this.time.removeAllEvents();
    
        // Destroy all tweens (useful for UI animations)
        this.tweens.killAll();
    
        // Reset player and game objects (if needed)
        this.scene.get("playScene")?.scene.restart(); // Restart play scene fresh
    }
}
