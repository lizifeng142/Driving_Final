class EventManager extends Phaser.Scene {
    constructor() {
        super("EventManagerScene");
        this.currentEvent = null; // Stores the active event
        this.eventActive = false; // Flag to prevent new events while one is active
        this.eventCount = 0; // Tracks how many events have triggered
        this.patienceDepleted = false; // Tracks if patience has ever hit 0
    }

    create() {
        // Event Text (Displays the scenario)
        this.eventText = this.add.text(640, 100, "Waiting for an event...", {
            fontSize: "24px",
            fill: "#fff",
            backgroundColor: "#00000080"
        }).setOrigin(0.5);

        this.currentEvent = null;
        this.eventActive = false;
        this.eventCount = 0;
        this.patienceDepleted = false;

        // Generate a new event after 3 seconds
        this.scheduleNextEvent();
    }

    scheduleNextEvent() {
        if (!this.eventActive) {
            this.time.delayedCall(3000, () => this.triggerRandomEvent(), [], this);
        }
    }

    unlockAllEvents() {
        this.patienceDepleted = true; // Set flag so all events are available
    }

    triggerRandomEvent() {
        if (this.eventActive) return; // Prevents triggering a new event if one is ongoing

        let miniGameEvents = [
            { text: "It's too hot in here! The heat is unbearable!", miniGame: "MiniGameScene" },
            { text: "It's freezing! I can't feel my hands!", miniGame: "MiniGameScene" },
            { text: "The air feels stuffy, it's making me uncomfortable.", miniGame: "MiniGameScene" }
        ];

        let allEvents = [
        { text: "The music is too loud! It's giving me a headache!", miniGame: "MiniGameScene2", isStatic: true },
        { text: "Ugh! The static is killing me! It’s so annoying!", miniGame: "MiniGameScene2", isStatic: true },
        { text: "The radio is full of static... I can't hear anything clearly.", miniGame: "MiniGameScene2", isStatic: true }
        ];

        let eventPool;

        // Before patience hits 0, only allow "miniGameEvents"
        if (!this.patienceDepleted) {
            eventPool = miniGameEvents;
        } else {
            eventPool = [...miniGameEvents, ...allEvents]; // Unlock all events after patience depletion
        }

        // Pick a random valid event
        this.currentEvent = Phaser.Utils.Array.GetRandom(eventPool);
        this.eventActive = true; // Mark event as active
        this.eventCount++; // Increase event count

        if (this.currentEvent.isStatic) {
            this.scene.get("playScene").playStaticSound();
        }

        // Display the event
        this.eventText.setText(this.currentEvent.text).setVisible(true);
    }

    getActiveMiniGame() {
        return this.currentEvent ? this.currentEvent.miniGame : null;
    }

    handleMiniGameStart() {
        this.eventText.setVisible(false);
    }

    handleMiniGameEnd() {
        this.eventText.setVisible(false);
        this.currentEvent = null;
        this.eventActive = false;
        this.scheduleNextEvent();
    
        // Stop mini-games to prevent carryover
        this.scene.stop("MiniGameScene");
        this.scene.stop("MiniGameScene2");
    
        // Resume background music after event
        if (this.scene.get("playScene")) {
            this.scene.get("playScene").resumeBackgroundMusic();
        }
    }    
}
