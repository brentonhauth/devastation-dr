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
    var PlayerBullet = /** @class */ (function (_super) {
        __extends(PlayerBullet, _super);
        function PlayerBullet(x, y, bulletType, bulletHandler, flameFix) {
            if (flameFix === void 0) { flameFix = 0; }
            var _this = _super.call(this, x, y, bulletType, flameFix) || this;
            _this.position = new math.Vec2(x, y);
            _this.bulletHandler = bulletHandler;
            _this.Start();
            return _this;
        }
        PlayerBullet.prototype.checkSpawnItem = function (obj) {
            var spawnItem = false;
            var playScene = this.bulletHandler.playScene;
            if (obj instanceof objects.Jackal) {
                // TODO: improve upon 'yoink' system with Jackals
                if (obj.yoinked) {
                    spawnItem = true;
                }
            }
            else {
                //let rr = Math.floor(math.randRange(1, 1));
                var rr = Math.floor(math.randRange(1, 5));
                if (rr == 1) {
                    spawnItem = true;
                }
            }
            if (spawnItem) {
                playScene.AddEnemyItem(obj);
            }
        };
        PlayerBullet.prototype.OnCollision = function (obj) {
            var playScene = this.bulletHandler.playScene;
            if (obj instanceof objects.Enemy) {
                var spawnItem = false;
                if (obj instanceof objects.Jackal) {
                    // TODO: improve upon 'yoink' system with Jackals
                    if (obj.yoinked) {
                        spawnItem = true;
                    }
                }
                else {
                    var rr = Math.floor(math.randRange(1, 1));
                    //let rr = Math.floor(math.randRange(1, 5));
                    if (rr == 1) {
                        spawnItem = true;
                    }
                }
                if (spawnItem) {
                    playScene.AddEnemyItem(obj);
                }
                obj.Destroy();
                this.Destroy();
                var points = obj instanceof objects.Lizard ? 300 : 100;
                playScene.score.addPoints(points);
            }
        };
        PlayerBullet.prototype.Destroy = function () {
            this.bulletHandler.DestroyBullet(this);
        };
        return PlayerBullet;
    }(objects.Bullet));
    objects.PlayerBullet = PlayerBullet;
})(objects || (objects = {}));
//# sourceMappingURL=playerBullet.js.map