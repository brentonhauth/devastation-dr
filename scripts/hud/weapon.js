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
var hud;
(function (hud) {
    var WeaponHUD = /** @class */ (function (_super) {
        __extends(WeaponHUD, _super);
        function WeaponHUD() {
            var _this = _super.call(this) || this;
            _this.weaponText = new ui.Label("Weapon level: 1", "16px", "Consolas", "#FFFFFF", 540, 30, true);
            _this.weaponImage = new createjs.Bitmap(objects.Game.assetManager.getResult("pistol"));
            _this.tempMap = new Object;
            _this.tempMap[config.Weapon.MACHINEGUN] = "machineGun";
            _this.tempMap[config.Weapon.PISTOL] = "pistol";
            _this.tempMap[config.Weapon.LASER] = "machineGun";
            _this.tempMap[config.Weapon.FLAMETHROWER] = "machineGun";
            _this.weaponImage.x = 640;
            _this.weaponImage.y = 20;
            _this.weaponText.x = 640;
            _this.weaponText.y = 70;
            _this.addChild(_this.weaponImage);
            _this.addChild(_this.weaponText);
            return _this;
        }
        WeaponHUD.prototype.updateWeapon = function (weapon) {
            this.removeChild(this.weaponImage);
            var imageString = this.tempMap[weapon.weaponType];
            this.weaponImage = new createjs.Bitmap(objects.Game.assetManager.getResult(imageString));
            this.weaponImage.x = 640;
            this.weaponImage.y = 30;
            this.addChild(this.weaponImage);
            this.weaponText.text = "Weapon level: " + String(weapon.upgradeLevel);
            //this.weaponImage.image = objects.Game.assetManager.getResult(imageString)
        };
        WeaponHUD.savedScore = 0;
        WeaponHUD.currentScore = 0;
        return WeaponHUD;
    }(createjs.Container));
    hud.WeaponHUD = WeaponHUD;
})(hud || (hud = {}));
//# sourceMappingURL=weapon.js.map