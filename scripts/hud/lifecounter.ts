module hud { 
    export class LifeCounter extends createjs.Container{
        
        private counterText:ui.Label;
        private counterImage:createjs.Bitmap;

        constructor() {
            super();
            this.counterText = new ui.Label("x3", "20px", "Consolas", "#FFFFFF", 80, 30, true);
            this.addChild(this.counterText);
            //this.counterImage = new createjs.Bitmap();
        }

        public text (t: string | number) {
            this.counterText.text = "lives: " + t;
        }


    }

}