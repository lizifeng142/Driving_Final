class MeterBar {
    constructor(scene, x, y, width, height, color, startValue = 100) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.maxValue = 100;

        // Background bar (gray)
        this.bgBar = scene.add.rectangle(x, y, width, height, 0x555555).setOrigin(0, 0.5);

        // Fill bar (color)
        this.fillBar = scene.add.rectangle(x, y, width, height, color).setOrigin(0, 0.5);

        this.value = startValue;
        this.fillBar.scaleX = this.value / this.maxValue; // Initialize scale

        this.tween = null; // Store the tween reference
    }

    // Smoothly decrease bar value
    decrease(amount, duration = 1000) {
        let newValue = Math.max(0, this.value - amount);
        this.tween = this.scene.tweens.add({
            targets: this,
            value: newValue,
            duration: duration,
            ease: "Linear",
            onUpdate: () => this.updateBar()
        });
    }

    // Smoothly increase bar value
    increase(amount, duration = 1000) {
        let newValue = Math.min(this.maxValue, this.value + amount);
        this.tween = this.scene.tweens.add({
            targets: this,
            value: newValue,
            duration: duration,
            ease: "Linear",
            onUpdate: () => this.updateBar()
        });
    }

    // Pause the tween (when mini-game starts)
    pause() {
        if (this.tween) {
            this.tween.pause();
        }
    }

    // Resume the tween (when mini-game ends)
    resume() {
        if (this.tween) {
            this.tween.resume();
        }
    }

    // Update the visual bar
    updateBar() {
        this.fillBar.scaleX = this.value / this.maxValue;
    }
}
