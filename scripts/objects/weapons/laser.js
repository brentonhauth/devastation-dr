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
    var Laser = /** @class */ (function (_super) {
        __extends(Laser, _super);
        function Laser(playScene) {
            var _this = _super.call(this, config.Weapon.LASER) || this;
            _this.playScene = playScene;
            return _this;
        }
        Laser.prototype.Shoot = function () {
            var player = this.playScene.player;
            var bulletType = config.BulletType.LASER;
            if (this.upgradeLevel == 1) {
                var position1 = new math.Vec2(player.x, player.y);
                var bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType);
                this.playScene.addChild(bullet1);
            }
            else if (this.upgradeLevel == 2) {
                var position1 = new math.Vec2(player.x - 15, player.y);
                var position2 = new math.Vec2(player.x + 15, player.y);
                var bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTHWEST);
                var bullet2 = this.playScene.playerBulletHandler.SpawnBullet(position2, bulletType, config.BulletDirection.NORTHEAST);
                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
            }
            else if (this.upgradeLevel >= 3) {
                var position1 = new math.Vec2(player.x - 30, player.y);
                var position2 = new math.Vec2(player.x + 30, player.y);
                var position3 = new math.Vec2(player.x, player.y);
                var bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTHWEST);
                var bullet2 = this.playScene.playerBulletHandler.SpawnBullet(position2, bulletType, config.BulletDirection.NORTHEAST);
                var bullet3 = this.playScene.playerBulletHandler.SpawnBullet(position3, bulletType);
                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
                this.playScene.addChild(bullet3);
            }
        };
        return Laser;
    }(objects.Weapon));
    objects.Laser = Laser;
})(objects || (objects = {}));
//# sourceMappingURL=laser.js.map