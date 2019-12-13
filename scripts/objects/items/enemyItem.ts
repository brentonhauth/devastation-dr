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
        public itemTypeString: String;
        public itemTypeMap = ["machineGun", "laser", "flamethrower", "shield", "life"];


        constructor(spawnedFrom:objects.Enemy, itemHandler:handlers.EnemyItemHandler) {
            super();

            this.itemID = String(EnemyItem.counter);
            EnemyItem.counter++;
            this.itemHandler = itemHandler;
            this.spawnedFrom = spawnedFrom;

            this.itemType = this.chooseItemType();
            this.itemTypeString = this.itemTypeMap[this.itemType];
            //console.log(this.itemTypeString);

            this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult("item_" + this.itemTypeString));
            this.addChild(this.sprite);
            let bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.Init();
            
            this.position = new math.Vec2(spawnedFrom.x, spawnedFrom.boxCollider.aabb.max.y);
            this.Start();

        }

        private chooseItemType(): config.Item{
            let rr = Math.floor(math.randRange(0, 5));
            //let itemType = config.Item[this.itemTypeMap[rr]];
            let itemType = config.Item.flamethrower;

            return itemType;
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
