module scenes {
    export class StartScene extends Scene {
        // Variables
        private background: createjs.Bitmap;
        private infoLabel: ui.Label;
        private logo: createjs.Bitmap;
        private startButton: ui.Button;
        // private exitButton: ui.Button;

        // Constructor
        constructor() {
            super();

            this.background = new createjs.Bitmap(objects.Game.getAsset("menu"));
            this.logo = new createjs.Bitmap(objects.Game.getAsset("logo"));
            this.infoLabel = new ui.Label(
                "(c) Rude Rhino", "18px", "Arial", "#e1e1f1", 320, 800, true);
            this.logo.scaleX *= .65;
            this.logo.scaleY *= .65;
            this.logo.x = 350;
            this.logo.y = 80;

            this.startButton = new ui.Button("playButton", 640, 180);
            //this.exitButton = new ui.Button("exitButton", 320, 260);

            //this.startButton.scaleY *= 2.25;
            //this.startButton.scaleX *= 2.25;
        }


        public Start(): void {
            this.addChild(this.background);
            this.addChild(this.startButton);
            //this.addChild(this.exitButton);
            this.addChildAt(this.logo, 2);
            this.addChild(this.infoLabel);

            this.startButton.on("click", () => {
                objects.Game.currentState = config.Scene.PROLOGUE;
                // objects.Game.currentState = config.Scene.ARCTIC;
            });
            // this.exitButton.on("click", () => {
            //     window.close();
            // });
        }
    }
}
