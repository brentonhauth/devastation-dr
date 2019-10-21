// start of collision detection
var math;
(function (math) {
    var AABB = /** @class */ (function () {
        function AABB(min, max) {
            this.min = min;
            this.max = max;
        }
        AABB.Intersect = function (a, b) {
            if (a.max.x < b.min.x || a.min.x > b.max.x) {
                return false;
            }
            else if (a.max.y < b.min.y || a.min.y > b.max.y) {
                return false;
            }
            else {
                return true;
            }
        };
        return AABB;
    }());
    math.AABB = AABB;
})(math || (math = {}));
//# sourceMappingURL=aabb.js.map