class MiniGame2 extends Phaser.Scene {
    constructor() {
        super("MiniGameScene2");
        this.radioSettings = ["AM", "FM", "AUX"]; // Available radio channels
        this.currentSettingIndex = 0; // Start at AM
        this.targetChannel = null; // The correct channel to find
    }

    init(data) {
        this.parentScene = data.parentScene;
    }

    create() {
        // Add a background image for the mini-game
        this.overlay = this.add.image(640, 360, "minigameBg").setOrigin(0.5, 0.5);
        this.overlay = this.add.image(640, 360, "minigame2").setOrigin(0.5, 0.5);
        // Create first knob (Knob_Sprite.png)
        this.knob1 = this.add.sprite(640, 360, "knob", this.knobFrame1).setOrigin(0.5, 0.5);

        // Create second knob (Knob_Sprite2.png)
        this.knob2 = this.add.sprite(640, 360, "knob2", this.knobFrame2).setOrigin(0.5, 0.5);
        this.overlay.setScale(0.9); // Scale it properly to fit the screen

        // Create interactive hitboxes for channel selection
        this.createChannelHitboxes();

        // Start the radio tuning event
        this.startRadioTuningEvent();
    }

    createChannelHitboxes() {
        const baseY = 400; // Move up so hitboxes fit inside the minigameBg
        const spacing = 60; // Space them properly

        this.radioSettings.forEach((channel, index) => {
            let yPos = baseY + index * spacing;

            // Create an interactive hitbox for each channel
            let hitbox = this.add.rectangle(640, yPos, 180, 40, 0x0000ff, 0.5)
                .setInteractive()
                .on("pointerdown", () => this.selectChannel(channel));

            // Add the channel text label
            this.add.text(640, yPos, channel, {
                fontSize: "20px",
                fill: "#ffffff"
            }).setOrigin(0.5);
        });
    }

    startRadioTuningEvent() {
        // Randomly select the correct channel
        this.targetChannel = Phaser.Utils.Array.GetRandom(this.radioSettings);

        // Define background dimensions
        let bgWidth = 280; // Adjust width to fit the text
        let bgHeight = 50; // Adjust height for better visibility

        // Create a black background for the text
        this.targetTextBg = this.add.rectangle(640, 100, bgWidth, bgHeight, 0x000000, 0.7)
            .setOrigin(0.5); // Center the background

        // Display the objective text
        this.targetText = this.add.text(640, 100, `Tune to: ${this.targetChannel}`, {
            fontSize: "24px",
            fill: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        // Ensure text appears in front of the background
        this.targetText.setDepth(1);

    }

    selectChannel(channel) {
        if (channel === this.targetChannel) {
            this.targetText.setText("Correct channel! Rage -20");
            this.parentScene.rageReward(20); // Reward the player
            this.time.delayedCall(1000, () => this.exitMiniGame(), [], this);
        } else {
            this.targetText.setText("Static detected! Try another channel.");
        }
    }

    exitMiniGame() {
        this.scene.stop();
        this.parentScene.resumeGame();
        if (this.parentScene.patienceBar.value === 0 && this.parentScene.rageBar.value < this.parentScene.rageBar.maxValue) {
            this.parentScene.startRageIncrease();
        }
    }
}
