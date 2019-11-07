var handlers;
(function (handlers) {
    var EnemyItemHandler = /** @class */ (function () {
        function EnemyItemHandler(playScene) {
            this.playScene = playScene;
            this.items = new Object;
        }
        EnemyItemHandler.prototype.SpawnItem = function (enemy) {
            var item = new objects.EnemyItem(enemy, this);
            this.items[item.itemID] = item;
            return item;
        };
        EnemyItemHandler.prototype.Update = function () {
            for (var key in this.items) {
                var item = this.items[key];
                item.Update();
            }
        };
        EnemyItemHandler.prototype.CheckCollision = function (obj) {
            for (var key in this.items) {
                var item = this.items[key];
                managers.Collision.Check(obj, item);
            }
        };
        EnemyItemHandler.prototype.DestroyItem = function (item) {
            delete this.items[item.id];
            this.playScene.removeChild(item);
        };
        return EnemyItemHandler;
    }());
    handlers.EnemyItemHandler = EnemyItemHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=enemyItemHandler.js.map