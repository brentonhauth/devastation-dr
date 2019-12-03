var math;
(function (math) {
    // type ObjectType = ;
    var Pool = /** @class */ (function () {
        function Pool(type, limit) {
            this.limit = 0;
            this.arr = new Array();
            var typeDef, limitGt0;
            if (typeDef = !!type) {
                this.type = type;
            }
            if (limitGt0 = (limit > 0)) {
                this.limit = limit;
            }
            // if (typeDef && limitGt0) {
            //     this.IncreasePool(limit);
            // }
        }
        Object.defineProperty(Pool.prototype, "size", {
            get: function () {
                return this.arr.length;
            },
            enumerable: true,
            configurable: true
        });
        Pool.prototype.push = function () {
            var _a;
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            return (_a = this.arr).push.apply(_a, items);
        };
        Pool.prototype.pop = function (amount) {
            if (!amount || amount < 0) {
                return [this.arr.shift()];
            }
            var popped = [];
            for (var i = 0; i < amount; i++) {
                var item = this.arr.shift();
                if (item === undefined) {
                    return popped;
                }
                popped.push(item);
            }
            return popped;
        };
        Pool.prototype.forEach = function (iter) {
            this.arr.forEach(iter);
        };
        Pool.prototype.IncreasePool = function (amount) {
            if (!this.type || !amount || amount < 0) {
                return [];
            }
            // let added: T[] = [],
            var type = this.type;
            for (var i = 0; i < amount; i++) {
                var item = new type();
                this.arr.push(item);
            }
        };
        Pool.prototype.More = function (amount) {
            if (!amount || amount < 0) {
                return [];
            }
            var added = [], type = this.type;
            for (var i = 0; i < amount; i++) {
                var item = new type();
                added.push(item);
            }
            return added;
        };
        return Pool;
    }());
    math.Pool = Pool;
    // let p = new Pool<objects.Jackal>();
})(math || (math = {}));
//# sourceMappingURL=pool.js.map