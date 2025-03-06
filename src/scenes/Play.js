class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
       
        // Adding the animated sprites as the backgrounds - sky 
        this.clouds = this.add.sprite(640, 380, "sky").setOrigin(0.5, 0.5)

        // Adding animation for background 
        this.anims.create({
            key: "cloudAnim", 
            frames: this.anims.generateFrameNumbers("sky", {start: 0, end: 5}), 
            frameRate: 2,
            repeat: -1
        })

        // Adding the animated sprites as the backgrounds - road
        this.roads = this.add.sprite(640, 380, "road").setOrigin(0.5, 0.5)

        // Adding animation for background 
        this.anims.create({
            key: "roadAnim", 
            frames: this.anims.generateFrameNumbers("road", {start: 0, end: 1}), 
            frameRate: 3,
            repeat: -1
        })

        // Adding the animated sprites as the backgrounds - tree
        this.trees = this.add.sprite(640, 380, "tree").setOrigin(0.5, 0.5)

        // Adding animation for background 
        this.anims.create({
            key: "treesAnim", 
            frames: this.anims.generateFrameNumbers("tree", {start: 0, end: 2}), 
            frameRate: 6,
            repeat: -1
        })

        // Adding the animated sprites as the backgrounds - bus
        this.bus = this.add.sprite(640, 380, "bus").setOrigin(0.5, 0.5)

        // Adding animation for background 
        this.anims.create({
            key: "busAnim", 
            frames: this.anims.generateFrameNumbers("bus", {start: 0, end: 1}), 
            frameRate: 2,
            repeat: -1
        })

        // Adding the animated sprites as the backgrounds - bus
        this.car = this.add.sprite(640, 380, "car").setOrigin(0.5, 0.5)

        // Adding animation for background 
        this.anims.create({
            key: "carAnim", 
            frames: this.anims.generateFrameNumbers("car", {start: 0, end: 1}), 
            frameRate: 2,
            repeat: -1
        })



        // Create patience and rage bars
        this.patienceBar = new MeterBar(this, 50, 50, 200, 20, 0x00ff00, 100);
        this.rageBar = new MeterBar(this, 50, 80, 200, 20, 0xff0000, 0);

        // Start smooth decrease of patience over 20 seconds
        this.startPatienceDecrease();

        //Mini-game button 
        this.miniGameButton = this.add.text(800, 600, "Start Mini-Game", { fontSize: "24px", fill: "#fff" })
            .setInteractive()
            .on("pointerdown", () => this.startMiniGame());


        // playing animation, test? 
        this.clouds.play("cloudAnim")
        this.roads.play("roadAnim")
        this.trees.play("treesAnim")
        this.bus.play("busAnim")
        this.car.play("carAnim")

         
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
            this.patienceTween.timeScale = 0.3; // Back to normal speed
        }

        if (this.rageTween) {
            this.rageTween.timeScale = 0.3;
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
        let remainingDuration = patiencePercentageLeft * 20000; // Ensures consistent speed
    
        this.time.delayedCall(2000, () => {
            this.patienceTween = this.smoothDecrease(this.patienceBar, 0, remainingDuration);
            this.patienceTween.timeScale = 1.0;  // Reset timeScale to normal
        });
    }
}
