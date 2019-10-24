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
var math;
(function (math) {
    var Vec2 = /** @class */ (function (_super) {
        __extends(Vec2, _super);
        // Variables
        // Constructor
        function Vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return _super.call(this, x, y) || this;
        }
        Object.defineProperty(Vec2.prototype, "Magnitude", {
            get: function () {
                return Math.sqrt((this.x * this.x) + (this.y * this.y));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2.prototype, "Normalized", {
            get: function () {
                var mag = this.Magnitude;
                if (mag != 0) {
                    return new Vec2(this.x / mag, this.y / mag);
                }
                else {
                    return Vec2.Zero;
                }
            },
            enumerable: true,
            configurable: true
        });
        Vec2.prototype.Scale = function (s) {
            return new Vec2(this.x * s, this.y * s);
        };
        Vec2.prototype.Add = function (v) {
            return Vec2.Sum(this, v);
        };
        // Static Methods
        Vec2.Sum = function (a, b) {
            return new Vec2(a.x + b.x, a.y + b.y);
        };
        Vec2.Distance = function (a, b) {
            var x = b.x - a.x;
            var y = b.y - a.y;
            return (x * x) + (y * y);
        };
        Vec2.Difference = function (a, b) {
            return new math.Vec2(a.x - b.x, a.y - b.y);
        };
        Object.defineProperty(Vec2, "Zero", {
            get: function () {
                return new Vec2(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        return Vec2;
    }(createjs.Point));
    math.Vec2 = Vec2;
})(math || (math = {}));
//# sourceMappingURL=vec2.js.map