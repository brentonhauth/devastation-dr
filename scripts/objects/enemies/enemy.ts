module objects {
    export class Enemy extends objects.GameObject {
        // Variables
        public pointsWorth: number;
        protected sprite: createjs.Bitmap;
        protected animator: createjs.Sprite;
        protected playScene: scenes.PlayScene;
        // Constructor
        constructor(sprite?: createjs.Bitmap|createjs.Sprite|createjs.SpriteSheet|string) {
            super();
            this.playScene = <scenes.PlayScene>objects.Game.currentScene;
            if (sprite) {
                let isStr: boolean, isSheet: boolean, isSprite = true;
                if ((isStr=typeof sprite === 'string') || sprite instanceof createjs.Bitmap) {
                    this.sprite = sprite = !isStr ? <createjs.Bitmap>sprite : new createjs.Bitmap(
                        objects.Game.getAsset(<string>sprite)
                    );
                    this.addChild(this.sprite);
                } else if ((isSheet=sprite instanceof createjs.SpriteSheet) || sprite instanceof createjs.Sprite) {
                    this.animator = sprite = !isSheet ? <createjs.Sprite>sprite :
                        new createjs.Sprite(<createjs.SpriteSheet>sprite);
                    this.addChild(this.animator);
                    this.animator.stop();
                } else {
                    isSprite = false;
                }

                if (isSprite) {
                    let bounds = (<createjs.Bitmap|createjs.Sprite>sprite).getBounds();
                    this.width = bounds.width;
                    this.height = bounds.height;
                }
            }
            // this.sprite = new createjs.Bitmap(objects.Game.getAsset(enemyType));
            // this.addChild(this.sprite);
            // let bounds = this.sprite.getBounds();
            // this.width = bounds.width;
            // this.height = bounds.height;
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
            let curWave:objects.Wave;
            if (curWave=this.playScene.waveHandler.currentWave) {

                if (this.animator) {
                    this.animator.stop();
                }

                curWave.Remove(this);
            }
        }

        public Pool(): void {}
    }
}