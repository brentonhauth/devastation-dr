module objects {
    // change so that Spider extends Enemy
    export class Spider extends objects.Enemy {

        private cosWave: (val: number)=>number;
        private yCenterAxis: number;
        public enemyHandler:handlers.EnemyHandler;

        private static yBounds = 870; // canvas.height + 400

        constructor(enemyHandler:handlers.EnemyHandler=null) {
            super("spider");
            this.enemyHandler = enemyHandler;
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.Init();
            this.Reset();
        }

        public Start(): void {
            // this.x = 320;
            // this.y = -50;
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public Reset(): void {
            this.yCenterAxis = math.randInt(150, 600);
            this.cosWave = math.cosWaveFunction(
                math.randInt(20, 50),
                math.randInt(50, 250)
            );

            let y = math.randInt(-500, -50);
            this.health = 1;
            this.SetPosition(this.yCenterAxis, y);
        }

        public Move():void {
            let y = this.y + 1;
            if (y > Spider.yBounds) { this.Reset(); }
            let x = this.cosWave(y) + this.yCenterAxis;
            this.SetPosition(x, y);
            // this.position = new math.Vec2(x, y);
        }
    }
}
