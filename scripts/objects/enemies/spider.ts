module objects {
    // change so that Spider extends Enemy
    export class Spider extends objects.Enemy {

        private movementSeed: number;
        private currentMovePatter: Function;
        private cosWave: Function;
        private yCenterAxis: number;
        public enemyHandler:handlers.EnemyHandler;

        constructor(enemyHandler:handlers.EnemyHandler) {
            super("spider");
            this.enemyHandler = enemyHandler;
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.Init();
            this.Start();
        }

        public Start(): void {
            // this.x = 320;
            // this.y = -50;
            this.Reset();
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public Reset(): void {
            this.movementSeed = Math.random();
            this.yCenterAxis = math.randRange(250, 350);
            this.cosWave = math.cosWaveFunction(math.randRange(20, 50), math.randRange(50, 250));
            let x = Math.floor(Math.random() * 550) + 50;
            let y = Math.floor(Math.random() * -800) - 50;

            this.position = new math.Vec2(x, y);
        }

        public Move():void {
            let y = this.y + 1;
            let x = this.cosWave(y) + this.yCenterAxis;
            this.position = new math.Vec2(x, y);
        }

        public CheckBounds():void {
            if(this.y >= 900 + this.halfH + 5) {
                this.Reset();
            }
        }
    }
}
