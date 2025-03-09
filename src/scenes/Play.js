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
        this.patienceBar = new MeterBar(this, 50, 80, 200, 20, 0x00ff00, 100);

        // Patience meter bar text 
        this.tempText1 = this.add.text(170, 50, `PATIENCE METER: `, {
            fontSize: "25px",
            backgroundColor: '#FFFFFF',
            fill: "#1dbf20"
        }).setOrigin(0.5, 0.5);

        this.rageBar = new MeterBar(this, 50, 140, 200, 20, 0xff0000, 0);

        // Patience meter bar text 
        this.tempText1 = this.add.text(140, 110, `RAGE METER: `, {
            fontSize: "25px",
            backgroundColor: '#FFFFFF',
            fill: "#ed1f0c"
        }).setOrigin(0.5, 0.5);

        this.drivingSound = this.sound.add("drivingSound", { loop: true, volume: 0.3 });
        this.backgroundMusic = this.sound.add("backgroundMusic", { loop: true, volume: 0.3 });
        this.staticSound = this.sound.add("staticSound", { loop: true, volume: 0.6 });
        this.drivingSound.play();
        this.backgroundMusic.play();

        this.events.on("shutdown", () => {
            this.drivingSound.stop();
        })

        // Start smooth decrease of patience over 20 seconds
        this.startPatienceDecrease();

        // Create the image (non-interactive)
        this.miniGameButton = this.add.image(640, 380, "startMiniGame").setOrigin(0.5).setScale(1);

        // Define hitbox size & position (Adjust X, Y, width, height)
        let hitboxX = 820;  // X position (adjust as needed)
        let hitboxY = 620;  // Y position (adjust as needed)
        let hitboxWidth = 300;  // Adjust width
        let hitboxHeight = 175;  // Adjust height

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

        this.elapsedTime = 0; // Track elapsed time in seconds

        // Retrieve the saved high score (default to 0 if none exists)
        this.highScore = localStorage.getItem("highScore") || 0;

        // Display the timer
        this.clockText = this.add.text(1070, 590, `00:00`, {
            fontSize: "30px", 
            fontStyle: "bold",
            fill: "#00FF00",
            stroke: "#000000",
            strokeThickness: 4,
        }).setOrigin(0.5, 0.5);

        // Start a timer that updates every second
        this.clockTimer = this.time.addEvent({
            delay: 1000,  // 1 second
            callback: this.updateClock,
            callbackScope: this,
            loop: true
        });


    }

    updateClock() {
        this.elapsedTime += 1;
    
        let minutes = Math.floor(this.elapsedTime / 60);
        let seconds = this.elapsedTime % 60;
    
        // Format to always show two digits (e.g., 01:05)
        let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.clockText.setText(formattedTime);
    }
    

    playStaticSound() {

        // Stop background music and play static
        if (this.backgroundMusic.isPlaying) {
            this.backgroundMusic.pause();
        }
        if (!this.staticSound.isPlaying) {
            this.staticSound.play();
        }
    }

    resumeBackgroundMusic() {

        // Stop static sound and resume background music
        if (this.staticSound.isPlaying) {
            this.staticSound.stop();
        }
        if (this.backgroundMusic.isPaused) {
            this.backgroundMusic.resume();
        }
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
                            this.rageIncreasing = true; // Prevent multiple triggers
                            this.startRageIncrease();
                        }

                        //Unlock all events when patience first hits 0
                        if (!this.patienceDepleted) {
                            this.patienceDepleted = true;
                            this.scene.get("EventManagerScene").unlockAllEvents(); // Notify EventManager
                        }
                    }
                }

                //Prevent rage from automatically resetting if patience drains again
                if (bar === this.rageBar && bar.value === 0) {
                    this.stopRageDecrease();
                }
            },
            onComplete: () => {
                if (bar === this.patienceBar && bar.value === 0) {
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

        this.rageTween = this.smoothIncrease(this.rageBar, this.rageBar.maxValue, 20000);
    }

    triggerGameOver() {
        this.clockTimer.remove(false); // Stop the timer
        
        
        this.scene.start("GameOverScene", { lastScore: this.elapsedTime });
    
        // Check for new high score
        let previousHighScore = parseInt(localStorage.getItem("highScore")) || 0;
        if (this.elapsedTime > previousHighScore) {
            localStorage.setItem("highScore", this.elapsedTime); // Save new high score
        }
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

                if (bar === this.rageBar && bar.value >= bar.maxValue) {
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
                this.startRageIncrease();
            }
        });

        // Check for Game Over IMMEDIATELY
        if (this.rageBar.value >= this.rageBar.maxValue) {
            this.triggerGameOver();
        }
    }



}
