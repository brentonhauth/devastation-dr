var handlers;
(function (handlers) {
    var BulletHandler = /** @class */ (function () {
        function BulletHandler(playScene) {
            this.playScene = playScene;
            this.bullets = {};
        }
        BulletHandler.prototype.Update = function () {
            for (var key in this.bullets) {
                var bullet = this.bullets[key];
                bullet.Update();
            }
        };
        BulletHandler.prototype.UpdateWithCallback = function (cb) {
            for (var key in this.bullets) {
                var bullet = this.bullets[key];
                bullet.Update();
                cb(bullet);
            }
        };
        BulletHandler.prototype.CheckCollision = function (obj) {
            var check = this.GetCheckFunction(obj);
            for (var key in this.bullets) {
                var b = this.bullets[key];
                check(b);
            }
        };
        BulletHandler.prototype.UpdateAndCheckCollision = function (obj) {
            var check = this.GetCheckFunction(obj);
            this.UpdateWithCallback(check);
        };
        BulletHandler.prototype.GetCheckFunction = function (obj) {
            if (Array.isArray(obj)) {
                return function (b) {
                    obj.forEach(function (o) {
                        managers.Collision.Check(o, b);
                    });
                };
            }
            else {
                return function (b) {
                    managers.Collision.Check(obj, b);
                };
            }
        };
        return BulletHandler;
    }());
    handlers.BulletHandler = BulletHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=bulletHandler.js.map