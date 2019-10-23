var math;
(function (math) {
    var Vec2 /*extends createjs.Point*/ = /** @class */ (function () {
        function Vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            // super(x, y);
            this.x = x;
            this.y = y;
        }
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
        Vec2.Distance = function (P1, P2) {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        };
        Vec2.Difference = function (a, b) {
            return new math.Vec2(a.x - b.x, a.y - b.y);
        };
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
            },
            enumerable: true,
            configurable: true
        });
        return Vec2;
    }());
    math.Vec2 = Vec2;
})(math || (math = {}));
//# sourceMappingURL=vec2.js.map