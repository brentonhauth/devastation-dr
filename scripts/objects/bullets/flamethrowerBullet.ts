module objects {
    export class FlamethrowerBullet extends objects.Bullet {

        public bulletHandler:handlers.PlayerBulletHandler;

        constructor(x:number, y:number, bulletType:config.BulletType, bulletHandler: handlers.PlayerBulletHandler) {
            super(x, y, bulletType);
            this.position = new math.Vec2(x, y);
            this.bulletHandler = bulletHandler;

            this.Start();
        }

        private checkSpawnItem(obj: objects.Enemy): void {
            let spawnItem = false;
            let playScene = this.bulletHandler.playScene;

            if (obj instanceof objects.Jackal) {
                // TODO: improve upon 'yoink' system with Jackals
                if (obj.yoinked) {
                    spawnItem = true;
                }
            } else {
                //let rr = Math.floor(math.randRange(1, 1));
                let rr = Math.floor(math.randRange(1, 5));
                if (rr == 1)
                {
                    spawnItem = true;
                }
            }

            if (spawnItem) {
                playScene.AddEnemyItem(obj);
            }
        
        }
        public OnCollision(obj: objects.GameObject): void {
            let playScene = this.bulletHandler.playScene;

            if (obj instanceof objects.Enemy) {

                this.checkSpawnItem(obj);
                obj.Destroy();
                //this.Destroy();

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

            //this.x = this.bulletHandler.playScene.player.x;
            let x = player.x;
            let y = player.y - player.height;

            //this.y = this.bulletHandler.playScene.player.y;
            //this.y = this.bulletHandler.playScene.player.boxCollider.aabb.min.y
            this.position = new math.Vec2(x, y);

        }


        public Destroy(){
            this.bulletHandler.DestroyBullet(this);
        }
    }
}