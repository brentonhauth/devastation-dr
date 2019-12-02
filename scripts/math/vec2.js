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
            return _super.call(this, x || 0, y || 0) || this;
        }
        Object.defineProperty(Vec2.prototype, "Magnitude", {
            // Properties
            get: function () {
                return Math.sqrt((this.x * this.x) + (this.y * this.y));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2.prototype, "Normalized", {
            get: function () {
                if (!this.x && !this.y) {
                    return math.Vec2.Zero;
                }
                var magSq = (this.x * this.x) + (this.y * this.y);
                if (magSq === 1) {
                    return this.clone();
                }
                else if (magSq) {
                    var mag = Math.sqrt(magSq);
                    return new Vec2(this.x / mag, this.y / mag);
                }
                else {
                    return Vec2.Zero;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2.prototype, "LiteralDirection", {
            get: function () {
                if (!this.x && !this.y) {
                    return config.Direction.None;
                }
                var norm = this.Normalized;
                if (Math.abs(norm.x) > Math.abs(norm.y)) {
                    return norm.x > 0 ? config.Direction.Right : config.Direction.Left;
                }
                else {
                    return norm.y > 0 ? config.Direction.Down : config.Direction.Up;
                }
            },
            enumerable: true,
            configurable: true
        });
        // Methods
        /**
         * Returns a new scaled Vector
         * @param {Number} s
         */
        Vec2.prototype.Scale = function (s) {
            return new Vec2(this.x * s, this.y * s);
        };
        /**
         * Scales the current Vector
         * @param {Number} s
         */
        Vec2.prototype.ScaleEq = function (s) {
            // this.x *= s;
            // this.y *= s;
            return this.setValues(this.x * s, this.y * s);
        };
        /**
         * Returns the sum of two Vectors
         * @example
         * // Use
         * vecA.Add(vecB);
         *
         * // instead of
         * vecA = math.Vec2.Sum(vecA, vecB);
         *
         * @param {Vec2} v
         */
        Vec2.prototype.Add = function (v) {
            return this.setValues(this.x + v.x, this.y + v.y);
        };
        // Static Methods
        Vec2.Sum = function (a, b) {
            return new Vec2(a.x + b.x, a.y + b.y);
        };
        Vec2.SumMany = function () {
            var vecs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                vecs[_i] = arguments[_i];
            }
            var sum = new math.Vec2(0, 0);
            vecs.forEach(function (v) {
                sum.x += v.x;
                sum.y += v.y;
            });
            return sum;
        };
        Vec2.Distance = function (a, b) {
            var x = a.x - b.x;
            var y = a.y - b.y;
            return Math.sqrt((x * x) + (y * y));
        };
        /**
         * Checks if the distance between 2 vectors is within a certain range.
         *
         * @example
         * // Use instead of:
         * Vec2.Distance(a, b) <= range
         * @param {Vec2} a
         * @param {Vec2} b
         * @param {Number} range
         */
        Vec2.WithinRange = function (a, b, range) {
            var x = a.x - b.x, y = a.y - b.y;
            range *= range;
            var disSq = (x * x) + (y * y);
            return disSq <= range;
        };
        Vec2.Difference = function (a, b) {
            return new math.Vec2(a.x - b.x, a.y - b.y);
        };
        /**
         * Returns the Normalized Difference of 2 Vectors
         * @example
         * // Use
         * var dir = math.Vec2.Direction(a, b);
         *
         * // instead of
         * var dir = math.Vec2.Difference(a, b).Normalized;
         * @param {Vec2} a
         * @param {Vec2} b
         */
        Vec2.Direction = function (a, b) {
            var x = a.x - b.x;
            var y = a.y - b.y;
            if (!x && !y) {
                return math.Vec2.Zero;
            }
            var mag = Math.sqrt((x * x) + (y * y));
            return new Vec2(x / mag, y / mag);
        };
        Object.defineProperty(Vec2, "Zero", {
            get: function () {
                return new Vec2(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2, "Up", {
            get: function () {
                return new Vec2(0, -1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2, "Down", {
            get: function () {
                return new Vec2(0, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2, "Left", {
            get: function () {
                return new Vec2(-1, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2, "Right", {
            get: function () {
                return new Vec2(1, 0);
            },
            enumerable: true,
            configurable: true
        });
        return Vec2;
    }(createjs.Point));
    math.Vec2 = Vec2;
})(math || (math = {}));
//# sourceMappingURL=vec2.js.map