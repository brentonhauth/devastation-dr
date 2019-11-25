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
    var FlamethrowerBulletHandler = /** @class */ (function (_super) {
        __extends(FlamethrowerBulletHandler, _super);
        function FlamethrowerBulletHandler(playScene) {
            return _super.call(this, playScene) || this;
        }
        FlamethrowerBulletHandler.prototype.SpawnBullet = function (position, bulletType) {
            var bullet;
            if (!this.isActive) {
                bullet = new objects.FlamethrowerBullet(position.x, position.y, bulletType, this);
                this.bullets[bullet.id] = bullet;
                this.activeFlame = bullet;
                this.isActive = true;
            }
            else {
                bullet = this.activeFlame;
            }
            return bullet;
        };
        FlamethrowerBulletHandler.prototype.CheckCollision = function (enemies) {
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
        FlamethrowerBulletHandler.prototype.DestroyBullet = function (bullet) {
            delete this.bullets[bullet.id];
            this.playScene.removeChild(bullet);
        };
        FlamethrowerBulletHandler.prototype.StopFlame = function () {
            if (this.isActive) {
                delete this.bullets[this.activeFlame.id];
                this.playScene.removeChild(this.activeFlame);
                this.isActive = false;
            }
        };
        return FlamethrowerBulletHandler;
    }(handlers.BulletHandler));
    handlers.FlamethrowerBulletHandler = FlamethrowerBulletHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=flamethrowerBulletHandler.js.map