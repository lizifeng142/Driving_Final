class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // Create patience and rage bars
        this.patienceBar = new MeterBar(this, 50, 50, 200, 20, 0x00ff00, 100);
        this.rageBar = new MeterBar(this, 50, 80, 200, 20, 0xff0000, 0);

        // Start smooth decrease of patience over 20 seconds
        this.startPatienceDecrease();

        // Mini-game button
        this.miniGameButton = this.add.text(800, 600, "Start Mini-Game", { fontSize: "24px", fill: "#fff" })
            .setInteractive()
            .on("pointerdown", () => this.startMiniGame());
    }

    startPatienceDecrease() {
        // If patienceTween does not exist or has finished, create a new one
        if (!this.patienceTween || !this.patienceTween.isPlaying()) {
            this.patienceTween = this.smoothDecrease(this.patienceBar, 0, 10000);
        }
    }

    smoothDecrease(bar, targetValue, duration) {
        if (this.patienceTween) {
            this.patienceTween.stop(); // Stop any existing tween
        }
    
        this.patienceTween = this.tweens.add({
            targets: bar,
            value: targetValue,
            duration: duration,
            ease: "Linear",
            onUpdate: () => {
                bar.updateBar();
                if (bar.value === 0 && this.rageBar.value < 100) {
                    this.startRageIncrease(); // Start increasing rage when patience is gone
                } else {
                    this.stopRageIncrease(); // Stop rage increase when patience is not empty
                }
            }
        });
    
        return this.patienceTween; // Ensure the tween is assigned properly
    }

    startRageIncrease() {
        if (!this.rageTween || !this.rageTween.isPlaying()) {
            this.rageTween = this.smoothIncrease(this.rageBar, 100, 10000);
        }
    }

    stopRageIncrease() {
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
            }
        });
    }

    startMiniGame() {
        // Ensure the patienceTween exists and is playing before pausing
        if (this.patienceTween && this.patienceTween.isPlaying()) {
            this.patienceTween.pause();
        }

        // Pause the rage tween if it's running
        if (this.rageTween && this.rageTween.isPlaying()) {
            this.rageTween.pause();
        }
    
        this.scene.pause();
        this.scene.launch("MiniGameScene", { parentScene: this });
    }
    
    resumeGame() {
        // Ensure the patienceTween exists and is paused before resuming
        if (this.patienceTween && this.patienceTween.isPaused()) {
            this.patienceTween.resume();
        }

        // Resume the rage tween if it's paused
        if (this.rageTween && this.rageTween.isPaused()) {
            this.rageTween.resume();
        }
    
        this.scene.resume();
    }
    

    rewardPatience(amount) {
        // Check if the bar is already full
        if (this.patienceBar.value >= this.patienceBar.maxValue) {
            console.log("Patience is already full! No need to increase.");
            return; // Exit function early
        }
    
        // Stop any active patience decrease to prevent conflicts
        if (this.patienceTween) {
            this.patienceTween.stop();
        }
    
        // Stop the rage increase since patience is rewarded
        this.stopRageIncrease();
    
        // Ensure patience does not exceed the max value
        let newPatienceValue = Math.min(this.patienceBar.value + amount, this.patienceBar.maxValue);
    
        // Smoothly increase patience
        this.patienceBar.increase(newPatienceValue - this.patienceBar.value, 1000);
    
        // Calculate the remaining duration for decrease
        let patiencePercentageLeft = newPatienceValue / this.patienceBar.maxValue;
        let remainingDuration = patiencePercentageLeft * 10000; // Adjusted decrease time
    
        // Restart patience decrease after a delay with adjusted speed
        this.time.delayedCall(2000, () => {
            this.patienceTween = this.smoothDecrease(this.patienceBar, 0, remainingDuration);
        });
    }
}    
