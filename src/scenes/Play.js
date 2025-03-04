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
        if (!this.patienceTween || !this.patienceTween.isPlaying()) {
            this.patienceTween = this.smoothDecrease(this.patienceBar, 0, 20000);
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
    
        return this.patienceTween;
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
        // Slow down the decrease rate instead of pausing
        if (this.patienceTween && this.patienceTween.isPlaying()) {
            this.patienceTween.timeScale = 0.3; // 30% of original speed
        }

        // Slow down rage increase if active
        if (this.rageTween && this.rageTween.isPlaying()) {
            this.rageTween.timeScale = 0.3;
        }
    
        this.scene.launch("MiniGameScene", { parentScene: this });
    }
    
    resumeGame() {
        // Restore normal speed after mini-game
        if (this.patienceTween) {
            this.patienceTween.timeScale = 1.0; // Back to normal speed
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
        let remainingDuration = patiencePercentageLeft * 10000;

        this.time.delayedCall(2000, () => {
            this.patienceTween = this.smoothDecrease(this.patienceBar, 0, remainingDuration);
        });
    }
}
