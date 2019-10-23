module objects {
    export class Enemy extends objects.GameObject {
        // Variables
        public pointsWorth: number;
        protected sprite: createjs.Bitmap;
        // Constructor
        constructor(enemyType:string) {
            super();
            this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult(enemyType));
            this.addChild(this.sprite);
            //this.pointsWorth = pointsWorth;
            this.Start();
        }
        // Methods
        public Start():void {
            this.Reset();
        }

        public Update():void {
            this.Move();
            this.CheckBounds();
        }

        public Reset():void {
            this.x = Math.floor(Math.random() * 550) + 50;
            this.y = Math.floor(Math.random() * -800) - 50;
        }

        public Move():void {
            this.y += 5;
        }

        public CheckBounds():void {
            if(this.y >= 900 + this.halfH + 5) {
                this.Reset();
            }
        }
    }
}