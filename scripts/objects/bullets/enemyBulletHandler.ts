module objects {
    export class EnemyBulletHandler {

        public enemyBullets: any;
        public playScene: scenes.PlayScene;


        constructor(playScene:scenes.PlayScene) {
            this.playScene = playScene;
            this.enemyBullets = new Array();
        }

        public SpawnBullet(enemy:objects.Enemy):objects.EnemyBullet {
            let playerPos = new math.Vec2(this.playScene.player.x, this.playScene.player.y);
            let enemyPos = new math.Vec2(enemy.x, enemy.y)
            let enemyBullet = new objects.EnemyBullet(enemyPos, playerPos);
            this.enemyBullets.push(enemyBullet);

            return enemyBullet;
        }

        public CheckCollision(){
            this.enemyBullets.forEach(eb => {
                if (!eb.isDestroyed) {
                    eb.Update();
                    if (objects.Game.currentSceneRef instanceof scenes.PlayScene) {
                        managers.Collision.Check(objects.Game.currentSceneRef.player, eb);
                    }
                }
            });
        }
    }
}