var objects;
(function (objects) {
    var EnemyBulletHandler = /** @class */ (function () {
        function EnemyBulletHandler(playScene) {
            this.playScene = playScene;
            this.enemyBullets = new Array();
        }
        EnemyBulletHandler.prototype.SpawnBullet = function (enemy) {
            var playerPos = new math.Vec2(this.playScene.player.x, this.playScene.player.y);
            var enemyPos = new math.Vec2(enemy.x, enemy.y);
            var enemyBullet = new objects.EnemyBullet(enemyPos, playerPos);
            this.enemyBullets.push(enemyBullet);
            return enemyBullet;
        };
        EnemyBulletHandler.prototype.Update = function () {
            this.enemyBullets.forEach(function (eb) {
                eb.Update();
            });
        };
        EnemyBulletHandler.prototype.CheckCollision = function () {
            var _this = this;
            this.enemyBullets.forEach(function (eb) {
                managers.Collision.Check(_this.playScene.player, eb);
            });
        };
        return EnemyBulletHandler;
    }());
    objects.EnemyBulletHandler = EnemyBulletHandler;
})(objects || (objects = {}));
//# sourceMappingURL=enemyBulletHandler.js.map