module objects {
    export class EnemyBulletHandler {

        public enemyBullets: any;
        public playScene: scenes.PlayScene;


        constructor(playScene:scenes.PlayScene) {
            this.playScene = playScene;
            this.enemyBullets = new Array();
        }

        public SpawnEnemyBullet() {
            /*
            let eb = new objects.EnemyBullet(new math.Vec2(this.x, this.y), this.lastPlayerPos);
            objects.Game.currentSceneRef.addChild(eb);
            this.enemyBullets.push(eb);
            */
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