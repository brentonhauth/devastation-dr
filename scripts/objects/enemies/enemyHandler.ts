
module objects {
    export class EnemyHandler {

        //public enemies: any;
        public enemies: any[];
        public enemyNum = 5;
        public playScene:scenes.PlayScene;

        constructor(playScene:scenes.PlayScene) {
            this.enemies = new Array(0);
            this.playScene = playScene;
            this.SpawnEnemies();
        }

        public Update() {
            this.enemies.forEach(e => {
                e.Update();
            });
        }

        public CheckCollision() {
            this.enemies.forEach(e => {
                //e.setLastPlayerPos(this.player.x, this.player.y);
                //e.Update();
                managers.Collision.Check(this.playScene.player, e);
            });
        }

        public SpawnEnemies() {
            for(let i = 0; i < this.enemyNum; i++) {
                if (i == 0) {
                    this.enemies.push(new objects.Lizard(this));
                } else {
                    this.enemies.push(new objects.Spider(this));
                }
            }
        }
    }
}
