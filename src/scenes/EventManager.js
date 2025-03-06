class EventManager extends Phaser.Scene {
    constructor() {
        super("EventManagerScene");
        this.currentEvent = null; // Stores the active event
        this.eventActive = false; // Flag to prevent new events while one is active
    }

    create() {
        // Event Text (Displays the scenario)
        this.eventText = this.add.text(640, 100, "Waiting for an event...", {
            fontSize: "24px",
            fill: "#fff",
            backgroundColor: "#00000080" // Adds slight transparency to text background
        }).setOrigin(0.5);

        // Generate a new event after 5 seconds
        this.scheduleNextEvent();
    }

    scheduleNextEvent() {
        if (!this.eventActive) {
            this.time.delayedCall(3000, () => this.triggerRandomEvent(), [], this);
        }
    }

    triggerRandomEvent() {
        if (this.eventActive) return; // Prevents triggering a new event if one is ongoing

        let events = [
            { text: "It's too hot in here!", miniGame: "MiniGameScene" },
            { text: "It's freezing!", miniGame: "MiniGameScene" },
            { text: "The music is too loud!", miniGame: "MiniGameScene" },
            { text: "Ugh! The static is killing me!", miniGame: "MiniGameScene" }
        ];

        // Pick a random event
        this.currentEvent = Phaser.Utils.Array.GetRandom(events);
        this.eventActive = true; // Mark event as active

        // Display the event
        this.eventText.setText(this.currentEvent.text).setVisible(true);
    }

    getActiveMiniGame() {
        return this.currentEvent ? this.currentEvent.miniGame : null;
    }

    handleMiniGameStart() {
        this.eventText.setVisible(false); // Hide text while in mini-game
    }

    handleMiniGameEnd() {
        this.eventText.setVisible(true); // Show event text again
        this.currentEvent = null; // Reset the current event
        this.eventActive = false; // Allow new events
        this.scheduleNextEvent(); // Schedule next event
    }
}
