var objects;
(function (objects) {
    var EnemyBulletHandler = /** @class */ (function () {
        function EnemyBulletHandler(playScene) {
            this.playScene = playScene;
            this.bullets = new Object;
        }
        EnemyBulletHandler.prototype.SpawnBullet = function (enemy) {
            var playerPos = new math.Vec2(this.playScene.player.x, this.playScene.player.y);
            var enemyPos = new math.Vec2(enemy.x, enemy.y);
            var bullet = new objects.EnemyBullet(enemyPos, playerPos, enemy, this);
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
    objects.EnemyBulletHandler = EnemyBulletHandler;
})(objects || (objects = {}));
//# sourceMappingURL=enemyBulletHandler.js.map