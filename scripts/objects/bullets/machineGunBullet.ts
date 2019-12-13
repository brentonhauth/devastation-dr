module objects {
    export class MachineGunBullet extends objects.PlayerBullet {

        public bulletHandler:handlers.PlayerBulletHandler;
        public bulletType = config.BulletType.MACHINEGUN;
        public bulletDirection:config.BulletDirection;

        constructor(x:number, y:number, bulletDirection:config.BulletDirection, bulletHandler: handlers.PlayerBulletHandler) {
            super(x, y, config.BulletType.MACHINEGUN, bulletHandler);

            this.position = new math.Vec2(x, y);
            this.bulletHandler = bulletHandler;
            this.bulletDirection = bulletDirection;

            this.Start();
        }

        public OnCollision(obj: objects.GameObject): void {
            let playScene = this.bulletHandler.playScene;

            if (obj instanceof objects.Enemy) {

                this.checkSpawnItem(obj);
                obj.Destroy();
                this.Destroy();

                let points = obj instanceof objects.Lizard ? 300 : 100;
                playScene.score.addPoints(points);
            }
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public Move(): void {
            let player = this.bulletHandler.playScene.player;
            let bulletDirection = this.bulletDirection
            let x = 0;
            let y = 0;

            if (bulletDirection == config.BulletDirection.NORTH)
            {
                x = this.x;
                y = this.y - 7;
            }
            else if (bulletDirection == config.BulletDirection.NORTHWEST)
            {
                x = this.x - 5;
                y = this.y - 5;
            }
            else if (bulletDirection == config.BulletDirection.NORTHEAST)
            {
                x = this.x + 5;
                y = this.y - 5;
            }
            this.position = new math.Vec2(x, y);
            //this.x = x;
            //this.y = y;

            if(this.y < 0)
            {
                this.Destroy();
            }
        }


        public Destroy(){
            this.bulletHandler.DestroyBullet(this);
        }
    }
}