module scenes {
    export class PlayScene extends objects.Scene {
        // Variables
        private background: objects.Background;
        public player: objects.Player;
        private lifeCounter: hud.LifeCounter;
        public score: hud.Score;
        // private enemy:objects.Enemy;
        private enemies: objects.Spider[];
        private bullets: objects.Bullet[];
        private enemyNum: number;

        // Constructor
        constructor() {
            super();
            this.Start();
        }

        // Methods
        public Start(): void {
            // Initialize our variables
            this.background = new objects.Background();
            this.player = new objects.Player();
            this.lifeCounter = new hud.LifeCounter();
            // this.enemy = new objects.Enemy(this.assetManager);
            this.enemies = new Array<objects.Spider>();
            this.score = new hud.Score();
            this.enemyNum = 5;
            this.bullets = new Array<objects.Bullet>(0);
            for(let i = 0; i < this.enemyNum; i++) {
                if (i == 0) {
                    this.enemies[i] = new objects.Lizard();
                } else {
                    this.enemies[i] = new objects.Spider();
                }
            }
            managers.Input.keypress(' ', () => {
                let bullet = new objects.Bullet(this.player.x, this.player.y);
                this.bullets.push(bullet);
                this.addChild(bullet);
                //var fn: any = bullet.Destroy;
                bullet.Destroy = () => {
                    let b = this.bullets.shift();
                    if (!b) return;
                    b.isDestroyed = true;
                    this.removeChild(b);
                };
            });
            this.Main();
        }

        public Update(): void {
            // Update the background here
            this.background.Update();
            this.player.Update();
            // this.enemy.Update();
            this.score.updateText();
            this.lifeCounter.text("" + this.player.lives);

            this.enemies.forEach(e => {
                if (e instanceof objects.Lizard) {
                    e.setLastPlayerPos(this.player.x, this.player.y);
                }
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
            this.addChild(this.score);
            // this.addChild(this.enemy);
            this.enemies.forEach(e => {
                this.addChild(e);
            });
        }
    }
}
