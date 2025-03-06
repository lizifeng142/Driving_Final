class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // **Start the EventManager (added)**
        this.scene.launch("EventManagerScene");

        // Adding the animated sprites as the backgrounds - sky 
        this.clouds = this.add.sprite(640, 380, "sky").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "cloudAnim",
            frames: this.anims.generateFrameNumbers("sky", { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1
        });

        // Adding the animated sprites as the backgrounds - road
        this.roads = this.add.sprite(640, 380, "road").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "roadAnim",
            frames: this.anims.generateFrameNumbers("road", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        // Adding the animated sprites as the backgrounds - tree
        this.trees = this.add.sprite(640, 380, "tree").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "treesAnim",
            frames: this.anims.generateFrameNumbers("tree", { start: 0, end: 2 }),
            frameRate: 18,
            repeat: -1
        });

        // Adding the animated sprites as the backgrounds - bus
        this.bus = this.add.sprite(640, 380, "bus").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "busAnim",
            frames: this.anims.generateFrameNumbers("bus", { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        // Adding the animated sprites as the backgrounds - car
        this.car = this.add.sprite(640, 380, "car").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "carAnim",
            frames: this.anims.generateFrameNumbers("car", { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });

        // Create patience and rage bars
        this.patienceBar = new MeterBar(this, 50, 50, 200, 20, 0x00ff00, 100);
        this.rageBar = new MeterBar(this, 50, 80, 200, 20, 0xff0000, 0);

        // Start smooth decrease of patience over 20 seconds
        this.startPatienceDecrease();

        // Create the image (non-interactive)
        this.miniGameButton = this.add.image(640, 380, "startMiniGame").setOrigin(0.5).setScale(1);

        // Define hitbox size & position (Adjust X, Y, width, height)
        let hitboxX = 820;  // X position (adjust as needed)
        let hitboxY = 620;  // Y position (adjust as needed)
        let hitboxWidth = 300;  // Adjust width
        let hitboxHeight = 175;  // Adjust height

        // Create a visible hitbox (DEBUG: Use red color with 50% transparency)
        this.miniGameHitbox = this.add.rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight, 0xff0000, 0.0)
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => this.startMiniGame());

        // playing animation, test? 
        this.clouds.play("cloudAnim");
        this.roads.play("roadAnim");
        this.trees.play("treesAnim");
        this.bus.play("busAnim");
        this.car.play("carAnim");
    }

    startMiniGame() {
        let eventManager = this.scene.get("EventManagerScene");
        let selectedMiniGame = eventManager.getActiveMiniGame();

        if (selectedMiniGame) {
            eventManager.handleMiniGameStart(); // Hide event text
            this.scene.launch(selectedMiniGame, { parentScene: this });
        }
    }

    startPatienceDecrease() {
        if (!this.patienceTween || !this.patienceTween.isPlaying()) {
            this.patienceTween = this.smoothDecrease(this.patienceBar, 0, 20000);
        }
    }

    stopPatienceDecrease() {
        if (this.patienceTween) {
            this.patienceTween.stop();
        }
    }


    smoothDecrease(bar, targetValue, duration) {
        if (bar === this.patienceBar && this.patienceTween) {
            this.patienceTween.stop();
        }
        if (bar === this.rageBar && this.rageTween) {
            this.rageTween.stop();
        }

        return this.tweens.add({
            targets: bar,
            value: targetValue,
            duration: duration,
            ease: "Linear",
            onUpdate: () => {
                bar.updateBar();

                if (bar === this.patienceBar) {
                    if (bar.value === 0) {
                        if (this.rageBar.value < this.rageBar.maxValue && !this.rageIncreasing) {
                            console.log("Patience hit 0, ensuring rage continues increasing.");
                            this.rageIncreasing = true; // Prevent multiple triggers
                            this.startRageIncrease();
                        }

                        // ✅ Unlock all events when patience first hits 0
                        if (!this.patienceDepleted) {
                            console.log("Patience has reached 0! Unlocking all events.");
                            this.patienceDepleted = true;
                            this.scene.get("EventManagerScene").unlockAllEvents(); // Notify EventManager
                        }
                    }
                }

                // ✅ Prevent rage from automatically resetting if patience drains again
                if (bar === this.rageBar && bar.value === 0) {
                    console.log("Rage hit 0, stopping decrease but not resetting.");
                    this.stopRageDecrease();
                }
            },
            onComplete: () => {
                if (bar === this.patienceBar && bar.value === 0) {
                    console.log("Patience fully depleted again, allowing rage increase to continue.");
                    this.rageIncreasing = false; // Allow rage increase to continue
                }
            }
        });
    }


    startRageIncrease() {
        if (this.rageTween) {
            this.rageTween.stop();
            this.rageTween = null;
        }

        // Check if rage is at max before increasing
        if (this.rageBar.value >= this.rageBar.maxValue) {
            this.triggerGameOver();
            return;
        }

        console.log("Starting Rage Increase...");
        this.rageTween = this.smoothIncrease(this.rageBar, this.rageBar.maxValue, 20000);
    }

    triggerGameOver() {
        console.log("GAME OVER TRIGGERED: Rage hit 100!");
        this.scene.start("GameOverScene");
    }



    stopRageIncrease() {
        if (this.rageTween) {
            this.rageTween.stop();
        }
    }

    stopRageDecrease() {
        if (this.rageTween) {
            this.rageTween.stop();
        }
    }

    smoothIncrease(bar, targetValue, duration) {
        return this.tweens.add({
            targets: bar,
            value: targetValue,
            duration: duration,
            ease: "Linear",
            onUpdate: () => {
                bar.updateBar();
                console.log(`Rage Bar Updating: ${bar.value}`); // Debugging

                if (bar === this.rageBar && bar.value >= bar.maxValue) {
                    console.log("Rage Bar reached max, triggering game over.");
                    this.triggerGameOver();
                }
            }
        });
    }



    resumeGame() {
        let eventManager = this.scene.get("EventManagerScene");
        eventManager.handleMiniGameEnd(); // Show event text & allow new events

        if (this.patienceTween) {
            this.patienceTween.timeScale = 1.0;
        }
        if (this.rageTween) {
            this.rageTween.timeScale = 1.0;
        }
    }

    rewardPatience(amount) {
        if (this.patienceBar.value >= this.patienceBar.maxValue) {
            console.log("Patience is already full! No need to increase.");
            return;
        }

        if (this.patienceTween) {
            this.patienceTween.stop();
        }

        this.stopRageIncrease();

        let newPatienceValue = Math.min(this.patienceBar.value + amount, this.patienceBar.maxValue);
        this.patienceBar.increase(newPatienceValue - this.patienceBar.value, 1000);

        let patiencePercentageLeft = newPatienceValue / this.patienceBar.maxValue;
        let remainingDuration = patiencePercentageLeft * 20000;

        this.time.delayedCall(2000, () => {
            this.patienceTween = this.smoothDecrease(this.patienceBar, 0, remainingDuration);
            this.patienceTween.timeScale = 1.0;
        });
    }


    rageReward(amount) {
        if (this.rageBar.value === 0) {
            console.log("Rage is already at minimum! No need to decrease.");
            return;
        }

        if (this.rageTween) {
            this.rageTween.stop();
            this.rageTween = null;
        }

        this.stopPatienceDecrease();
        this.stopRageDecrease();

        let newRageValue = Math.max(this.rageBar.value - amount, 0);
        this.rageBar.decrease(amount, 1000);

        this.time.delayedCall(1000, () => {
            if (this.patienceBar.value === 0 && this.rageBar.value < this.rageBar.maxValue) {
                console.log("Restarting rage increase after reward.");
                this.startRageIncrease();
            }
        });

        // Check for Game Over IMMEDIATELY
        if (this.rageBar.value >= this.rageBar.maxValue) {
            this.triggerGameOver();
        }
    }



}
