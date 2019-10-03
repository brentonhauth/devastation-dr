module hud { 
    export class LifeCounter extends createjs.Container{
        
        private counterText:objects.Label;
        private counterImage:createjs.Bitmap;

        constructor() {
            super();
            this.counterText = new objects.Label("x3", "20px", "Consolas", "#FFFFFF", 80, 30, true);
            this.addChild(this.counterText);
            //this.counterImage = new createjs.Bitmap();
        }

        public text (t:string) {
            this.counterText.text = "lives: " + t;
        }


    }

}