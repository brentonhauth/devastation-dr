var math;
(function (math) {
    var PI_OVER_180 = Math.PI / 180;
    function cosWaveFunction(stretch, depth) {
        var o = { stretch: stretch, depth: depth };
        o.fn = function (val) {
            if (o.stretch == 0) {
                return o.depth;
            }
            return Math.cos(val / o.stretch) * o.depth;
        };
        return o.fn;
    }
    math.cosWaveFunction = cosWaveFunction;
    function randRange(min, max) {
        var _a;
        if (max === void 0) { max = null; }
        if (max === null) {
            _a = [0, min], min = _a[0], max = _a[1];
        }
        var r = Math.random() * (max - min);
        return min + r;
    }
    math.randRange = randRange;
    function pointOnCircle(center, degree) {
        var radian = degree * PI_OVER_180;
        var x = center.x + Math.cos(radian);
        var y = center.y + Math.sin(radian);
        return new math.Vec2(x, y);
    }
    math.pointOnCircle = pointOnCircle;
})(math || (math = {}));
//# sourceMappingURL=functions.js.map