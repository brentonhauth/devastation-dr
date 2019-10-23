module objects {
    export class EnemyBullet extends objects.Bullet {
        private dir: math.Vec2;
        private speed: number = 3;
        public spawnedFrom: objects.Enemy;
        public bulletHandler:handlers.EnemyBulletHandler;
        public static counter = 1;
        public bulletID:string;

        constructor(pos: math.Vec2, target: math.Vec2, spawnedFrom:objects.Enemy, bulletHandler:handlers.EnemyBulletHandler) {
            super(pos.x, pos.y, "enemyBullet");

            this.bulletHandler = bulletHandler;
            this.bulletID = String(EnemyBullet.counter);
            EnemyBullet.counter++;
            this.spawnedFrom = spawnedFrom;
            // this.Init();
            // this.position = pos;
            // this.x = pos.x;
            // this.y = pos.y;

            this.dir = math.Vec2.Difference(target, pos).Normalized;
        }

        public Update() {
            this.position = this.position.Add(this.dir.Scale(this.speed));
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