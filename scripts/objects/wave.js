var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var objects;
(function (objects) {
    var Wave = /** @class */ (function () {
        function Wave() {
            var enemies = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                enemies[_i] = arguments[_i];
            }
            this.enemies = new Array();
            this.behaviors = new Array();
            this.Add.apply(this, enemies);
            this.playScene = objects.Game.currentScene;
        }
        Object.defineProperty(Wave.prototype, "IsDone", {
            get: function () {
                return this.enemies.length === 0;
            },
            enumerable: true,
            configurable: true
        });
        Wave.prototype.Start = function () {
            var _this = this;
            this.enemies.forEach(function (e) { return _this.playScene.addChild(e); });
        };
        Wave.prototype.Update = function () {
            var _this = this;
            this.enemies.forEach(function (enemy, index) {
                var pos = enemy.position;
                enemy.Update();
                _this.behaviors.forEach(function (behavior) {
                    if (enemy instanceof behavior.type) {
                        enemy.position = behavior.cb(pos.x, pos.y, index);
                    }
                });
            });
        };
        Wave.prototype.CheckCollision = function (against) {
            var check;
            if (Array.isArray(against)) {
                check = function (e) {
                    against.forEach(function (obj) {
                        managers.Collision.Check(obj, e);
                    });
                };
            }
            else {
                check = function (e) {
                    managers.Collision.Check(against, e);
                };
            }
            this.enemies.forEach(check);
        };
        Wave.prototype.Add = function () {
            var _this = this;
            var enemies = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                enemies[_i] = arguments[_i];
            }
            enemies.forEach(function (e) {
                if (Array.isArray(e)) {
                    _this.AddAmount(e[0], e[1], e[2] || []);
                }
                else if (e instanceof objects.Enemy) {
                    _this.enemies.push(e);
                }
            });
            // this.enemies.push(...enemies);
        };
        Wave.prototype.AddAmount = function (type, amount, params) {
            if (params === void 0) { params = []; }
            for (var i = 0; i < amount; i++) {
                try {
                    var e = new (type.bind.apply(type, __spreadArrays([void 0], params)))();
                    if (e instanceof objects.Enemy) {
                        this.enemies.push(e);
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        };
        Wave.prototype.Behavior = function (type, cb) {
            this.behaviors.push({ type: type, cb: cb });
        };
        Wave.prototype.Remove = function (enemy) {
            var index = this.enemies.map(function (e) { return e.id; }).indexOf(enemy.id);
            if (index !== -1) {
                this.enemies.splice(index, 1);
                return this.playScene.removeChild(enemy);
            }
            return false;
        };
        return Wave;
    }());
    objects.Wave = Wave;
})(objects || (objects = {}));
//# sourceMappingURL=wave.js.map