var math;
(function (math) {
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
})(math || (math = {}));
//# sourceMappingURL=functions.js.map