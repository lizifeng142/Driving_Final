class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // Add title text
        this.add.text(640, 360, 'Game Title', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Add a start button
        let startButton = this.add.text(640, 450, 'Start Game', { fontSize: '24px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive();
            
        startButton.on('pointerdown', () => {
            this.scene.start('playScene');
        });
    }
}