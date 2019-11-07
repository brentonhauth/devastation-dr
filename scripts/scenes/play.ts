module scenes {
    export class PlayScene extends Scene {

        private background: objects.Background;
        public player: objects.Player;
        public lifeCounter: hud.LifeCounter;
        public score: hud.Score;

        public playerBulletHandler: handlers.PlayerBulletHandler;
        public enemyBulletHandler: handlers.EnemyBulletHandler;
        public enemyHandler: handlers.EnemyHandler;
        public dialogHandler: handlers.DialogHandler;
        public waveHandler: handlers.WaveHandler;

        constructor(levelType: string) {
            super();

            this.background = new objects.Background(levelType);
            this.player = new objects.Player();
            this.lifeCounter = new hud.LifeCounter();
            this.score = new hud.Score();

            this.playerBulletHandler = new handlers.PlayerBulletHandler(this);
            this.enemyBulletHandler = new handlers.EnemyBulletHandler(this);
            this.enemyHandler = new handlers.EnemyHandler(this);
            this.dialogHandler = new handlers.DialogHandler(this);
            this.waveHandler = new handlers.WaveHandler(this);
        }

        public Start(): void {

            this.addChild(this.background);
            this.addChild(this.player);
            this.addChild(this.lifeCounter);
            this.addChild(this.score);
            this.dialogHandler.AppendDialogBox();

            this.Main();
        }

        public Update(): void {

            this.background.Update();
            this.player.Update();

            this.waveHandler.Update();
            this.waveHandler.CheckCollision(this.player);

            this.enemyBulletHandler.UpdateAndCheckCollision(this.player);
            this.playerBulletHandler.UpdateAndCheckCollision(this.waveHandler.ActiveEnemies);

            if (managers.Keyboard.down(config.Key.Space)) {
                this.AddBullet();
            }
        }

        public AddBullet() {
            let bullet = this.playerBulletHandler.SpawnBullet();
            this.addChild(bullet);
        }

        public AddEnemyBullet(enemy: objects.Enemy) {
            let bullet = this.enemyBulletHandler.SpawnBullet(enemy);
            this.addChild(bullet);
        }
    }
}
