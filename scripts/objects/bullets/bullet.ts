module objects {
    export class Bullet extends objects.GameObject {


        public isDestroyed: boolean = false;
        public bulletSpeed: number;

        constructor(x:number, y:number, bulletType:string) {
            super("bullet");
            this.x = x;
            this.y = y;
            this.Start();
        }

        public setInitialPosition(): void{

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
        }

        public CheckBounds(): void {
        }

        public Destroy(): void {
            this.isDestroyed = true;
        }

        public OnCollision(obj: objects.GameObject): void {
 
        }


    }
}
