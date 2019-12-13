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
    var Flamethrower = /** @class */ (function (_super) {
        __extends(Flamethrower, _super);
        function Flamethrower(playScene) {
            var _this = _super.call(this, config.Weapon.FLAMETHROWER) || this;
            _this.playScene = playScene;
            return _this;
        }
        Flamethrower.prototype.Shoot = function () {
            var player = this.playScene.player;
            var bulletType = config.BulletType.FLAMETHROWER;
            if (this.upgradeLevel == 1) {
                var position1 = new math.Vec2(player.x, player.y - player.height);
                //let bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType);
                var bullet1 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
                this.playScene.addChild(bullet1);
            }
            else if (this.upgradeLevel == 2) {
                var position1 = new math.Vec2(player.x, player.y - player.height);
                var position2 = new math.Vec2(player.x, player.y - player.height);
                var bullet1 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
                var bullet2 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position2, bulletType, config.BulletDirection.EAST);
                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
            }
            else if (this.upgradeLevel >= 3) {
                var position1 = new math.Vec2(player.x, player.y - player.height);
                var position2 = new math.Vec2(player.x, player.y - player.height);
                var position3 = new math.Vec2(player.x, player.y - player.height);
                var bullet1 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
                var bullet2 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position2, bulletType, config.BulletDirection.EAST);
                var bullet3 = this.playScene.flamethrowerBulletHandler.SpawnBullet(position3, bulletType, config.BulletDirection.WEST);
                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
                this.playScene.addChild(bullet3);
            }
            this.isShooting = true;
        };
        Flamethrower.prototype.stopShooting = function () {
            this.isShooting = false;
            this.playScene.flamethrowerBulletHandler.StopFlame();
        };
        return Flamethrower;
    }(objects.Weapon));
    objects.Flamethrower = Flamethrower;
})(objects || (objects = {}));
//# sourceMappingURL=flamethrower.js.map