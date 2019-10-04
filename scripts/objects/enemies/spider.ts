module objects {
    // change so that Spider extends Enemy
    export class Spider extends objects.GameObject {

        private movementSeed: number;
        private currentMovePatter: Function;
        private cosWave: Function;
        private yCenterAxis: number;

        constructor() {
            super("spider");
            // this.scaleX *= .25;
            // this.scaleY *= .25;
            // this.halfW = this.width * .5;
            // this.halfH = this.height * .5;
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
            this.currentMovePatter = (Math.random() < .5) ?
            this.movementPattern01 : this.movementPattern02;
            this.x = Math.floor(Math.random() * 550) + 50;
            this.y = Math.floor(Math.random() * -800) - 50;
        }

        public Move():void {
            this.y += 1;
            
            this.x = this.cosWave(this.y) + this.yCenterAxis; //this.currentMovePatter() + 300;
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

        public movementPattern02() {
            let r1: number, r2: number;
            
            r2 = 50 + (this.movementSeed * 200);
            r1 = 20 + (this.movementSeed * 5);
            return Math.cos((this.y / r1)) * r2;
        }
    }
}
