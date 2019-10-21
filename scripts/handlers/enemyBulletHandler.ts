module handlers {
    export class EnemyBulletHandler {

        public bullets: any;
        public playScene: scenes.PlayScene;


        constructor(playScene:scenes.PlayScene) {
            this.playScene = playScene;
            this.bullets = new Object;
        }

        public SpawnBullet(enemy:objects.Enemy):objects.EnemyBullet {
            let bullet = new objects.EnemyBullet(enemy.position, this.playScene.player.position, enemy, this);
            this.bullets[String(bullet.bulletID)] = bullet;

            return bullet;
        }
        
        public Update() {
            for(let key in this.bullets)
            {
                let bullet = this.bullets[key];
                bullet.Update();
            }
        }

        public CheckCollision(){
            for(let key in this.bullets)
            {
                let bullet = this.bullets[key];
                managers.Collision.Check(this.playScene.player, bullet); 
            }
        }

        public DestroyBullet(bullet:objects.EnemyBullet) {
            delete this.bullets[bullet.bulletID];
            this.playScene.RemoveEnemyBullet(bullet);
        }
    }
}