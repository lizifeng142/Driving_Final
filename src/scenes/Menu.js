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
        this.bus.play("menu_titleBus");
        this.car.play("menu_titleCar");

        // placeholder text - will input font 

        let twoLook = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: 'black',
            align: 'center',
        }
    

        // Add a start button
        let startButton = this.add.text(820, 590, 'Start Game', twoLook)
            .setOrigin(0.5)
            .setInteractive();
            
        startButton.on('pointerdown', () => {
            this.scene.start('playScene');
        });




        //
    }
}