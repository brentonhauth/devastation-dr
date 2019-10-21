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
        AABB.Overlap = function (abox, bbox) {
            var over = new math.Vec2(0, 0);
            var checkedMinX = abox.min.x < bbox.max.x && abox.min.x > bbox.min.x;
            var checkedMaxX = abox.max.x > bbox.min.x && abox.max.x < bbox.max.x;
            var xorX = checkedMinX !== checkedMaxX;
            if (xorX) {
                over.x = checkedMinX ?
                    (abox.min.x - bbox.max.x) :
                    (abox.max.x - bbox.min.x);
            }
            var checkedMinY = abox.min.y < bbox.max.y && abox.min.y > bbox.min.y;
            var checkedMaxY = abox.max.y > bbox.min.y && abox.max.y < bbox.max.y;
            var xorY = checkedMinY !== checkedMaxY;
            if (xorY) {
                over.y = checkedMinY ?
                    (abox.min.y - bbox.max.y) :
                    (abox.max.y - bbox.min.y);
            }
            if (xorX && xorY) {
                if (Math.abs(over.x) < Math.abs(over.y)) {
                    over.y = 0;
                }
                else {
                    over.x = 0;
                }
            }
            return over;
        };
        return AABB;
    }());
    math.AABB = AABB;
})(math || (math = {}));
//# sourceMappingURL=aabb.js.map