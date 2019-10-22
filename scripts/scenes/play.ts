module scenes {
    export class PlayScene extends Scene {

        private background: objects.Background;
        public player: objects.Player;
        private lifeCounter: hud.LifeCounter;
        public score: hud.Score;

        public playerBulletHandler: handlers.PlayerBulletHandler;
        public enemyBulletHandler: handlers.EnemyBulletHandler;
        public enemyHandler: handlers.EnemyHandler; 

        constructor() {
            super();
            this.Start();
        }

        public Start(): void {

            managers.Sound.music("cyberpunker");


            this.background = new objects.Background();
            this.player = new objects.Player();
            this.lifeCounter = new hud.LifeCounter();
            this.score = new hud.Score();

            this.playerBulletHandler = new handlers.PlayerBulletHandler(this);
            this.enemyBulletHandler = new handlers.EnemyBulletHandler(this);
            this.enemyHandler = new handlers.EnemyHandler(this);

            this.Main();
        }

        public Update(): void {
            this.background.Update();
            this.player.Update();
            this.score.updateText();

            this.lifeCounter.text(this.player.lives);

            this.enemyHandler.Update();

            this.enemyHandler.CheckCollision(this.player);
            
            this.enemyBulletHandler.UpdateAndCheckCollision(this.player);
            this.playerBulletHandler.UpdateAndCheckCollision(this.enemyHandler.enemies);

            if (managers.Keyboard.pressed(config.Key.Space)) {
                this.AddBullet();
            }
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

        public AddBullet() {
            let bullet = this.playerBulletHandler.SpawnBullet();
            this.addChild(bullet);
        }

        public AddEnemyBullet(enemy:objects.Enemy) {
            let bullet = this.enemyBulletHandler.SpawnBullet(enemy);
            this.addChild(bullet);
        }
    }
}
