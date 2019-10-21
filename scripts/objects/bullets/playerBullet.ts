module objects {
    export class PlayerBullet extends objects.Bullet {

        public static counter = 1;
        public bulletID:string;
        public bulletHandler:handlers.PlayerBulletHandler;

        constructor(x:number, y:number, bulletHandler) {
            super(x, y, "playerBullet");
            this.x = x;
            this.y = y;
            this.bulletHandler = bulletHandler;

            this.bulletID = String(PlayerBullet.counter);
            PlayerBullet.counter++;

            this.Start();
        }

        public OnCollision(obj: objects.GameObject): void {
            let playScene = this.bulletHandler.playScene;

            if (obj instanceof objects.Enemy || obj instanceof objects.Spider) {
                obj.Reset();
                this.Destroy();
                playScene.RemoveBullet(this);

                let points = obj instanceof objects.Lizard ? 300 : 100;
                playScene.score.addPoints(points);
            }
        }

        public Destroy(){
            this.bulletHandler.DestroyBullet(this);
        }
    }
}