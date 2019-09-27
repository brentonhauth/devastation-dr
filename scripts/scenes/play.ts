module scenes {
    export class PlayScene extends objects.Scene {

        private welcomeLabel: objects.Label;
        private startButton: objects.Button;
        private nextButton: objects.Button;

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        public Start(): void {
            // init objects
            this.welcomeLabel = new objects.Label("welcome to School!", "60px", "Consolas", "firebrick", 320, 240, true);
            this.startButton = new objects.Button(this.assetManager, "backButton", 320, 300);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 360, 300);
            this.Main();
        }

        public Update(): void {}


        public Main(): void {
            this.addChild(this.welcomeLabel);
            this.addChild(this.startButton);
            this.addChild(this.nextButton);
            this.startButton.on("click", function() {
                objects.Game.currentScene = config.Scene.START;
            });
            this.nextButton.on("click", function() {
                objects.Game.currentScene = config.Scene.OVER;
            });
        }
    }

}
