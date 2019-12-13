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
var ui;
(function (ui) {
    var Volumeslider = /** @class */ (function (_super) {
        __extends(Volumeslider, _super);
        function Volumeslider(volumeType) {
            var _this = _super.call(this) || this;
            _this.volumeType = volumeType;
            _this.sliderContainer = new createjs.Bitmap(objects.Game.assetManager.getResult("sliderContainer"));
            _this.sliderKnob = new createjs.Bitmap(objects.Game.assetManager.getResult("sliderKnob"));
            _this.sliderValue = new ui.Label(_this.GetVolume(), "18px", "Arial", "#008000", 100, 0, true);
            _this.sliderValue.outline = 1.5;
            _this.sliderTitle = new ui.Label(_this.volumeType, "25px", "Arial", "#008000", -50, 15, true);
            _this.sliderTitle.outline = 2;
            _this.sliderContainer.x = 10;
            _this.sliderContainer.y = 8;
            _this.sliderKnob.x = 185;
            _this.sliderKnob.y = 0;
            _this.addChild(_this.sliderContainer, _this.sliderKnob, _this.sliderValue, _this.sliderTitle);
            _this.start();
            return _this;
        }
        Volumeslider.prototype.start = function () {
            var _this = this;
            this.sliderKnob.on("pressmove", function () {
                var point = _this.localToGlobal(_this.x, 0);
                if (_this.stage.mouseX >= point.x - 5 && _this.stage.mouseX <= point.x + 195) {
                    _this.sliderKnob.x = _this.stage.mouseX - point.x - 10;
                    _this.SetVolume((_this.sliderKnob.x - 5) / 180);
                    _this.sliderValue.text = _this.GetVolume();
                }
            });
        };
        Volumeslider.prototype.SetVolume = function (level) {
            console.log(level);
            switch (this.volumeType) {
                case "Sfx":
                    managers.Sound.sfxVolume = level;
                    break;
                case "Music":
                    managers.Sound.musicVolume = level;
                    break;
                case "Sound":
                    managers.Sound.volume = level;
                    break;
            }
        };
        Volumeslider.prototype.GetVolume = function () {
            switch (this.volumeType) {
                case "Sfx":
                    return Math.round((managers.Sound.sfxVolume * 100)).toString();
                case "Music":
                    return Math.round((managers.Sound.musicVolume * 100)).toString();
                case "Sound":
                    return Math.round((managers.Sound.volume * 100)).toString();
            }
        };
        return Volumeslider;
    }(createjs.Container));
    ui.Volumeslider = Volumeslider;
})(ui || (ui = {}));
//# sourceMappingURL=volumeslider.js.map