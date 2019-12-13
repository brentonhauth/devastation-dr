module scenes {
    export class GameOverScene extends Scene {
        // Variables
        private gameOverLabel: ui.Label;
        private backBtn: ui.Button;
        private backLabel: ui.Label;
        private tryAgainLabel: ui.Label;
        private tryAgainBtn: ui.Button;

        private bg: createjs.Shape;

        private halfCanvasW: number;
        private halfCanvasH: number;

        private lastScene: config.Scene;

        // Constructor
        constructor(lastScene: config.Scene=null) {
            super();

            this.lastScene = lastScene || config.Scene.START;

            let g = new createjs.Graphics();
            g.beginFill("black");
            g.drawRect(-1, -1,
                objects.Game.canvas.width + 10,
                objects.Game.canvas.height + 10
            );
            g.endStroke();

            this.bg = new createjs.Shape(g);

            this.halfCanvasW = objects.Game.canvas.width * .5;
            this.halfCanvasH = objects.Game.canvas.height * .5;
        }

        // Method
        public Start(): void {

            managers.Sound.music(false);

            this.gameOverLabel = new ui.Label(
            "Game Over!", "48px", "Consolas", "white", this.halfCanvasW, 150, true);
            
            // 190 x 49

            let alignBtnX = this.halfCanvasW - 95;
            let alignBtnY = this.halfCanvasH - 24.5;

            let tryOff = 20;
            let backOff = 110;


            this.tryAgainBtn = new ui.Button("blueButton", alignBtnX, alignBtnY + tryOff);

            this.tryAgainLabel = new ui.Label("Try Again", "32px", "Consolas",
            "white", this.halfCanvasW, this.halfCanvasH + tryOff - 5, true);


            this.backBtn = new ui.Button("greenButton", alignBtnX, alignBtnY + backOff);

            this.backLabel = new ui.Label("Main Menu", "32px", "Consolas",
            "white", this.halfCanvasW, this.halfCanvasH + backOff - 5, true);


            this.Main();
        }


        public Main():void {
            this.addChild(this.bg);
            this.addChild(this.gameOverLabel);
            this.addChild(this.tryAgainBtn);
            this.addChild(this.tryAgainLabel);
            this.addChild(this.backBtn);
            this.addChild(this.backLabel);

            this.tryAgainBtn.on("click", () => {
                objects.Game.currentState = this.lastScene;
            });

            this.backBtn.on("click", () => {
                objects.Game.currentState = config.Scene.START;
            });
        }
    }
}