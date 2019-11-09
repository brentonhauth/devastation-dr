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
        function EnemyBullet(pos, target, spawnedFrom, bulletHandler, bulletType) {
            if (bulletType === void 0) { bulletType = config.BulletType.ENEMYBULLET; }
            var _this = _super.call(this, pos.x, pos.y, config.BulletType.ENEMYBULLET) || this;
            _this.speed = 3;
            _this.bulletHandler = bulletHandler;
            _this.spawnedFrom = spawnedFrom;
            // this.Init();
            // this.position = pos;
            // this.x = pos.x;
            // this.y = pos.y;
            _this.dir = math.Vec2.Difference(target, pos).Normalized;
            return _this;
        }
        EnemyBullet.prototype.Update = function () {
            this.position = this.position.Add(this.dir.Scale(this.speed));
            this.CheckBound();
        };
        EnemyBullet.prototype.CheckBound = function () {
            if (this.x > 800 || this.x < 0 ||
                this.y > 900 || this.y < 0) {
                this.Destroy();
            }
        };
        EnemyBullet.prototype.Destroy = function () {
            this.bulletHandler.DestroyBullet(this);
        };
        return EnemyBullet;
    }(objects.Bullet));
    objects.EnemyBullet = EnemyBullet;
})(objects || (objects = {}));
//# sourceMappingURL=enemyBullet.js.map