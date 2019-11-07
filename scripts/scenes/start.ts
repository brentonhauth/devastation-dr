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

            this.background = new objects.Background("arctic");
            this.logo = new createjs.Bitmap(objects.Game.assetManager.getResult("logo"));
            this.infoLabel = new ui.Label(
                "(c) Rude Rhino", "18px", "Arial", "#e1e1f1", 320, 800, true);
            this.logo.scaleX *= .65;
            this.logo.scaleY *= .65;
            this.logo.x = 10;
            this.logo.y = 10;

            this.startButton = new ui.Button("nextButton", 30, 120);

            this.startButton.scaleY *= 2.25;
            this.startButton.scaleX *= 2.25;
        }


        public Start(): void {
            this.addChild(this.background);
            this.addChild(this.startButton);
            this.addChildAt(this.logo, 2);
            this.addChild(this.infoLabel);

            this.startButton.on("click", () => {
                objects.Game.currentState = config.Scene.JUNGLE;
            });
        }
    }
}
