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
var scenes;
(function (scenes) {
    var Retrowave = /** @class */ (function (_super) {
        __extends(Retrowave, _super);
        function Retrowave() {
            var _this = _super.call(this) || this;
            _this.background.Overlap = 5;
            return _this;
        }
        Retrowave.prototype.Start = function () {
            var _this = this;
            _super.prototype.Start.call(this);
            this.dialogHandler.Trigger('[ Final level ]', 2, function () {
                _this.waveHandler.Start();
            });
        };
        Retrowave.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        Retrowave.prototype.Main = function () {
            var _this = this;
            _super.prototype.Main.call(this);
            this.waveHandler.Add(new objects.Wave([objects.Spider, 1]));
            this.waveHandler.on('complete', function () {
                _this.dialogHandler.TriggerMany(['Ending...', 2, function () {
                        objects.Game.currentState = config.Scene.START;
                    }]);
            });
        };
        return Retrowave;
    }(scenes.PlayScene));
    scenes.Retrowave = Retrowave;
})(scenes || (scenes = {}));
//# sourceMappingURL=retrowave.js.map