var objects;
(function (objects) {
    var WaveID = 0;
    var Wave = /** @class */ (function () {
        function Wave() {
            var enemies = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                enemies[_i] = arguments[_i];
            }
            this.id = ++WaveID;
            this.enemies = new Array();
            this.behaviors = new Array();
            this.enemyAmounts = new Array();
            this.playScene = objects.Game.currentScene;
            this.waveHandler = this.playScene.waveHandler;
            this.Add.apply(this, enemies);
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
            this.enemyAmounts.forEach(function (ea) {
                var _a;
                var fromPool = _this.waveHandler.AcquireFromPool(ea);
                (_a = _this.enemies).push.apply(_a, fromPool);
            });
            this.enemies.forEach(function (e) {
                _this.playScene.addChild(e);
                e.Start();
            });
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
        Wave.prototype.UpdateAndCheckCollision = function (against) {
            var _this = this;
            var check;
            if (Array.isArray(against)) {
                check = function (e, index) {
                    var pos = e.position;
                    e.Update();
                    _this.behaviors.forEach(function (behavior) {
                        if (e instanceof behavior.type) {
                            e.position = behavior.cb(pos.x, pos.y, index);
                        }
                    });
                    against.forEach(function (obj) {
                        managers.Collision.Check(obj, e);
                    });
                };
            }
            else {
                check = function (e, index) {
                    var pos = e.position;
                    e.Update();
                    _this.behaviors.forEach(function (behavior) {
                        if (e instanceof behavior.type) {
                            e.position = behavior.cb(pos.x, pos.y, index);
                        }
                    });
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
                // if (Array.isArray(e)) {
                _this.AddAmount(e[0], e[1], e[2] || []);
                // } else if (e instanceof Enemy) {
                //     this.enemies.push(e);
                // }
            });
            return this;
        };
        Wave.prototype.AddAmount = function (type, amount, params) {
            if (params === void 0) { params = []; }
            var existing = null;
            if (amount <= 0) {
                return;
            }
            this.enemyAmounts.forEach(function (r) {
                if (r.type == type) {
                    r.amount += amount;
                    existing = r;
                }
            });
            if (!existing) {
                existing = { type: type, amount: amount };
                this.enemyAmounts.push(existing);
            }
            this.waveHandler.TallyAmount(existing);
            // for (let i = 0; i < amount; i++) {
            //     try {
            //         let e = new type(...params);
            //         if (e instanceof Enemy) {
            //             this.enemies.push(e);
            //         }
            //     } catch (err) {
            //         console.log(err);
            //     }
            // }
            return this;
        };
        Wave.prototype.Behavior = function (type, cb) {
            this.behaviors.push({ type: type, cb: cb });
            return this;
        };
        Wave.prototype.Remove = function (enemy) {
            var index = this.enemies.map(function (e) { return e.id; }).indexOf(enemy.id);
            if (index !== -1) {
                this.enemies.splice(index, 1);
                this.waveHandler.Pool(enemy);
                return this.playScene.removeChild(enemy);
            }
            return false;
        };
        return Wave;
    }());
    objects.Wave = Wave;
})(objects || (objects = {}));
//# sourceMappingURL=wave.js.map