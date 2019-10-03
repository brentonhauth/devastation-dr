module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private background: objects.Background;
        private player: objects.Player;
        private lifeCounter: hud.LifeCounter;
        // private enemy:objects.Enemy;
        private enemies: objects.Enemy[];
        private bullets: objects.Bullet[];
        private enemyNum: number;

        // Constructor
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        // Methods
        public Start(): void {
            // Initialize our variables
            this.background = new objects.Background(this.assetManager);
            this.player = new objects.Player(this.assetManager);
            this.lifeCounter = new hud.LifeCounter();
            // this.enemy = new objects.Enemy(this.assetManager);
            this.enemies = new Array<objects.Enemy>();
            this.enemyNum = 5;
            this.bullets = new Array<objects.Bullet>(0);
            for(let i = 0; i < this.enemyNum; i++) {
                this.enemies[i] = new objects.Enemy(this.assetManager);
            }
            window.addEventListener("keypress", (e: any) => {
                if (e.key == ' ') {
                    console.log('Bullet!!!');
                    let bullet: objects.Bullet = new objects.Bullet(this.assetManager);
                    bullet.x = this.player.x;
                    bullet.y = this.player.y;
                    this.bullets.push(bullet);
                    this.addChild(bullet);
                    //var fn: any = bullet.Destroy;
                    bullet.Destroy = () => {
                        let b = this.bullets.shift();
                        b.isDestroyed = true;
                        this.removeChild(b);
                    };
                }
            });
            this.Main();
        }

        public Update(): void {
            // Update the background here
            this.background.Update();
            this.player.Update();
            // this.enemy.Update();

            this.lifeCounter.text("" + this.player.lives);

            this.enemies.forEach(e => {
                e.Update();
                managers.Collision.Check(this.player, e);
            });

            this.bullets.forEach(b => {
                if (!b.isDestroyed) {
                    b.Update();
                    this.enemies.forEach(e => {
                        managers.Collision.Check(b, e);
                    });
                }
            });
        }

        public Main(): void {
            // Order matters when adding game objects.
            this.addChild(this.background);
            this.addChild(this.player);
            this.addChild(this.lifeCounter);
            // this.addChild(this.enemy);
            this.enemies.forEach(e => {
                this.addChild(e);
            });
        }
    }
}