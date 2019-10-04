module objects {
    export class PlayerBulletHandler {

        public bullets: any;
        public playScene:scenes.PlayScene;

        constructor(playScene:scenes.PlayScene) {
            this.playScene = playScene;
            this.bullets = new Object;
        }

        public SpawnBullet():objects.PlayerBullet {
            let player = this.playScene.player;
            let bullet = new objects.PlayerBullet(player.x, player.y, this);
            this.bullets[bullet.bulletID] = bullet;

            return bullet;
        }

        public CheckCollision(){
            //this.bullets.forEach(b => {
            for(let key in this.bullets)
            {
                let b = this.bullets[key];
                this.playScene.enemyHandler.enemies.forEach(e => {
                    managers.Collision.Check(b, e);
                });
            };
        }

        public Update() {
            for(let key in this.bullets)
            {
                let b = this.bullets[key];
                b.Update();
            };
        }

        public DestroyBullet(bullet) {
            delete this.bullets[bullet.bulletID];
            this.playScene.RemoveBullet(bullet);
        }
    }
}