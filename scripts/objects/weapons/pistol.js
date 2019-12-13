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
    var Pistol = /** @class */ (function (_super) {
        __extends(Pistol, _super);
        function Pistol(playScene) {
            var _this = _super.call(this, config.Weapon.PISTOL) || this;
            _this.playScene = playScene;
            return _this;
        }
        Pistol.prototype.Shoot = function () {
            var player = this.playScene.player;
            var bulletType = config.BulletType.PISTOL;
            var position = new math.Vec2(player.x, player.y);
            player.position;
            var bullet = this.playScene.playerBulletHandler.SpawnBullet(position, bulletType);
            this.playScene.addChild(bullet);
        };
        return Pistol;
    }(objects.Weapon));
    objects.Pistol = Pistol;
})(objects || (objects = {}));
//# sourceMappingURL=pistol.js.map