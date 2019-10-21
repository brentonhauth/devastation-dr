module scenes {
    export class StartScene extends Scene {
        // Variables
        private background: objects.Background;
        private infoLabel: ui.Label;
        private logo: createjs.Bitmap;
        private startButton: ui.Button;

        // Constructor
        constructor() {
            super();
            this.Start();
        }

        public Start():void {
            // Initialize our objects for this scene
            this.background = new objects.Background();
            this.logo = new createjs.Bitmap(objects.Game.assetManager.getResult("logo"));
            this.infoLabel = new ui.Label(
            "(c) Rude Rhino", "18px", "Arial", "#e1e1f1", 320, 800, true);
            this.logo.scaleX *= .8;
            this.logo.scaleY *= .8;
            this.logo.x = 80;
            this.logo.y = 140;

            this.startButton = new ui.Button("nextButton", 270, 300);

            this.startButton.scaleY *= 3.25;
            this.startButton.scaleX *= 3.25;
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



            // Add items to our scene
            this.addChild(this.background);
            this.addChild(this.startButton);
            this.addChildAt(this.logo, 2);
            this.addChild(this.infoLabel);

            this.startButton.on("click", this.startButtonClick);
        }
    }
}