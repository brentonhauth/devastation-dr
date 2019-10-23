module objects {
    export class Lizard extends objects.Spider {

        private lastPlayerPos: math.Vec2;
        public enemyBullets: objects.EnemyBullet[];
        public enemyHandler: handlers.EnemyHandler;

        constructor(enemyHandler:handlers.EnemyHandler) {
            super(enemyHandler);
            this.scaleX = 1.5;
            this.scaleY = 1.5;
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
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
                this.enemyHandler.playScene.AddEnemyBullet(this);
            }
        }
    }
}
