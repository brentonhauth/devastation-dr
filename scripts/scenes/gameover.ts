module scenes {
    export class GameOverScene extends Scene {
        // Variables
        private gameOverLabel: ui.Label;
        private backButton: ui.Button;

        // Constructor
        constructor() {
            super();
        }

        // Method
        public Start():void {

            createjs.Sound.stop();

            this.gameOverLabel = new ui.Label(
                "Game Over!", "40px", "Consolas", "#000000", 320, 240, true);
            
            this.backButton = new ui.Button("backButton", 320, 340);
            this.Main();
        }

        public Update():void {}

        private backButtonClick():void {
            objects.Game.currentState = config.Scene.START;
        }

        public Main():void {
            this.addChild(this.gameOverLabel);
            this.addChild(this.backButton);

            this.backButton.on("click", this.backButtonClick);
        }
    }
}