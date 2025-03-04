class MeterBar {
    constructor(scene, x, y, width, height, color, startValue = 100) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.maxValue = 100;

        // Create the background bar (gray)
        this.bgBar = scene.add.rectangle(x, y, width, height, 0x555555).setOrigin(0, 0.5);

        // Create the fill bar (dynamic)
        this.fillBar = scene.add.rectangle(x, y, width * (startValue / this.maxValue), height, color).setOrigin(0, 0.5);

        this.value = startValue; // Set initial value
    }

    // Decrease bar value
    decrease(amount) {
        this.value = Math.max(0, this.value - amount);
        this.updateBar();
    }

    // Increase bar value
    increase(amount) {
        this.value = Math.min(this.maxValue, this.value + amount);
        this.updateBar();
    }

    // Update the bar visually
    updateBar() {
        let fillWidth = (this.value / this.maxValue) * this.width;
        this.fillBar.width = fillWidth;
    }
}