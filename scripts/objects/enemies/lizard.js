var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Lizard = /** @class */ (function (_super) {
        __extends(Lizard, _super);
        function Lizard() {
            var _this = _super.call(this) || this;
            _this.scaleX *= 1.5;
            _this.scaleY *= 1.5;
            _this.lastPlayerPos = new math.Vec2();
            _this.enemyBullets = new Array(0);
            return _this;
        }
        Lizard.prototype.setLastPlayerPos = function (x, y) {
            this.lastPlayerPos = new math.Vec2(x, y);
        };
        Lizard.prototype.Update = function () {
            _super.prototype.Update.call(this);
            this.enemyBullets.forEach(function (eb) {
                if (!eb.isDestroyed) {
                    eb.Update();
                    if (objects.Game.currentSceneRef instanceof scenes.PlayScene) {
                        managers.Collision.Check(objects.Game.currentSceneRef.player, eb);
                    }
                }
            });
            var r = math.randRange(1, 30);
            if (Math.round(r) == 5) {
                this.spawnBullet();
            }
        };
        Lizard.prototype.spawnBullet = function () {
            console.log("spawned EB!");
            var eb = new objects.EnemyBullet(new math.Vec2(this.x, this.y), this.lastPlayerPos);
            objects.Game.currentSceneRef.addChild(eb);
            this.enemyBullets.push(eb);
        };
        return Lizard;
    }(objects.Spider));
    objects.Lizard = Lizard;
    var EnemyBullet = /** @class */ (function (_super) {
        __extends(EnemyBullet, _super);
        function EnemyBullet(pos, target) {
            var _this = _super.call(this, "bullet") || this;
            _this.speed = 3;
            _this.isDestroyed = false;
            _this.x = pos.x;
            _this.y = pos.y;
            var dx = target.x - pos.x;
            var dy = target.y - pos.y;
            var mag = Math.sqrt((dx * dx) + (dy * dy));
            if (mag != 0) {
                dx /= mag;
                dy /= mag;
            }
            _this.dir = new math.Vec2(dx, dy);
            return _this;
        }
        EnemyBullet.prototype.Update = function () {
            this.x += this.dir.x * this.speed;
            this.y += this.dir.y * this.speed;
        };
        EnemyBullet.prototype.CheckBound = function () {
            if (this.x > 650 || this.x < 0 ||
                this.y > 900 || this.y < 0) {
                this.Destroy();
            }
        };
        EnemyBullet.prototype.Destroy = function () {
            this.isDestroyed = true;
            try {
                objects.Game.currentSceneRef.removeChild(this);
                this.spawnedFrom.enemyBullets.shift();
            }
            catch (err) {
                console.log(err);
            }
        };
        return EnemyBullet;
    }(objects.GameObject));
    objects.EnemyBullet = EnemyBullet;
})(objects || (objects = {}));
//# sourceMappingURL=lizard.js.map