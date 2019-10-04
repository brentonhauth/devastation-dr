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
var objects;
(function (objects) {
    var EnemyBullet = /** @class */ (function (_super) {
        __extends(EnemyBullet, _super);
        function EnemyBullet(pos, target) {
            var _this = _super.call(this, pos.x, pos.y, "enemyBullet") || this;
            _this.speed = 3;
            _this.isDestroyed = false;
            _this.x = pos.x;
            var dx = target.x - pos.x;
            var dy = target.y - pos.y;
            var mag = Math.sqrt((dx * dx) + (dy * dy));
            if (mag != 0) {
                dx /= mag;
                dy /= mag;
            }
            _this.dir = new math.Vec2(dx, dy);
            _this.y = pos.y;
            return _this;
        }
        EnemyBullet.prototype.Update = function () {
            this.x += this.dir.x * this.speed;
            this.y += this.dir.y * this.speed;
        };
        EnemyBullet.prototype.CheckBound = function () {
            if (this.x > 650 || this.x < 0 ||
                this.y > 900 || this.y < 0) {
                this.Destroy();
            }
        };
        EnemyBullet.prototype.Destroy = function () {
            this.isDestroyed = true;
            try {
                objects.Game.currentSceneRef.removeChild(this);
                this.spawnedFrom.enemyBullets.shift();
            }
            catch (err) {
                console.log(err);
            }
        };
        return EnemyBullet;
    }(objects.Bullet));
    objects.EnemyBullet = EnemyBullet;
})(objects || (objects = {}));
//# sourceMappingURL=enemyBullet.js.map