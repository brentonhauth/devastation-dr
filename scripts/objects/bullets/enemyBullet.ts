module objects {
    export class EnemyBullet extends objects.Bullet {
        private dir: math.Vec2;
        private speed: number = 3;
        public spawnedFrom: objects.Lizard;
        public isDestroyed = false;

        constructor(pos: math.Vec2, target: math.Vec2) {
            super(pos.x, pos.y, "enemyBullet");

            this.x = pos.x;

            let dx = target.x - pos.x;
            let dy = target.y - pos.y;

            let mag = Math.sqrt((dx * dx) + (dy * dy));

            if (mag != 0) {
                dx /= mag;
                dy /= mag;
            }

            this.dir = new math.Vec2(dx, dy);
            this.y = pos.y;
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