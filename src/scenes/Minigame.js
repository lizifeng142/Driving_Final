class MiniGame extends Phaser.Scene {
    constructor() {
        super("MiniGameScene");

        // First knob (default)
        this.knobFrame1 = 0;
        this.temperatures1 = [70, 75, 80, 85, 90, 65, 60, 55, 50];

        // Second knob (Knob_Sprite2.png)
        this.knobFrame2 = 0;
        this.temperatures2 = [70, 75, 80, 85, 90, 65, 60, 55, 50];

        // Target temperatures for event
        this.targetTemp1 = null;
        this.targetTemp2 = null;
    }

    init(data) {
        this.parentScene = data.parentScene;
    }

    create() {
        // Background image
        //this.overlay = this.add.image(640, 360, "minigameBg").setOrigin(0.5, 0.5);
        this.overlay = this.add.image(640, 360, "newMinigameBG").setOrigin(0.5, 0.5);

        //this.overlay = this.add.image(640, 360, "minigame2").setOrigin(0.5, 0.5);
        this.overlay = this.add.image(640, 360, "newMinigameRadio").setOrigin(0.5, 0.5);

        // Create first knob (Knob_Sprite.png)
        //this.knob1 = this.add.sprite(640, 360, "knob", this.knobFrame1).setOrigin(0.5, 0.5);
        this.knob1 = this.add.sprite(640, 360, "AUTOKnob", this.knobFrame1).setOrigin(0.5, 0.5);

        // Create second knob (Knob_Sprite2.png)
        //this.knob2 = this.add.sprite(640, 360, "knob2", this.knobFrame2).setOrigin(0.5, 0.5);
        this.knob2 = this.add.sprite(640, 360, "ACKnob", this.knobFrame2).setOrigin(0.5, 0.5);

        // Left zone (First knob - cooling)
        this.leftZone1 = this.add.rectangle(this.knob1.x - 340, this.knob1.y - 129, 60, 125, 0xff0000, 0) // hitbox checker
            .setInteractive()
            .on("pointerdown", () => this.changeTemperature("left", 1));

        // Right zone (First knob - heating)
        this.rightZone1 = this.add.rectangle(this.knob1.x - 277, this.knob1.y - 129, 60, 125, 0xff0000, 0)
            .setInteractive()
            .on("pointerdown", () => this.changeTemperature("right", 1));

        // Left zone (Second knob - cooling)
        this.leftZone2 = this.add.rectangle(this.knob2.x + 250, this.knob2.y - 105, 60, 125, 0x000000, 0)
            .setInteractive()
            .on("pointerdown", () => this.changeTemperature("left", 2));

        // Right zone (Second knob - heating)
        this.rightZone2 = this.add.rectangle(this.knob2.x + 315, this.knob2.y - 105, 60, 125, 0x000000, 0)
            .setInteractive()
            .on("pointerdown", () => this.changeTemperature("right", 2));

        // Temperature text (Knob 1)
        this.tempText1 = this.add.text(485, 285, `${this.temperatures1[this.knobFrame1]}°`, {
            fontSize: "20px",  // Increased font size for better visibility
            fill: "#00FF00",  // Neon Green
            fontStyle: "bold",
            stroke: "#000000",  // Black outline for contrast
            strokeThickness: 3,
        }).setOrigin(0.5, 0.5);

        // Temperature text (Knob 2)
        this.tempText2 = this.add.text(800, 290, `${this.temperatures2[this.knobFrame2]}°`, {
            fontSize: "20px",  // Increased font size for better visibility
            fill: "#00FF00",  // Neon Green
            fontStyle: "bold",
            stroke: "#000000",  // Black outline for contrast
            strokeThickness: 3,
        }).setOrigin(0.5, 0.5);

        // Start Temperature Matching Event
        this.startTemperatureEvent();
    }

    startTemperatureEvent() {
        // Choose random target temperatures
        this.targetTemp1 = Phaser.Utils.Array.GetRandom(this.temperatures1);
        this.targetTemp2 = Phaser.Utils.Array.GetRandom(this.temperatures2);

        // Create a black background for the text
        let bgWidth = 300; // Width of the background
        let bgHeight = 40; // Height of the background

        //Display the goal temperature - Auto side 
        this.targetText = this.add.text(360, 340, `Set to: ${this.targetTemp1}°`, {
            fontSize: "20px",
            fill: "#fff",
            fontStyle: "bold"
        }).setOrigin(0.5, 0.5);

        //Display the goal temps test - A.C. side 
        this.targetText = this.add.text(920, 340, `Set to: ${this.targetTemp2}°`, {
            fontSize: "20px",
            fill: "#fff",
            fontStyle: "bold"
        }).setOrigin(0.5, 0.5);

        // Ensure the text appears in front of the background
        this.targetText.setDepth(1);

    }

    checkTemperatureMatch() {
        // Check if the knobs match the required temperatures
        if (
            this.temperatures1[this.knobFrame1] === this.targetTemp1 &&
            this.temperatures2[this.knobFrame2] === this.targetTemp2
        ) {
            this.targetText = this.add.text(640, 360, `Correct! Patience +20`, {
                fontSize: "22px",
                fill: "#fff",
                fontStyle: "bold"
            }).setOrigin(0.5, 0.5);
            //this.targetText.setText("Correct! Patience +20");

            // Reward patience & exit game after a short delay
            this.parentScene.rewardPatience(20);
            this.time.delayedCall(1000, () => this.exitMiniGame(), [], this);
        }
    }

    changeTemperature(direction, knob) {
        let newFrame, knobFrame, temperatures, knobSprite, tempText;

        if (knob === 1) {
            newFrame = this.knobFrame1;
            knobFrame = "knobFrame1";
            temperatures = this.temperatures1;
            knobSprite = this.knob1;
            tempText = this.tempText1;
        } else {
            newFrame = this.knobFrame2;
            knobFrame = "knobFrame2";
            temperatures = this.temperatures2;
            knobSprite = this.knob2;
            tempText = this.tempText2;
        }

        if (direction === "right") {
            if (newFrame >= 0 && newFrame < 4) {
                newFrame += 1; // Move right (0 → 1 → 2 → 3 → 4)
            } else if (newFrame === 5) {
                newFrame = 0; // Only Frame 5 goes back to 0 when clicking right
            } else if (newFrame > 5 && newFrame <= 8) {
                newFrame -= 1; // Move right from 8 → 7 → 6 → 5 (decrementing cooling)
            }
        }
        else if (direction === "left") {
            if (newFrame > 0 && newFrame <= 4) {
                newFrame -= 1; // Move left (4 → 3 → 2 → 1 → 0)
            } else if (newFrame === 0) {
                newFrame = 5; // Jump to frame 5 when cooling starts
            } else if (newFrame >= 5 && newFrame < 8) {
                newFrame += 1; // Move left (5 → 6 → 7 → 8)
            }
        }

        // Ensure the new frame is within bounds (0-8)
        if (newFrame !== this[knobFrame] && newFrame >= 0 && newFrame <= 8) {
            this[knobFrame] = newFrame;
            knobSprite.setFrame(newFrame);
            tempText.setText(`${temperatures[newFrame]}°`);

            // Check if both knobs are correctly set
            this.checkTemperatureMatch();
        }
    }

    exitMiniGame() {
        this.scene.stop();
        this.parentScene.resumeGame();
    }
}
