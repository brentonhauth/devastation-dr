module objects {
    export class Bullet extends objects.GameObject {


        public isDestroyed: boolean = false;
        public bulletSpeed: number;
        protected sprite: createjs.Bitmap;
        public bulletType: config.BulletType;

        constructor(x:number, y:number, bulletType:config.BulletType) {
            super();
            this.bulletType = bulletType;
            //console.log(bulletType);
            this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult(bulletType));
            this.addChild(this.sprite);
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.Init();
            this.position = new math.Vec2(x, y);
            this.Start();
        }

        public setInitialPosition(): void{

        }

        public Start(): void {

        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public Move(): void {
            this.position = new math.Vec2(this.x, this.y - 7);
            if(this.y < 0)
            {
                this.Destroy();
            }
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
