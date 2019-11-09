module objects {
    export class EnemyItem extends objects.GameObject {


        public isDestroyed: boolean = false;
        private sprite: createjs.Bitmap;
        private speed: number = 3;
        public spawnedFrom: objects.Enemy;
        public itemHandler:handlers.EnemyItemHandler;
        public static counter: number = 1;
        public itemID: string;
        public itemType: config.Item;

        constructor(spawnedFrom:objects.Enemy, itemHandler:handlers.EnemyItemHandler) {
            super();

            this.itemType = config.Item.MACHINEGUN;
            this.itemID = String(EnemyItem.counter);
            EnemyItem.counter++;
            this.itemHandler = itemHandler;
            this.spawnedFrom = spawnedFrom;

            this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult("powerup"));
            this.addChild(this.sprite);
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.Init();
            
            this.position = new math.Vec2(spawnedFrom.x, spawnedFrom.boxCollider.aabb.max.y);
            this.Start();

        }


        public setInitialPosition(): void{

        }

        public Start(): void {

        }

        public Update() {
            this.position = new math.Vec2(this.x, this.y + this.speed);
            this.CheckBound();
        }

        public CheckBound(): void {
            if (this.x > 650 || this.x < 0 ||
                this.y > 900 || this.y < 0) {
                    this.Destroy();
            }
        }

        public Destroy(){
            this.itemHandler.DestroyItem(this);
        }

        public Move(): void {
            this.position = new math.Vec2(this.x, this.y - 7);
        }


        public OnCollision(obj: objects.GameObject): void {
 
        }

    }
}
