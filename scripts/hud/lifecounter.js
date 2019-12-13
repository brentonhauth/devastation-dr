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
    var LifeCounter = /** @class */ (function (_super) {
        __extends(LifeCounter, _super);
        function LifeCounter() {
            var _this = _super.call(this) || this;
            _this.counterText = new ui.Label("", "20px", "Consolas", "#FFFFFF", 80, 30, true);
            _this.addChild(_this.counterText);
            return _this;
            //this.counterImage = new createjs.Bitmap();
        }
        LifeCounter.prototype.text = function (t) {
            this.counterText.text = "lives: " + t;
        };
        return LifeCounter;
    }(createjs.Container));
    hud.LifeCounter = LifeCounter;
})(hud || (hud = {}));
//# sourceMappingURL=lifecounter.js.map