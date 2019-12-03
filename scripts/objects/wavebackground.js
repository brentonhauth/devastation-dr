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
    var WaveBackground = /** @class */ (function (_super) {
        __extends(WaveBackground, _super);
        function WaveBackground(speed) {
            if (speed === void 0) { speed = 1.5; }
            var _this = _super.call(this, speed) || this;
            _this.abyssBg = new createjs.Bitmap(objects.Game.getAsset('abyss2'));
            var bounds = _this.abyssBg.getBounds();
            var scale = _this.canvasW / (bounds.width || 1);
            scale = Number(scale.toFixed(3));
            _this.abyssBg.alpha = .7;
            var heightDiff = (scale * bounds.height) - _this.canvasH;
            _this.abyssBg.scaleX = _this.abyssBg.scaleY = scale;
            _this.abyssBg.x = 0;
            _this.abyssBg.y = -(heightDiff / 2);
            return _this;
        }
        WaveBackground.prototype.Start = function () {
            _super.prototype.Start.call(this);
            this.addChildAt(this.abyssBg, 0);
        };
        return WaveBackground;
    }(objects.Background));
    objects.WaveBackground = WaveBackground;
})(objects || (objects = {}));
//# sourceMappingURL=wavebackground.js.map