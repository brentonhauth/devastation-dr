module objects {
    export class PlayerBullet extends objects.Bullet {

        public bulletHandler:handlers.PlayerBulletHandler;

        constructor(x:number, y:number, bulletType:config.BulletType, bulletHandler: handlers.PlayerBulletHandler) {
            super(x, y, bulletType);
            this.position = new math.Vec2(x, y);
            this.bulletHandler = bulletHandler;

            this.Start();
        }

        public OnCollision(obj: objects.GameObject): void {
            let playScene = this.bulletHandler.playScene;

            if (obj instanceof objects.Enemy || obj instanceof objects.Spider) {
                let rr = Math.floor(math.randRange(1, 5));
                if (rr == 2)
                {
                    playScene.AddEnemyItem(obj);
                }
                obj.Destroy();
                this.Destroy();

                let points = obj instanceof objects.Lizard ? 300 : 100;
                playScene.score.addPoints(points);
            }
        }

        public Destroy(){
            this.bulletHandler.DestroyBullet(this);
        }
    }
}