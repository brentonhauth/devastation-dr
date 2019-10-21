var handlers;
(function (handlers) {
    var PlayerBulletHandler = /** @class */ (function () {
        function PlayerBulletHandler(playScene) {
            this.playScene = playScene;
            this.bullets = new Object;
        }
        PlayerBulletHandler.prototype.SpawnBullet = function () {
            var player = this.playScene.player;
            var bullet = new objects.PlayerBullet(player.x, player.y, this);
            this.bullets[bullet.bulletID] = bullet;
            return bullet;
        };
        PlayerBulletHandler.prototype.CheckCollision = function () {
            var _loop_1 = function (key) {
                var b = this_1.bullets[key];
                this_1.playScene.enemyHandler.enemies.forEach(function (e) {
                    managers.Collision.Check(b, e);
                });
            };
            var this_1 = this;
            //this.bullets.forEach(b => {
            for (var key in this.bullets) {
                _loop_1(key);
            }
            ;
        };
        PlayerBulletHandler.prototype.Update = function () {
            for (var key in this.bullets) {
                var b = this.bullets[key];
                b.Update();
            }
            ;
        };
        PlayerBulletHandler.prototype.DestroyBullet = function (bullet) {
            delete this.bullets[bullet.bulletID];
            this.playScene.RemoveBullet(bullet);
        };
        return PlayerBulletHandler;
    }());
    handlers.PlayerBulletHandler = PlayerBulletHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=playerBulletHandler.js.map