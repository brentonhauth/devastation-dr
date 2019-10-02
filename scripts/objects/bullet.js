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
        function Bullet() {
            var _this = _super.call(this, "bullet") || this;
            _this.isDestroyed = false;
            _this.Start();
            return _this;
        }
        Bullet.prototype.Start = function () {
            var _this = this;
            setTimeout(function () {
                _this.Destroy();
            }, 10 * 1000);
        };
        Bullet.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Bullet.prototype.Move = function () {
            this.y -= 7;
            //console.log('(' +this.x+', ' +this.y+')');
        };
        Bullet.prototype.CheckBounds = function () {
        };
        Bullet.prototype.Destroy = function () {
            this.isDestroyed = true;
        };
        Bullet.prototype.OnCollision = function (obj) {
            if (obj instanceof objects.Enemy) {
                obj.Reset();
                this.Destroy();
            }
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map