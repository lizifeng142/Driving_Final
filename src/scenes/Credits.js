class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    create(data) {

        console.log("credit scene has loaded")
        // Adding the animated sprites as the backgrounds - sky 
        this.clouds = this.add.sprite(640, 380, "sky").setOrigin(0.5, 0.5);
    
        // Adding animation for background 
        this.anims.create({
            key: "credits_cloudAnim",
            frames: this.anims.generateFrameNumbers("sky", { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1
        })

        // Adding the animated sprites as the backgrounds - road
        this.roads = this.add.sprite(640, 380, "road").setOrigin(0.5, 0.5);
        
        // Adding animation for background 
        this.anims.create({
            key: "credits_roadAnim",
            frames: this.anims.generateFrameNumbers("road", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        })

        // Adding the animated sprites as the backgrounds - bus w game title
        this.trees = this.add.sprite(640, 380, "treesAnim").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "credits_treesAnim",
            frames: this.anims.generateFrameNumbers("tree", { start: 0, end: 2 }),
            frameRate: 18,
            repeat: -1
        })


        // Adding the animated sprites as the backgrounds - bus w game title
        this.bus = this.add.sprite(640, 380, "busBlank").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "credits_busAnim",
            frames: this.anims.generateFrameNumbers("busBlank", { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        })

        // Adding the animated sprites as the backgrounds - car
        this.car = this.add.sprite(640, 380, "titleCar").setOrigin(0.5, 0.5);

        // Adding animation for background - car with scenes 
        this.anims.create({
            key: "credits_carAnim",
            frames: this.anims.generateFrameNumbers("titleCar", { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        })

        // playing animation, test? 
        this.clouds.play("credits_cloudAnim")
        this.roads.play("credits_roadAnim")
        this.trees.play("credits_treesAnim")
        this.bus.play("credits_busBlank")
        this.car.play("credits_carAnim")
    
        // Display "Credits" text
        this.add.text(740, 150, "Credits", {
            fontSize: "44px",
            fontStyle: "bold",
            fill: "#000000"
        }).setOrigin(0.5);

        this.add.text(740, 180, "Programming:", {
            fontSize: "26px",
            fontStyle: "bold",
            fill: "#000000"
        }).setOrigin(0.5);

        this.add.text(740, 205, "Calvin Li & Ruby Hirsch", {
            fontSize: "18px",
            fontStyle: "bold",
            fill: "#000000"
        }).setOrigin(0.5);

        this.add.text(740, 380, "Art:", {
            fontSize: "26px",
            fontStyle: "bold",
            fill: "#000000"
        }).setOrigin(0.5);

        // Retrieve last score (fix error)
        let lastScore = data.lastScore || 0
    
        // Convert to MM:SS format
        let minutes = Math.floor(lastScore / 60)
        let seconds = lastScore % 60
        let formattedLastScore = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    
        // Display "Your Time: MM:SS" on the Game Over screen
        this.add.text(640, 320, `Your Time: ${formattedLastScore}`, {
            fontSize: "35px",
            fontStyle: "bold",
            fill: "#FF4500",  // Orange-Red color for visibility
            stroke: "#000000", // Black outline for contrast
            strokeThickness: 4
        }).setOrigin(0.5, 0.5)
    
        // Restart Button
        let restartButton = this.add.text(640, 400, "Restart Game", {
            fontSize: "28px",
            fontStyle: "bold",
            fill: "#FFFFFF",
            backgroundColor: "#228B22", // Green button
            padding: { x: 15, y: 5 }
        }).setOrigin(0.5).setInteractive()
    
        restartButton.on("pointerdown", () => {
            this.scene.start("playScene"); // Restart the game
        })
    
        // Main Menu Button
        let menuButton = this.add.text(640, 500, "Main Menu", {
            fontSize: "28px",
            fontStyle: "bold",
            fill: "#FFFFFF",
            backgroundColor: "#0000FF",  // Blue button
            padding: { x: 15, y: 5 }
        }).setOrigin(0.5).setInteractive();
    
        menuButton.on("pointerdown", () => {
            console.log("Main Menu button clicked!");  // Debugging
            this.scene.start("menuScene"); // Go back to the Main Menu
        });
    
        }
    }


/*

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {



        // Adding the animated sprites as the backgrounds - sky 
        this.clouds = this.add.sprite(640, 380, "sky").setOrigin(0.5, 0.5);

        this.anims.create({
            key: "menu_cloudAnim",
            frames: this.anims.generateFrameNumbers("sky", { start: 0, end: 5 }),
            frameRate: 2,
            repeat: -1
        });

        // Adding the animated sprites as the backgrounds - road
        this.roads = this.add.sprite(640, 380, "road").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "menu_roadAnim",
            frames: this.anims.generateFrameNumbers("road", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        // Adding the animated sprites as the backgrounds - tree
        this.trees = this.add.sprite(640, 380, "tree").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "menu_treesAnim",
            frames: this.anims.generateFrameNumbers("tree", { start: 0, end: 2 }),
            frameRate: 18,
            repeat: -1
        });

        // Adding the animated sprites as the backgrounds - bus w game title
        this.bus = this.add.sprite(640, 380, "titleBus").setOrigin(0.5, 0.5);

        // Adding animation for background 
        this.anims.create({
            key: "menu_busAnim",
            frames: this.anims.generateFrameNumbers("titleBus", { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        // Adding the animated sprites as the backgrounds - car
        this.car = this.add.sprite(640, 380, "titleCar").setOrigin(0.5, 0.5);

        // Adding animation for background - car with scenes 
        this.anims.create({
            key: "menu_carAnim",
            frames: this.anims.generateFrameNumbers("titleCar", { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });

        // playing animation, test? 
        this.clouds.play("menu_cloudAnim");
        this.roads.play("menu_roadAnim");
        this.trees.play("menu_treesAnim");
        this.bus.play("menu_busAnim");
        this.car.play("menu_carAnim");

        // placeholder text - will input font 

        let twoLook = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: 'black',
            align: 'center',
        }

        let savedHighScore = parseInt(localStorage.getItem("highScore")) || 0;
        let minutes = Math.floor(savedHighScore / 60);
        let seconds = savedHighScore % 60;
        let formattedHighScore = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Display High Score on the menu with bold and improved visibility
        this.add.text(150, 35, `Best Time: ${formattedHighScore}`, {
            fontSize: "30px",       
            fontStyle: "bold",     
            fill: "#00FFFF",        
            stroke: "#000000",   
            strokeThickness: 4,     
        }).setOrigin(0.5, 0.5);

        // Add a start button
        let startButton = this.add.text(820, 590, 'Start Game', twoLook)
            .setOrigin(0.5)
            .setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('playScene');
        });

    }
}

*/