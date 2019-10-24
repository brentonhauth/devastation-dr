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
    // change so that Spider extends Enemy
    var Spider = /** @class */ (function (_super) {
        __extends(Spider, _super);
        function Spider(enemyHandler) {
            if (enemyHandler === void 0) { enemyHandler = null; }
            var _this = _super.call(this, "spider") || this;
            _this.enemyHandler = enemyHandler;
            var bounds = _this.sprite.getBounds();
            _this.width = bounds.width;
            _this.height = bounds.height;
            _this.Init();
            _this.Start();
            return _this;
        }
        Spider.prototype.Start = function () {
            // this.x = 320;
            // this.y = -50;
            this.Reset();
        };
        Spider.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Spider.prototype.Reset = function () {
            this.movementSeed = Math.random();
            this.yCenterAxis = math.randRange(250, 350);
            this.cosWave = math.cosWaveFunction(math.randRange(20, 50), math.randRange(50, 250));
            var x = Math.floor(Math.random() * 550) + 50;
            var y = Math.floor(Math.random() * -800) - 50;
            this.position = new math.Vec2(x, y);
        };
        Spider.prototype.Move = function () {
            var y = this.y + 1;
            var x = this.cosWave(y) + this.yCenterAxis;
            this.position = new math.Vec2(x, y);
        };
        Spider.prototype.CheckBounds = function () {
            if (this.y >= 900 + this.halfH + 5) {
                this.Reset();
            }
        };
        return Spider;
    }(objects.Enemy));
    objects.Spider = Spider;
})(objects || (objects = {}));
//# sourceMappingURL=spider.js.map