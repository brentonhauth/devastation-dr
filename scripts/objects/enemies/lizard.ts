module objects {
    export class Lizard extends objects.Spider {

        private lastPlayerPos: math.Vec2;
        public enemyBullets: objects.EnemyBullet[];
        public enemyHandler: handlers.EnemyHandler;
        private lizardAnimator: createjs.Sprite;

        constructor(enemyHandler:handlers.EnemyHandler=null) {
            super(enemyHandler);
            this.scaleX = 1.5;
            this.scaleY = 1.5;

            let sheet = new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult('lizardSheet')],
                frames: {
                    width: 1152 / 12,
                    height: 768 / 8,
                    count: 96
                },
                animations: {
                    move: {
                        frames: [0, 1, 2],
                        speed: .1
                    }
                }
            });

            this.lizardAnimator = new createjs.Sprite(sheet, "move");
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.removeChild(this.sprite);
            this.addChild(this.lizardAnimator);
            this.Init();
            this.lastPlayerPos = new math.Vec2();
            this.enemyBullets = new Array<objects.EnemyBullet>(0);
        }

        /*
        public setLastPlayerPos(x: number, y: number) {
            this.lastPlayerPos = new math.Vec2(x, y);
        }
        */

        public Update() {
            super.Update();
            this.SpawnBullet();
        }

        
        public SpawnBullet()
        {
            let r = math.randRange(1, 30);
            if (Math.round(r) == 5) {
                let cs = <scenes.PlayScene>objects.Game.currentScene;
                // this.enemyHandler.
                cs.AddEnemyBullet(this);
            }
        }
    }
}
