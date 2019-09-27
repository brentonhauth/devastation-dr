module scenes {
    export class OverScene extends objects.Scene {

        private welcomeLabel: objects.Label;
        private startButton: objects.Button;

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        public Start(): void {
            // init objects
            this.welcomeLabel = new objects.Label("Game Over!", "60px", "Consolas", "firebrick", 320, 240, true);
            this.startButton = new objects.Button(this.assetManager, "backButton", 320, 300);
            this.Main();
        }

        public Update(): void {}


        private startButtonClick(): void {
            // change game state from START to GAME
            objects.Game.currentScene = config.Scene.GAME;
        }

        public Main(): void {
            this.addChild(this.welcomeLabel);
            this.addChild(this.startButton);
            this.startButton.on("click", this.startButtonClick);
        }
    }

}
