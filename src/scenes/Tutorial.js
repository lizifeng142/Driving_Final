class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    create(data) {

        console.log("credit scene has loaded")
        
        this.add.image(640, 380, "tutorialPage");

    
        // Main Menu Button
        let menuButton = this.add.text(1145, 630, "Main Menu", {
            fontSize: "28px",
            fontStyle: "bold",
            fill: "#1c1815",
            padding: { x: 15, y: 5 }
        }).setOrigin(0.5).setInteractive();
    
        menuButton.on("pointerdown", () => {
            console.log("Main Menu button clicked!");  // Debugging
            this.scene.start("menuScene"); // Go back to the Main Menu
        });

        // Add a start button
        let StartButton = this.add.text(1145, 470, 'Start Game', {
            fontSize: "28px",
            fontStyle: "bold",
            fill: "#1c1815",
            padding: { x: 15, y: 5 }
        })
            .setOrigin(0.5)
            .setInteractive();

        StartButton.on('pointerdown', () => {
            this.scene.start('playScene');
        });


    
        }
    }
