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
                function () {
                    _this.waveHandler.Start();
                }]);
        };
        JungleScene.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        JungleScene.prototype.Main = function () {
            _super.prototype.Main.call(this);
            var wave1 = new objects.Wave(new objects.Spider(), new objects.Spider(), new objects.Spider(), new objects.Spider(), new objects.Spider());
            var wave2 = new objects.Wave();
            wave2.Add([objects.Spider, 5], [objects.Lizard, 2]
            // new objects.Spider(),
            // new objects.Spider(),
            // new objects.Lizard(),
            // new objects.Spider(),
            // new objects.Spider(),
            // new objects.Spider(),
            // new objects.Lizard(),
            );
            wave1.AddAmount(objects.Spider, 20);
            // SAME AS: wave1.Add([objects.Spider, 20]);
            wave1.Behavior(objects.Spider, function (x, y, index) {
                if (index % 2 === 0) {
                    x += 5;
                    if (x > 760) {
                        x = 0;
                    }
                }
                else {
                    x -= 5;
                    if (x < 0) {
                        x = 760;
                    }
                }
                y += 1;
                if (y > 700) {
                    y = -100;
                }
                return new math.Vec2(x, y);
            });
            this.waveHandler.Add(wave1, wave2);
            // this.waveHandler.Start();
        };
        return JungleScene;
    }(scenes.PlayScene));
    scenes.JungleScene = JungleScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=jungle.js.map