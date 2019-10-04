module objects {
    export class Lizard extends objects.Spider {

        private lastPlayerPos: math.Vec2;

        public enemyBullets: objects.EnemyBullet[];
        constructor() {
            super();
            this.scaleX *= 1.5;
            this.scaleY *= 1.5;
            this.lastPlayerPos = new math.Vec2();
            this.enemyBullets = new Array<objects.EnemyBullet>(0);
        }

        public setLastPlayerPos(x: number, y: number) {
            this.lastPlayerPos = new math.Vec2(x, y);
        }

        public Update() {
            super.Update();


            this.enemyBullets.forEach(eb => {
                if (!eb.isDestroyed) {
                    eb.Update();
                    if (objects.Game.currentSceneRef instanceof scenes.PlayScene) {
                        managers.Collision.Check(objects.Game.currentSceneRef.player, eb);
                    }
                }
            });



            let r = math.randRange(1, 30);
            if (Math.round(r) == 5) {
                this.spawnBullet();
            }
        }

        public spawnBullet() {
            console.log("spawned EB!");
            let eb = new objects.EnemyBullet(new math.Vec2(this.x, this.y), this.lastPlayerPos);
            objects.Game.currentSceneRef.addChild(eb);
            this.enemyBullets.push(eb);
        }
    }

    export class EnemyBullet extends objects.GameObject {
        private dir: math.Vec2;
        private speed: number = 3;
        public spawnedFrom: objects.Lizard;
        public isDestroyed = false;

        constructor(pos: math.Vec2, target: math.Vec2) {
            super("bullet");

            this.x = pos.x;
            this.y = pos.y;

            let dx = target.x - pos.x;
            let dy = target.y - pos.y;

            let mag = Math.sqrt((dx * dx) + (dy * dy));

            if (mag != 0) {
                dx /= mag;
                dy /= mag;
            }

            this.dir = new math.Vec2(dx, dy);
        }

        public Update() {
            this.x += this.dir.x * this.speed;
            this.y += this.dir.y * this.speed;
        }

        public CheckBound(): void {
            if (this.x > 650 || this.x < 0 ||
                this.y > 900 || this.y < 0) {
                    this.Destroy();
            }
        }

        public Destroy() {
            this.isDestroyed = true;
            try {
                objects.Game.currentSceneRef.removeChild(this);
                this.spawnedFrom.enemyBullets.shift();
            } catch (err) {
                console.log(err);
            }
        }
    }
}
