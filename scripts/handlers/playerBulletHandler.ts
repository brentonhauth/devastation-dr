module handlers {
    export class PlayerBulletHandler extends BulletHandler {

        constructor(playScene:scenes.PlayScene) {
            super(playScene);
        }

        public SpawnBullet():objects.PlayerBullet {
            let player = this.playScene.player;
            let bullet = new objects.PlayerBullet(player.x, player.y, this);
            this.bullets[bullet.id] = bullet;

            return bullet;
        }

        public CheckCollision(enemies: any[]){
            //this.bullets.forEach(b => {
            for(let key in this.bullets)
            {
                let b = this.bullets[key];
                enemies.forEach(e => {
                    managers.Collision.Check(b, e);
                });
            };
        }

        public DestroyBullet(bullet) {
            delete this.bullets[bullet.id];
            this.playScene.removeChild(bullet);
        }
    }
}