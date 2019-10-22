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
    var EnemyBulletHandler = /** @class */ (function (_super) {
        __extends(EnemyBulletHandler, _super);
        function EnemyBulletHandler(playScene) {
            return _super.call(this, playScene) || this;
        }
        EnemyBulletHandler.prototype.SpawnBullet = function (enemy) {
            var bullet = new objects.EnemyBullet(enemy.position, this.playScene.player.position, enemy, this);
            this.bullets[bullet.bulletID] = bullet;
            return bullet;
        };
        EnemyBulletHandler.prototype.Update = function () {
            for (var key in this.bullets) {
                var bullet = this.bullets[key];
                bullet.Update();
            }
        };
        EnemyBulletHandler.prototype.CheckCollision = function (obj) {
            for (var key in this.bullets) {
                var bullet = this.bullets[key];
                managers.Collision.Check(obj, bullet);
            }
        };
        EnemyBulletHandler.prototype.DestroyBullet = function (bullet) {
            delete this.bullets[bullet.bulletID];
            this.playScene.removeChild(bullet);
        };
        return EnemyBulletHandler;
    }(handlers.BulletHandler));
    handlers.EnemyBulletHandler = EnemyBulletHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=enemyBulletHandler.js.map