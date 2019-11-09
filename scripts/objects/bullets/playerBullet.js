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
    var PlayerBullet = /** @class */ (function (_super) {
        __extends(PlayerBullet, _super);
        function PlayerBullet(x, y, bulletType, bulletHandler) {
            var _this = _super.call(this, x, y, bulletType) || this;
            _this.position = new math.Vec2(x, y);
            _this.bulletHandler = bulletHandler;
            _this.Start();
            return _this;
        }
        PlayerBullet.prototype.OnCollision = function (obj) {
            var playScene = this.bulletHandler.playScene;
            if (obj instanceof objects.Enemy || obj instanceof objects.Spider) {
                playScene.AddEnemyItem(obj);
                obj.Destroy();
                this.Destroy();
                var points = obj instanceof objects.Lizard ? 300 : 100;
                playScene.score.addPoints(points);
            }
        };
        PlayerBullet.prototype.Destroy = function () {
            this.bulletHandler.DestroyBullet(this);
        };
        return PlayerBullet;
    }(objects.Bullet));
    objects.PlayerBullet = PlayerBullet;
})(objects || (objects = {}));
//# sourceMappingURL=playerBullet.js.map