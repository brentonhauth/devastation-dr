module scenes {
    export class PlayScene extends objects.Scene {

        private background: objects.Background;
        public player: objects.Player;
        private lifeCounter: hud.LifeCounter;
        public score: hud.Score;

        public playerBulletHandler: objects.PlayerBulletHandler;
        public enemyBulletHandler: objects.EnemyBulletHandler;
        public enemyHandler: objects.EnemyHandler; 

        constructor() {
            super();
            this.Start();
        }

        public Start(): void {
            this.background = new objects.Background();
            this.player = new objects.Player();
            this.lifeCounter = new hud.LifeCounter();
            this.score = new hud.Score();

            this.playerBulletHandler = new objects.PlayerBulletHandler(this);
            this.enemyBulletHandler = new objects.EnemyBulletHandler(this);
            this.enemyHandler = new objects.EnemyHandler(this);
            this.initEventHandlers();

            this.Main();
        }

        public Update(): void {
            this.background.Update();
            this.player.Update();
            this.score.updateText();

            this.lifeCounter.text("" + this.player.lives);

            this.playerBulletHandler.Update();
            this.enemyHandler.Update();

            this.enemyHandler.CheckCollision();
            this.enemyBulletHandler.CheckCollision();
            this.playerBulletHandler.CheckCollision();

        }

        public Main(): void {
            // Order matters when adding game objects.
            this.addChild(this.background);
            this.addChild(this.player);
            this.addChild(this.lifeCounter);
            this.addChild(this.score);
            this.enemyHandler.enemies.forEach(e => {
                this.addChild(e);
            });
        }

        public initEventHandlers(): void {
            let playScene = this;
            managers.Input.keypress(" ", function(){playScene.AddBullet(playScene); });
        }

        public AddBullet(playScene:scenes.PlayScene) {
            let bullet = playScene.playerBulletHandler.SpawnBullet();
            playScene.addChild(bullet);
        }

        public RemoveBullet(bullet:objects.PlayerBullet) {
            this.removeChild(bullet)
        }

        public AddEnemyBullet(enemy:objects.Enemy) {
            let bullet = this.enemyBulletHandler.SpawnBullet(enemy);
            this.addChild(bullet);
        }
        
        public RemoveEnemyBullet(bullet:objects.EnemyBullet) {
            this.removeChild(bullet)
        }
    }
}
