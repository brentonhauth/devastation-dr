module objects {
    export class EnemyBullet extends objects.Bullet {
        private dir: math.Vec2;
        private speed: number = 3;
        public spawnedFrom: objects.Enemy;
        public bulletHandler:objects.EnemyBulletHandler;
        public static counter = 1;
        public bulletID:string;

        constructor(pos: math.Vec2, target: math.Vec2, spawnedFrom:objects.Enemy, bulletHandler:objects.EnemyBulletHandler) {
            super(pos.x, pos.y, "enemyBullet");

            this.bulletHandler = bulletHandler;
            this.bulletID = String(EnemyBullet.counter);
            EnemyBullet.counter++;
            this.spawnedFrom = spawnedFrom;

            this.x = pos.x;
            this.y = pos.y;

            this.dir = math.Vec2.Difference(target, pos).Normalized;
        }

        public Update() {
            this.x += this.dir.x * this.speed;
            this.y += this.dir.y * this.speed;
            this.CheckBound();
        }

        public CheckBound(): void {
            if (this.x > 650 || this.x < 0 ||
                this.y > 900 || this.y < 0) {
                    this.Destroy();
            }
        }
        public Destroy(){
            this.bulletHandler.DestroyBullet(this);
        }
    }
}