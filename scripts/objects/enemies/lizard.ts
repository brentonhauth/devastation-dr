module objects {
    export class Lizard extends objects.Spider {

        private lastPlayerPos: math.Vec2;
        public enemyBullets: objects.EnemyBullet[];
        public enemyHandler: handlers.EnemyHandler;

        constructor(enemyHandler:handlers.EnemyHandler) {
            super(enemyHandler);
            this.scaleX = this.sprite.scaleX = 1.5;
            this.scaleY = this.sprite.scaleY = 1.5;
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
