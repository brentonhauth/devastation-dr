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
            var _this = _super.call(this) || this;
            _this.finishedCheck = false;
            _this.ending = false;
            _this.bgs = new Array();
            _this.bgs.push(new createjs.Bitmap(objects.Game.assetManager.getResult("jungle")), new createjs.Bitmap(objects.Game.assetManager.getResult("jungle")));
            _this.bgs.forEach(function (b) {
                b.x = 0;
                b.scaleX = b.scaleY = 1.35;
                _this.addChild(b);
            });
            // 1142[.1] = 846 * 1.35
            _this.bgs[1].y = -572; // -1142 + 570
            _this.bgs[0].y = -1704; // (-572 - 1142) + 10
            return _this;
        }
        JungleScene.prototype.Start = function () {
            var _this = this;
            _super.prototype.Start.call(this);
            this.removeChild(this.background);
            if (!managers.Sound.isPlayingMusic) {
                managers.Sound.music("cyberpunker");
            }
            this.dialogHandler.TriggerMany(["I've entered this part!", 2], ["I hope something bad\ndoesn't happen...", 2,
                function () { return _this.waveHandler.Start(); }]);
        };
        JungleScene.prototype.Update = function () {
            var _this = this;
            _super.prototype.Update.call(this);
            if (this.waveHandler.CompletedAllWaves && !this.finishedCheck) {
                this.player.intangible = true;
                managers.Keyboard.disable();
                this.dialogHandler.TriggerMany(["It looks like that's the last of 'em!", 2.5], ["The drive home feels a lot\nlonger than normal...", 3], ["", 1], ["I have to keep a clear head!", 3], ["I'll reach the end eventually!", 3, function () {
                        _this.ending = true;
                        _this.player.canLeaveBounds = true;
                    }], ["", 2.5, function () {
                        objects.Game.currentState = config.Scene.DESERT;
                        managers.Keyboard.enable();
                    }]);
                this.finishedCheck = true;
            }
            if (this.ending) {
                this.player.position = this.player.position.Add(new math.Vec2(0, -8));
            }
            this.bgs.forEach(function (b, i) {
                b.y += 1.5;
                // 104 = 65 * 1.6
                if (b.y >= 570) {
                    var b2 = _this.bgs[!!i ? 0 : 1];
                    _this.removeChild(b, b2);
                    var h = 1142;
                    _this.addChildAt(b, 0);
                    _this.addChildAt(b2, 1);
                    b.y = b2.y - h + 10;
                    console.log(b.y, b2.y);
                }
            });
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