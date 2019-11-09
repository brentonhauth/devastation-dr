module objects {
    export class EnemyBullet extends objects.Bullet {
        private dir: math.Vec2;
        protected speed: number = 3;
        public spawnedFrom: objects.Enemy;
        public bulletHandler:handlers.EnemyBulletHandler;

        constructor(pos: math.Vec2, target: math.Vec2, spawnedFrom:objects.Enemy, bulletHandler:handlers.EnemyBulletHandler, bulletType: config.BulletType = config.BulletType.ENEMYBULLET) {
            super(pos.x, pos.y, config.BulletType.ENEMYBULLET);

            this.bulletHandler = bulletHandler;
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
            if (this.x > 800 || this.x < 0 ||
                this.y > 900 || this.y < 0) {
                    this.Destroy();
            }
        }
        public Destroy(){
            this.bulletHandler.DestroyBullet(this);
        }
    }
}