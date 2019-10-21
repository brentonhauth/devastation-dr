var handlers;
(function (handlers) {
    var EnemyBulletHandler = /** @class */ (function () {
        function EnemyBulletHandler(playScene) {
            this.playScene = playScene;
            this.bullets = new Object;
        }
        EnemyBulletHandler.prototype.SpawnBullet = function (enemy) {
            var bullet = new objects.EnemyBullet(enemy.position, this.playScene.player.position, enemy, this);
            this.bullets[String(bullet.bulletID)] = bullet;
            return bullet;
        };
        EnemyBulletHandler.prototype.Update = function () {
            for (var key in this.bullets) {
                var bullet = this.bullets[key];
                bullet.Update();
            }
        };
        EnemyBulletHandler.prototype.CheckCollision = function () {
            for (var key in this.bullets) {
                var bullet = this.bullets[key];
                managers.Collision.Check(this.playScene.player, bullet);
            }
        };
        EnemyBulletHandler.prototype.DestroyBullet = function (bullet) {
            delete this.bullets[bullet.bulletID];
            this.playScene.RemoveEnemyBullet(bullet);
        };
        return EnemyBulletHandler;
    }());
    handlers.EnemyBulletHandler = EnemyBulletHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=enemyBulletHandler.js.map