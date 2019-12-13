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
            _this.Reset();
            return _this;
        }
        Spider.prototype.Start = function () {
            // this.x = 320;
            // this.y = -50;
        };
        Spider.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Spider.prototype.Reset = function () {
            this.yCenterAxis = math.randInt(150, 600);
            this.cosWave = math.cosWaveFunction(math.randInt(20, 50), math.randInt(50, 250));
            var y = math.randInt(-500, -50);
            this.health = 1;
            this.SetPosition(this.yCenterAxis, y);
        };
        Spider.prototype.Move = function () {
            var y = this.y + 1;
            if (y > Spider.yBounds) {
                this.Reset();
            }
            var x = this.cosWave(y) + this.yCenterAxis;
            this.SetPosition(x, y);
            // this.position = new math.Vec2(x, y);
        };
        Spider.yBounds = 870; // canvas.height + 400
        return Spider;
    }(objects.Enemy));
    objects.Spider = Spider;
})(objects || (objects = {}));
//# sourceMappingURL=spider.js.map