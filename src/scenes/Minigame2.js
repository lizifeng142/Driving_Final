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
        // first rendition - this.overlay = this.add.image(640, 360, "minigameBg").setOrigin(0.5, 0.5);

        this.overlay = this.add.image(640, 360, "newMinigameBG").setOrigin(0.5, 0.5);
        
        //this.overlay = this.add.image(640, 360, "minigame2").setOrigin(0.5, 0.5);
        this.overlay = this.add.image(640, 360, "newMinigameRadio").setOrigin(0.5, 0.5);

        // Create first knob (Knob_Sprite.png)
        //this.knob1 = this.add.sprite(640, 360, "knob", this.knobFrame1).setOrigin(0.5, 0.5);
        this.knob1 = this.add.sprite(640, 360, "AUTOKnob", this.knobFrame1).setOrigin(0.5, 0.5);

        // Create second knob (Knob_Sprite2.png)
        //this.knob2 = this.add.sprite(640, 360, "knob2", this.knobFrame2).setOrigin(0.5, 0.5);
        this.knob2 = this.add.sprite(640, 360, "ACKnob", this.knobFrame2).setOrigin(0.5, 0.5);
        
        this.overlay.setScale(0.9); // Scale it properly to fit the screen

        // Create interactive hitboxes for channel selection
        this.createChannelHitboxes();

        // Start the radio tuning event
        this.startRadioTuningEvent();
    }

    createChannelHitboxes() {
        // Define exact positions for each button on the radio interface
        const hitboxes = [
            { channel: "AM", x: 520, y: 405, width: 100, height: 50 },   // AM Button
            { channel: "FM", x: 770, y: 410, width: 100, height: 50 },   // FM Button
            { channel: "AUX", x: 770, y: 470, width: 100, height: 50 },  // AUX Button
            { channel: "UP", x: 0, y: 300, width: 100, height: 50 },    // Up Arrow Button
            { channel: "DOWN", x: 0, y: 440, width: 100, height: 50 }   // Down Arrow Button
        ];
    
        hitboxes.forEach(({ channel, x, y, width, height }) => {
            // Create an interactive hitbox
            let hitbox = this.add.rectangle(x, y, width, height, 0xffffff, 0.5)
                .setOrigin(0.5)
                .setInteractive()
                .on("pointerdown", () => this.selectChannel(channel));
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
        this.targetText = this.add.text(640, 200, `Tune to: ${this.targetChannel}`, {
            fontSize: "24px",
            fill: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        // Ensure text appears in front of the background
        this.targetText.setDepth(1);

    }

    selectChannel(channel) {
        if (channel === this.targetChannel) {
            this.targetText = this.add.text(640, 350, "Correct channel! Rage -20", {
                fontSize: "22px",
                fill: "#fff",
                fontStyle: "bold"
            }).setOrigin(0.5, 0.5);
            //this.targetText.setText("Correct channel! Rage -20");
            this.parentScene.rageReward(20); // Reward the player
            this.time.delayedCall(1000, () => this.exitMiniGame(), [], this);
        } else {
            this.targetText = this.add.text(640, 540, "Static detected! Try another channel.", {
                fontSize: "22px",
                fill: "#fff",
                fontStyle: "bold"
            }).setOrigin(0.5, 0.5);
            //this.targetText.setText("Static detected! Try another channel.");
        }
    }


    /*this.targetText = this.add.text(640, 340, `Correct! Patience +20`, {
        fontSize: "22px",
        fill: "#fff",
        fontStyle: "bold"
    }).setOrigin(0.5, 0.5);
    */
    
    exitMiniGame() {
        this.scene.stop();
        this.parentScene.resumeGame();
        if (this.parentScene.patienceBar.value === 0 && this.parentScene.rageBar.value < this.parentScene.rageBar.maxValue) {
            this.parentScene.startRageIncrease();
        }
    }
}
