var math;
(function (math) {
    var PI_OVER_180 = Math.PI / 180;
    var ZERO_FN = function () { return 0; };
    function cosWaveFunction(stretch, depth) {
        if (stretch === 0) {
            return ZERO_FN;
        }
        var o = { stretch: stretch, depth: depth };
        return o.fn = function (val) {
            return Math.cos(val / o.stretch) * o.depth;
        };
    }
    math.cosWaveFunction = cosWaveFunction;
    function randRange(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        var rnd = Math.random() * (max - min);
        return min + rnd;
    }
    math.randRange = randRange;
    function randInt(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        else if (min % 1) {
            min >>= 0;
        }
        if (max % 1) {
            max >>= 0;
        }
        var rnd = Math.random() * (max - min);
        return min + Math.round(rnd);
    }
    math.randInt = randInt;
    /**
     *
     * @param {Number|[Number, Number]} x Range for the x value
     * @param {Number|[Number, Number]} y Range for the y value
     */
    function randVec2(x, y) {
        return new math.Vec2(typeof x !== 'number' ?
            randRange(x[0], x[1]) :
            randRange(x), typeof y !== 'number' ?
            randRange(y[0], y[1]) :
            randRange(y));
    }
    math.randVec2 = randVec2;
    /**
     * Random odds
     * @example
     * math.oneIn(2); // 50% chance to return true
     * math.oneIn();
     *
     * math.oneIn(8); // 12.5% chance to return true
     * math.oneIn(1); // will always return true
     * math.oneIn(1.5) // ~66.7% chance to return true
     * @param {Number} bias
     */
    function oneIn(bias) {
        return Math.random() <= (1 / Math.abs(bias || 2));
    }
    math.oneIn = oneIn;
    function pointOnCircle(center, degree) {
        var radian = degree * PI_OVER_180;
        var x = center.x + Math.cos(radian);
        var y = center.y + Math.sin(radian);
        return new math.Vec2(x, y);
    }
    math.pointOnCircle = pointOnCircle;
})(math || (math = {}));
//# sourceMappingURL=functions.js.map