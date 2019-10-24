var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var handlers;
(function (handlers) {
    var PlayerBulletHandler = /** @class */ (function (_super) {
        __extends(PlayerBulletHandler, _super);
        function PlayerBulletHandler(playScene) {
            return _super.call(this, playScene) || this;
        }
        PlayerBulletHandler.prototype.SpawnBullet = function () {
            var player = this.playScene.player;
            var bullet = new objects.PlayerBullet(player.x, player.y, this);
            this.bullets[bullet.id] = bullet;
            return bullet;
        };
        PlayerBulletHandler.prototype.CheckCollision = function (enemies) {
            var _loop_1 = function (key) {
                var b = this_1.bullets[key];
                enemies.forEach(function (e) {
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
        PlayerBulletHandler.prototype.DestroyBullet = function (bullet) {
            delete this.bullets[bullet.id];
            this.playScene.removeChild(bullet);
        };
        return PlayerBulletHandler;
    }(handlers.BulletHandler));
    handlers.PlayerBulletHandler = PlayerBulletHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=playerBulletHandler.js.map