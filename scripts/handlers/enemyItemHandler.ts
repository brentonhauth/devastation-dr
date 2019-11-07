module handlers {
    export class EnemyItemHandler {

        public playScene: scenes.PlayScene;
        public items: any;

        constructor(playScene: scenes.PlayScene) {
            this.playScene = playScene;
            this.items = new Object;

        }

        public SpawnItem(enemy:objects.Enemy):objects.EnemyItem {
            let item = new objects.EnemyItem(enemy, this);
            this.items[item.itemID] = item;

            return item;
        }
        
        public Update() {
            for(let key in this.items)
            {
                let item = this.items[key];
                item.Update();
            }
        }

        public CheckCollision(obj: objects.GameObject){
            for(let key in this.items)
            {
                let item = this.items[key];
                managers.Collision.Check(obj, item); 
            }
        }

        public DestroyItem(item:objects.EnemyItem) {
            delete this.items[item.id];
            this.playScene.removeChild(item);
        }
    }
}
