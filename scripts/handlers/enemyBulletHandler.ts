module handlers {
    export class EnemyBulletHandler extends BulletHandler {

        constructor(playScene:scenes.PlayScene) {
            super(playScene);
        }

        public SpawnBullet(enemy:objects.Enemy):objects.EnemyBullet {
            let bullet = new objects.EnemyBullet(enemy.position, this.playScene.player.position, enemy, this);
            this.bullets[bullet.bulletID] = bullet;

            return bullet;
        }
        
        public Update() {
            for(let key in this.bullets)
            {
                let bullet = this.bullets[key];
                bullet.Update();
            }
        }

        public CheckCollision(obj: objects.GameObject){
            for(let key in this.bullets)
            {
                let bullet = this.bullets[key];
                managers.Collision.Check(obj, bullet); 
            }
        }

        public DestroyBullet(bullet:objects.EnemyBullet) {
            delete this.bullets[bullet.bulletID];
            this.playScene.removeChild(bullet);
        }
    }
}