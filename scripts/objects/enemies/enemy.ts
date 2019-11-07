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
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.Init();
            //this.pointsWorth = pointsWorth;
            // this.Start();
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
            let x = Math.floor(Math.random() * 550) + 50;
            let y = Math.floor(Math.random() * -800) - 50;

            this.position = new math.Vec2(x, y);
        }

        // public Move():void {
        //     this.y += 5;
        // }

        public CheckBounds():void {
            if(this.y >= 900 + this.halfH + 5) {
                this.Reset();
            }
        }

        public Destroy() {
            let cw:objects.Wave, scene = <scenes.PlayScene>objects.Game.currentScene;
            if (cw=scene.waveHandler.currentWave) {
                cw.Remove(this);
            }
        }
    }
}