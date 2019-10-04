module scenes {
    export class StartScene extends objects.Scene {
        // Variables
        private background: objects.Background;
        private welcomeLabel: objects.Label;
        private startButton: objects.Button;

        // Constructor
        constructor() {
            super();
            this.Start();
        }

        public Start():void {
            // Initialize our objects for this scene
            this.background = new objects.Background();

            this.welcomeLabel = new objects.Label(
                "Welcome to School!", "60px", "Consolas", "#FFFFFF", 320, 240, true);

            this.startButton = new objects.Button("nextButton", 320, 300);
            this.Main();
        }
        public Update():void {
            // this.background.Update();
        }

        private startButtonClick():void {
            // Change our game state from START to GAME
            objects.Game.currentScene = config.Scene.GAME;
        }

        public Main():void {

            let logo = new createjs.Bitmap(objects.Game.assetManager.getResult("logo"));

            logo.x = 320;
            logo.y = 240;

            // Add items to our scene
            this.addChild(this.background);
            this.addChildAt(logo, 0);
            this.addChild(this.startButton);

            this.startButton.on("click", this.startButtonClick);
        }
    }
}