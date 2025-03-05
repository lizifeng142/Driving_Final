class MiniGame extends Phaser.Scene {
    constructor() {
        super("MiniGameScene");
        this.knobFrame = 0; // Start at highest temp (90°F)
        this.temperatures = [90, 75, 60, 50, 40, 35, 30, 25, 20]; // Frame-to-temp mapping
    }

    init(data) {
        this.parentScene = data.parentScene;
    }

    create() {
        // Background image
        this.overlay = this.add.image(640, 360, "minigameBg").setOrigin(0.5, 0.5);

        // Create knob sprite
        this.knob = this.add.sprite(640, 360, "knob", this.knobFrame)
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true });

        // Create animation
        this.anims.create({
            key: "turnKnob",
            frames: this.anims.generateFrameNumbers("knob", { start: 0, end: 8 }),
            frameRate: 10,
            repeat: 0
        });

        // Add click detection but ONLY within the knob area
        this.knob.on("pointerdown", (pointer) => this.handleKnobClick(pointer));

        // Close (X) Button
        this.closeButton = this.add.text(640, 180, "X", {
            fontSize: "32px",
            fill: "#f00"
        })
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on("pointerdown", () => this.exitMiniGame());

        // Temperature text
        this.tempText = this.add.text(400, 450, `Temp: ${this.temperatures[this.knobFrame]}°F`, {
            fontSize: "24px",
            fill: "#000"
        }).setOrigin(0.5, 0.5);
    }

    handleKnobClick(pointer) {
        // Check if the click is within the knob bounds
        let knobBounds = this.knob.getBounds();
        
        if (pointer.x < knobBounds.left || pointer.x > knobBounds.right || 
            pointer.y < knobBounds.top || pointer.y > knobBounds.bottom) {
            return; // Ignore clicks outside the knob area
        }

        // Determine direction based on click position
        if (pointer.x < this.knob.x) {
            this.knobFrame = Math.min(this.knobFrame + 1, 8); // Decrease temp
        } else {
            this.knobFrame = Math.max(this.knobFrame - 1, 0); // Increase temp
        }

        // Update knob frame and temperature display
        this.knob.setFrame(this.knobFrame);
        this.tempText.setText(`Temp: ${this.temperatures[this.knobFrame]}°F`);
    }

    exitMiniGame() {
        if (this.parentScene && typeof this.parentScene.rewardPatience === "function") {
            this.parentScene.rewardPatience(20);
        }

        this.scene.stop();
        this.parentScene.resumeGame();
    }
}
