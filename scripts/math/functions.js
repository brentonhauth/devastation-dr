var math;
(function (math) {
    var PI_OVER_180 = Math.PI / 180;
    function cosWaveFunction(stretch, depth) {
        var o = { stretch: stretch, depth: depth };
        o.fn = function (val) {
            if (o.stretch === 0) {
                return o.depth;
            }
            return Math.cos(val / o.stretch) * o.depth;
        };
        return o.fn;
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
            min = Math.round(min);
        }
        if (max % 1) {
            max = Math.round(max);
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
        if (bias === void 0) { bias = 2; }
        return Math.random() <= (1 / Math.abs(bias));
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