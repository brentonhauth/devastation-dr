module objects {
    export class EnemyBulletHandler {

        public bullets: any;
        public playScene: scenes.PlayScene;


        constructor(playScene:scenes.PlayScene) {
            this.playScene = playScene;
            this.bullets = new Object;
        }

        public SpawnBullet(enemy:objects.Enemy):objects.EnemyBullet {
            let playerPos = new math.Vec2(this.playScene.player.x, this.playScene.player.y);
            let enemyPos = new math.Vec2(enemy.x, enemy.y)
            let bullet = new objects.EnemyBullet(enemyPos, playerPos, enemy, this);
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