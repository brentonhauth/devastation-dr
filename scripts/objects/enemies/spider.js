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
        function Spider() {
            var _this = _super.call(this, "spider") || this;
            // this.scaleX *= .25;
            // this.scaleY *= .25;
            // this.halfW = this.width * .5;
            // this.halfH = this.height * .5;
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
            this.currentMovePatter = (Math.random() < .5) ? this.movementPattern01 : this.movementPattern02;
            this.x = Math.floor(Math.random() * 550) + 50;
            this.y = Math.floor(Math.random() * -800) - 50;
        };
        Spider.prototype.Move = function () {
            this.y += 1;
            this.x = this.cosWave(this.y) + this.yCenterAxis; //this.currentMovePatter() + 300;
        };
        Spider.prototype.CheckBounds = function () {
            if (this.y >= 900 + this.halfH + 5) {
                this.Reset();
            }
        };
        Spider.prototype.movementPattern01 = function () {
            var r1, r2;
            r2 = (this.movementSeed / 10000);
            r1 = Math.round((this.movementSeed * 50) + 100);
            return Math.sin(this.y / r1) / (this.y * r2);
        };
        Spider.prototype.movementPattern02 = function () {
            var r1, r2;
            r2 = 50 + (this.movementSeed * 200);
            r1 = 20 + (this.movementSeed * 5);
            return Math.cos((this.y / r1)) * r2;
        };
        return Spider;
    }(objects.Enemy));
    objects.Spider = Spider;
})(objects || (objects = {}));
//# sourceMappingURL=spider.js.map