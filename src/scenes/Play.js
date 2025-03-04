class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // Create patience and rage bars
        this.patienceBar = new MeterBar(this, 50, 50, 200, 20, 0x00ff00, 100); // Green patience bar (starts at 100)
        this.rageBar = new MeterBar(this, 50, 80, 200, 20, 0xff0000, 0); // Red rage bar (starts at 0)

        this.timeElapsed = 0;

        // Start updating the bars
        this.timer = this.time.addEvent({
            delay: 1000, // Every second
            callback: this.updateBars,
            callbackScope: this,
            loop: true
        });
    }

    updateBars() {
        // Decrease patience over time
        if (this.patienceBar.value > 0) {
            this.patienceBar.decrease(5);
        } else if (this.rageBar.value < 100) {
            // If patience is 0, increase rage
            this.rageBar.increase(5);
        }
    }
}