module hud {
    export class Score extends createjs.Container {
        private display: ui.Label;
        private static savedScore: number = 0;
        private static currentScore: number = 0;
        
        constructor() {
            super();
            this.display = new ui.Label("Score: 0", "20px", "Consolas", "#FFFFFF", 240, 30, true);

            this.addChild(this.display);
        }

        public resetCurrentScore() {
            Score.currentScore = 0;
        }

        public addPoints(amount: number) {
            Score.currentScore += amount;
            this.updateText();
        }

        public updateText() {
            this.display.text = "Score: " + (Score.savedScore + Score.currentScore);
        }


        public saveCurrentScore() {
            Score.savedScore += Score.currentScore;
            Score.currentScore = 0;
        }
    }
}
