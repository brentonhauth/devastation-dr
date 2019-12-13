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
    var MachineGun = /** @class */ (function (_super) {
        __extends(MachineGun, _super);
        function MachineGun(playScene) {
            var _this = _super.call(this, config.Weapon.MACHINEGUN) || this;
            _this.playScene = playScene;
            return _this;
        }
        MachineGun.prototype.Shoot = function () {
            var player = this.playScene.player;
            var bulletType = config.BulletType.MACHINEGUN;
            if (this.upgradeLevel == 1) {
                var position1 = new math.Vec2(player.x, player.y);
                var bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
                this.playScene.addChild(bullet1);
            }
            else if (this.upgradeLevel == 2) {
                var position1 = new math.Vec2(player.x - 15, player.y);
                var position2 = new math.Vec2(player.x + 15, player.y);
                var bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
                var bullet2 = this.playScene.playerBulletHandler.SpawnBullet(position2, bulletType, config.BulletDirection.NORTH);
                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
            }
            else if (this.upgradeLevel == 3) {
                var position1 = new math.Vec2(player.x - 30, player.y);
                var position2 = new math.Vec2(player.x + 30, player.y);
                var position3 = new math.Vec2(player.x, player.y);
                var bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
                var bullet2 = this.playScene.playerBulletHandler.SpawnBullet(position2, bulletType, config.BulletDirection.NORTH);
                var bullet3 = this.playScene.playerBulletHandler.SpawnBullet(position3, bulletType, config.BulletDirection.NORTH);
                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
                this.playScene.addChild(bullet3);
            }
            else if (this.upgradeLevel >= 4) {
                var position1 = new math.Vec2(player.x - 30, player.y);
                var position2 = new math.Vec2(player.x + 30, player.y);
                var position3 = new math.Vec2(player.x, player.y);
                var position4 = new math.Vec2(player.x - 30, player.y + 15);
                var position5 = new math.Vec2(player.x + 30, player.y + 15);
                var bullet1 = this.playScene.playerBulletHandler.SpawnBullet(position1, bulletType, config.BulletDirection.NORTH);
                var bullet2 = this.playScene.playerBulletHandler.SpawnBullet(position2, bulletType, config.BulletDirection.NORTH);
                var bullet3 = this.playScene.playerBulletHandler.SpawnBullet(position3, bulletType, config.BulletDirection.NORTH);
                var bullet4 = this.playScene.playerBulletHandler.SpawnBullet(position4, bulletType, config.BulletDirection.NORTHWEST);
                var bullet5 = this.playScene.playerBulletHandler.SpawnBullet(position5, bulletType, config.BulletDirection.NORTHEAST);
                this.playScene.addChild(bullet1);
                this.playScene.addChild(bullet2);
                this.playScene.addChild(bullet3);
                this.playScene.addChild(bullet4);
                this.playScene.addChild(bullet5);
            }
        };
        return MachineGun;
    }(objects.Weapon));
    objects.MachineGun = MachineGun;
})(objects || (objects = {}));
//# sourceMappingURL=machineGun.js.map