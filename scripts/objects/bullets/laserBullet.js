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
    var LaserBullet = /** @class */ (function (_super) {
        __extends(LaserBullet, _super);
        function LaserBullet(x, y, bulletDirection, bulletHandler) {
            var _this = _super.call(this, x, y, config.BulletType.LASER, bulletHandler) || this;
            _this.bulletType = config.BulletType.MACHINEGUN;
            _this.position = new math.Vec2(x, y);
            _this.bulletHandler = bulletHandler;
            _this.bulletDirection = bulletDirection;
            _this.Start();
            return _this;
        }
        LaserBullet.prototype.OnCollision = function (obj) {
            var playScene = this.bulletHandler.playScene;
            if (obj instanceof objects.Enemy) {
                this.checkSpawnItem(obj);
                obj.Destroy();
                this.Destroy();
                var points = obj instanceof objects.Lizard ? 300 : 100;
                playScene.score.addPoints(points);
            }
        };
        LaserBullet.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        LaserBullet.prototype.Move = function () {
            var player = this.bulletHandler.playScene.player;
            var bulletDirection = this.bulletDirection;
            var x = 0;
            var y = 0;
            if (bulletDirection == config.BulletDirection.NORTH) {
                x = this.x;
                y = this.y - 7;
            }
            else if (bulletDirection == config.BulletDirection.NORTHWEST) {
                x = this.x - 5;
                y = this.y - 5;
            }
            else if (bulletDirection == config.BulletDirection.NORTHEAST) {
                x = this.x + 5;
                y = this.y - 5;
            }
            this.position = new math.Vec2(x, y);
            //this.x = x;
            //this.y = y;
            if (this.y < 0) {
                this.Destroy();
            }
        };
        LaserBullet.prototype.Destroy = function () {
            this.bulletHandler.DestroyBullet(this);
        };
        return LaserBullet;
    }(objects.PlayerBullet));
    objects.LaserBullet = LaserBullet;
})(objects || (objects = {}));
//# sourceMappingURL=laserBullet.js.map