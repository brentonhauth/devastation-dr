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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        function Bullet(x, y, bulletType) {
            var _this = _super.call(this) || this;
            _this.isDestroyed = false;
            _this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult("bullet"));
            _this.addChild(_this.sprite);
            var bounds = _this.sprite.getBounds();
            _this.width = bounds.width;
            _this.height = bounds.height;
            _this.Init();
            _this.position = new math.Vec2(x, y);
            _this.Start();
            return _this;
        }
        Bullet.prototype.setInitialPosition = function () {
        };
        Bullet.prototype.Start = function () {
        };
        Bullet.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Bullet.prototype.Move = function () {
            this.position = new math.Vec2(this.x, this.y - 7);
            if (this.y < 0) {
                this.Destroy();
            }
        };
        Bullet.prototype.CheckBounds = function () {
        };
        Bullet.prototype.Destroy = function () {
            this.isDestroyed = true;
        };
        Bullet.prototype.OnCollision = function (obj) {
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map