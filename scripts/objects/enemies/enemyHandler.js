var objects;
(function (objects) {
    var EnemyHandler = /** @class */ (function () {
        function EnemyHandler(playScene) {
            this.enemyNum = 5;
            this.enemies = new Array;
            this.playScene = playScene;
            this.SpawnEnemies();
        }
        EnemyHandler.prototype.Update = function () {
            this.enemies.forEach(function (e) {
                e.Update();
            });
        };
        EnemyHandler.prototype.CheckCollision = function () {
            var _this = this;
            this.enemies.forEach(function (e) {
                //e.setLastPlayerPos(this.player.x, this.player.y);
                //e.Update();
                managers.Collision.Check(_this.playScene.player, e);
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
    objects.EnemyHandler = EnemyHandler;
})(objects || (objects = {}));
//# sourceMappingURL=enemyHandler.js.map