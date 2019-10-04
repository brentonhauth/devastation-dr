module hud {
    export class Score extends createjs.Container {
        private display: objects.Label;
        private static savedScore: number = 0;
        private static currentScore: number = 0;
        
        constructor() {
            super();
            this.display = new objects.Label("x3", "20px", "Consolas", "#FFFFFF", 240, 30, true);

            this.addChild(this.display);
        }

        public resetCurrentScore() {
            Score.currentScore = 0;
        }

        public addPoints(amount: number) {
            Score.currentScore += amount;
        }

        public updateText() {
            this.display.text = `score: ${Score.savedScore + Score.currentScore}`;
        }


        public saveCurrentScore() {
            Score.savedScore += Score.currentScore;
            Score.currentScore = 0;
        }
    }
}
