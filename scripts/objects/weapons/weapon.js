var objects;
(function (objects) {
    var Weapon = /** @class */ (function () {
        function Weapon(weaponType) {
            this.weaponType = weaponType;
            this.upgradeLevel = 1;
        }
        Weapon.prototype.Upgrade = function () {
            this.upgradeLevel++;
        };
        Weapon.prototype.Shoot = function () { };
        return Weapon;
    }());
    objects.Weapon = Weapon;
})(objects || (objects = {}));
//# sourceMappingURL=weapon.js.map