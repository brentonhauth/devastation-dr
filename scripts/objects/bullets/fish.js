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
    var Fish = /** @class */ (function (_super) {
        __extends(Fish, _super);
        // private sprite: createjs.Bitmap;
        function Fish(enemy, player) {
            var _this = _super.call(this, enemy.position, player.position, enemy, objects.Game.currentScene.enemyBulletHandler) || this;
            _this.speed = 2.75;
            _this.width = 20;
            _this.height = 20;
            _this.Init();
            _this.removeChild(_this.sprite);
            _this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult("fish"));
            _this.addChild(_this.sprite);
            _this.sprite.regX = 18;
            _this.sprite.regY = 8;
            _this.sprite.x = 9;
            _this.sprite.y = 4;
            return _this;
        }
        Fish.prototype.Update = function () {
            _super.prototype.Update.call(this);
            this.sprite.rotation += 5;
            if (this.sprite.rotation >= 354) {
                this.sprite.rotation = 0;
            }
        };
        return Fish;
    }(objects.EnemyBullet));
    objects.Fish = Fish;
})(objects || (objects = {}));
//# sourceMappingURL=fish.js.map