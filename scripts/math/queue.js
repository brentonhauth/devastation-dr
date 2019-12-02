var math;
(function (math) {
    var Queue = /** @class */ (function () {
        function Queue() {
            this.array = new Array();
        }
        Queue.prototype.push = function () {
            var _this = this;
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            items.forEach(function (item) {
                _this.array.push(item);
            });
        };
        Queue.prototype.pop = function (amount) {
            if (amount <= 0) {
                return []; // this.array.shift();
            }
            var popped = new Array();
            for (var i = 0; i < amount; i++) {
                var e = this.array.shift();
                if (e !== undefined) {
                    popped.push(e);
                }
                else
                    break;
            }
            return popped;
        };
        return Queue;
    }());
    math.Queue = Queue;
})(math || (math = {}));
//# sourceMappingURL=queue.js.map