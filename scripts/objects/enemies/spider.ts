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
            this.x = Math.floor(Math.random() * 550) + 50;
            this.y = Math.floor(Math.random() * -800) - 50;
        }

        public Move():void {
            this.y += 1;
            
            this.x = this.cosWave(this.y) + this.yCenterAxis;
        }

        public CheckBounds():void {
            if(this.y >= 900 + this.halfH + 5) {
                this.Reset();
            }
        }

        public movementPattern01() {
            let r1: number, r2: number;
            r2 = (this.movementSeed / 10000);
            r1 = Math.round((this.movementSeed * 50) + 100);
            return Math.sin(this.y / r1) / (this.y * r2);
        }
    }
}
