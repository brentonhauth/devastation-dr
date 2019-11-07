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
            var _this = _super.call(this, "jungle") || this;
            _this.finishedCheck = false;
            return _this;
        }
        JungleScene.prototype.Start = function () {
            var _this = this;
            _super.prototype.Start.call(this);
            managers.Sound.music("cyberpunker");
            this.dialogHandler.TriggerMany(["I've entered this part!", 2], ["I hope something bad\ndoesn't happen...", 2,
                function () { return _this.waveHandler.Start(); }]);
        };
        JungleScene.prototype.Update = function () {
            _super.prototype.Update.call(this);
            if (this.waveHandler.CompletedAllWaves && !this.finishedCheck) {
                this.dialogHandler.TriggerMany(["It looks like that's the last of 'em!", 2.5], ["The drive home feels a lot\nlonger than normal...", 3], ["", 1], ["I have to keep a clear head!", 3], ["I'll reach the end eventually!", 3], ["", 2, function () {
                        objects.Game.currentState = config.Scene.DESERT;
                    }]);
                this.finishedCheck = true;
            }
        };
        JungleScene.prototype.Main = function () {
            _super.prototype.Main.call(this);
            this.waveHandler.Add(new objects.Wave(new objects.Lizard()), 
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