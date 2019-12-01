module objects {
    export class Lizard extends objects.Enemy {

        // private lastPlayerPos: math.Vec2;
        public enemyBullets: objects.EnemyBullet[];
        public enemyHandler: handlers.EnemyHandler;

        private cosWave: (val: number)=>number;
        private yCenterAxis: number;
        private static yBounds = 970; // canvas.height + 400

        constructor(enemyHandler:handlers.EnemyHandler=null) {
            super(new createjs.SpriteSheet({
                images: [objects.Game.getAsset('lizardSheet')],
                frames: { width: 96, height: 96, count: 12 },
                animations: {
                    move: { speed: .1, frames: [0, 1, 2] }
                }
            }));
            this.scaleX = 1.5;
            this.scaleY = 1.5;

            // let bounds = this.sprite.getBounds();
            // this.width = bounds.width;
            // this.height = bounds.height;
            // this.removeChild(this.sprite);
            // this.addChild(this.lizardAnimator);
            this.Init();
            // this.lastPlayerPos = new math.Vec2();
            this.enemyBullets = new Array<objects.EnemyBullet>(0);

            this.Reset();
        }

        public Start() {
            this.animator.gotoAndPlay('move');
        }

        public Reset(): void {
            this.yCenterAxis = math.randInt(250, 350);
            this.cosWave = math.cosWaveFunction(
                math.randInt(20, 50),
                math.randInt(50, 250)
            );

            let y = math.randInt(-500, -100);

            this.position = new math.Vec2(this.yCenterAxis, y);
        }

        /*
        public setLastPlayerPos(x: number, y: number) {
            this.lastPlayerPos = new math.Vec2(x, y);
        }
        */

        public Update() {
            this.Move();
            if (createjs.Ticker.getTicks() % 2) {
                this.SpawnBullet();
            }
        }

        public Move():void {
            let y = this.y + 1;
            if(y > Lizard.yBounds) { return this.Reset(); }
            let x = this.cosWave(y) + this.yCenterAxis;
            this.position = new math.Vec2(x, y);
        }

        public SpawnBullet() {
            if (math.oneIn(15)) {
                this.playScene.AddEnemyBullet(this);
            }
        }
    }
}
