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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // Constructor
        function Enemy(enemyType) {
            var _this = _super.call(this) || this;
            _this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult(enemyType));
            _this.addChild(_this.sprite);
            var bounds = _this.sprite.getBounds();
            console.log(bounds.width + " x " + bounds.height);
            _this.width = bounds.width;
            _this.height = bounds.height;
            _this.Init();
            //this.pointsWorth = pointsWorth;
            _this.Start();
            return _this;
        }
        // Methods
        Enemy.prototype.Start = function () {
            this.Reset();
        };
        Enemy.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Enemy.prototype.Reset = function () {
            var x = Math.floor(Math.random() * 550) + 50;
            var y = Math.floor(Math.random() * -800) - 50;
            this.position = new math.Vec2(x, y);
        };
        // public Move():void {
        //     this.y += 5;
        // }
        Enemy.prototype.CheckBounds = function () {
            if (this.y >= 900 + this.halfH + 5) {
                this.Reset();
            }
        };
        Enemy.prototype.Destroy = function () {
            var cw, scene = objects.Game.currentScene;
            if (cw = scene.waveHandler.currentWave) {
                cw.Remove(this);
            }
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map