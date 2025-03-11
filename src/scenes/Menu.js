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
        let StartButton = this.add.text(820, 590, 'Start Game', twoLook)
            .setOrigin(0.5)
            .setInteractive();

        StartButton.on('pointerdown', () => {
            this.scene.start('playScene');
        });

         // Add a start button
         let CreditsButton = this.add.text(1120, 588, 'Credits Text', twoLook)
         .setOrigin(0.5)
         .setInteractive();

        CreditsButton.on('pointerdown', () => {
            this.scene.start('creditsScene');
        });

    }
}