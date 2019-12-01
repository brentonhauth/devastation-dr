module scenes {
    export class PlayScene extends Scene {

        public background: objects.Background;
        public player: objects.Player;
        public lifeCounter: hud.LifeCounter;
        public score: hud.Score;
        public weaponHUD: hud.WeaponHUD;

        public playerBulletHandler: handlers.PlayerBulletHandler;
        public flamethrowerBulletHandler: handlers.FlamethrowerBulletHandler;

        public enemyBulletHandler: handlers.EnemyBulletHandler;
        // public enemyHandler: handlers.EnemyHandler;
        public dialogHandler: handlers.DialogHandler;
        public waveHandler: handlers.WaveHandler;
        public enemyItemHandler: handlers.EnemyItemHandler;

        constructor() {
            super();
            this.background = new objects.Background();
            this.player = new objects.Player(this);

            this.lifeCounter = new hud.LifeCounter();
            this.score = new hud.Score();
            this.weaponHUD = new hud.WeaponHUD();

            this.playerBulletHandler = new handlers.PlayerBulletHandler(this);
            this.flamethrowerBulletHandler = new handlers.FlamethrowerBulletHandler(this);
            this.enemyBulletHandler = new handlers.EnemyBulletHandler(this);
            // this.enemyHandler = new handlers.EnemyHandler(this);
            this.dialogHandler = new handlers.DialogHandler(this);
            this.waveHandler = new handlers.WaveHandler(this);
            this.enemyItemHandler = new handlers.EnemyItemHandler(this);
        }

        public Start(): void {

            this.addChild(this.background);
            this.addChild(this.player);
            this.addChild(this.lifeCounter);
            this.addChild(this.score);
            this.addChild(this.weaponHUD);
            
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

            this.enemyItemHandler.Update();
            this.enemyItemHandler.CheckCollision(this.player);

            if (this.player.weapon.weaponType == config.Weapon.FLAMETHROWER)
            {
                this.flamethrowerBulletHandler.UpdateAndCheckCollision(this.waveHandler.ActiveEnemies);

                if (managers.Keyboard.pressed(config.Key.Space))
                {
                    this.player.ShootWeapon();
                }
                else
                {
                    (<objects.Flamethrower>this.player.weapon).stopShooting();
                }
                
            }
            else  
            {
                if(managers.Keyboard.down(config.Key.Space))
                {
                    this.player.ShootWeapon();   
                }
            }

        }

        public AddEnemyBullet(enemy:objects.Enemy) {
            let bullet = this.enemyBulletHandler.SpawnBullet(enemy);
            this.addChild(bullet);
        }

        public AddEnemyItem(enemy:objects.Enemy) {
            let item = this.enemyItemHandler.SpawnItem(enemy);
            this.addChild(item);
        }
    }
}
