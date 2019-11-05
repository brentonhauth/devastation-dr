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
    var JungleScene = /** @class */ (function (_super) {
        __extends(JungleScene, _super);
        function JungleScene() {
            return _super.call(this) || this;
        }
        JungleScene.prototype.Start = function () {
            var _this = this;
            _super.prototype.Start.call(this);
            this.dialogHandler.TriggerMany(["I've entered this part!", 2], ["I hope something bad\ndoesn't happen", 2,
                function () { return _this.waveHandler.Start(); }]);
        };
        JungleScene.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        JungleScene.prototype.Main = function () {
            _super.prototype.Main.call(this);
            this.waveHandler.Add(
            // This wave has 25 spiders,
            // and they all act different
            new objects.Wave([objects.Spider, 25]).Behavior(objects.Spider, function (x, y, index) {
                x = index % 2 === 0 ?
                    (x < 760 ? x + 5 : 0) :
                    (x > 0 ? x - 5 : 760);
                y = y < 700 ? y + 1 : -100;
                return new math.Vec2(x, y);
            }), 
            // this wave has 5 spiders & 2 lizards
            new objects.Wave([objects.Spider, 5], [objects.Lizard, 2]), 
            // this wave has 5 lizards
            new objects.Wave([objects.Lizard, 5]));
        };
        return JungleScene;
    }(scenes.PlayScene));
    scenes.JungleScene = JungleScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=jungle.js.map