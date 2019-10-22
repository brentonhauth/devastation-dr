var handlers;
(function (handlers) {
    var EnemyHandler = /** @class */ (function () {
        function EnemyHandler(playScene) {
            this.enemyNum = 5;
            this.enemies = new Array(0);
            this.playScene = playScene;
            this.SpawnEnemies();
        }
        EnemyHandler.prototype.Update = function () {
            this.enemies.forEach(function (e) {
                e.Update();
            });
        };
        EnemyHandler.prototype.CheckCollision = function (obj) {
            this.enemies.forEach(function (e) {
                //e.setLastPlayerPos(this.player.x, this.player.y);
                //e.Update();
                managers.Collision.Check(obj, e);
            });
        };
        EnemyHandler.prototype.SpawnEnemies = function () {
            for (var i = 0; i < this.enemyNum; i++) {
                if (i == 0) {
                    this.enemies.push(new objects.Lizard(this));
                }
                else {
                    this.enemies.push(new objects.Spider(this));
                }
            }
        };
        return EnemyHandler;
    }());
    handlers.EnemyHandler = EnemyHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=enemyHandler.js.map