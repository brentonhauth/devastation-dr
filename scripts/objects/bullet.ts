module objects {
    export class Bullet extends objects.GameObject {


        public isDestroyed: boolean = false;

        constructor() {
            super("bullet");
            this.Start();
        }

        public Start(): void {
            setTimeout(() => {
                this.Destroy();
            }, 10 * 1000);
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public Move(): void {
            this.y -= 7;
            //console.log('(' +this.x+', ' +this.y+')');
        }

        public CheckBounds(): void {
        }

        public Destroy(): void {
            this.isDestroyed = true;
        }

        public OnCollision(obj: objects.GameObject): void {
            if (obj instanceof objects.Enemy) {
                obj.Reset();
                this.Destroy();
            }
        }


    }
}
