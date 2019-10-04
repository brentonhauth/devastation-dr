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
    var Lizard = /** @class */ (function (_super) {
        __extends(Lizard, _super);
        function Lizard() {
            var _this = _super.call(this) || this;
            _this.scaleX *= 1.5;
            _this.scaleY *= 1.5;
            _this.lastPlayerPos = new math.Vec2();
            _this.enemyBullets = new Array(0);
            return _this;
        }
        /*
        public setLastPlayerPos(x: number, y: number) {
            this.lastPlayerPos = new math.Vec2(x, y);
        }
        */
        Lizard.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        Lizard.prototype.SpawnBullet = function () {
            /*let r = math.randRange(1, 30);
            if (Math.round(r) == 5) {
                this.spawnBullet();
            }*/
        };
        return Lizard;
    }(objects.Spider));
    objects.Lizard = Lizard;
})(objects || (objects = {}));
//# sourceMappingURL=lizard.js.map