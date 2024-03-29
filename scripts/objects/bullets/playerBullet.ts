module objects {
    export class PlayerBullet extends objects.Bullet {

        public bulletHandler:handlers.PlayerBulletHandler;

        constructor(x:number, y:number, bulletType:config.BulletType, bulletHandler: handlers.PlayerBulletHandler, flameFix = 0) {
            super(x, y, bulletType, flameFix);
            this.position = new math.Vec2(x, y);
            this.bulletHandler = bulletHandler;

            this.Start();
        }

        public checkSpawnItem(obj: objects.Enemy): void {
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
                let spawnItem = false;
                if (obj instanceof objects.Jackal) {
                    // TODO: improve upon 'yoink' system with Jackals
                    if (obj.yoinked) {
                        spawnItem = true;
                    }
                } else {
                    let rr = Math.floor(math.randRange(1, 1));
                    //let rr = Math.floor(math.randRange(1, 5));
                    if (rr == 1)
                    {
                        spawnItem = true;
                    }
                }

                if (spawnItem) {
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