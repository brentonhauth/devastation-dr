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
    var ArcticScene = /** @class */ (function (_super) {
        __extends(ArcticScene, _super);
        function ArcticScene() {
            var _this = _super.call(this) || this;
            _this.ending = false;
            _this.background.Overlap = 104;
            return _this;
        }
        ArcticScene.prototype.Start = function () {
            var _this = this;
            _super.prototype.Start.call(this);
            if (!managers.Sound.isPlayingMusic) {
                managers.Sound.music("cyberpunker");
            }
            this.dialogHandler.TriggerMany(["Brrr... When did it get so cold...", 3], ["", 1, function () { return _this.waveHandler.Start(); }]);
        };
        ArcticScene.prototype.Update = function () {
            _super.prototype.Update.call(this);
            if (this.ending) {
                this.player.position = this.player.position.Add(new math.Vec2(0, -8));
            }
        };
        ArcticScene.prototype.Main = function () {
            var _this = this;
            _super.prototype.Main.call(this);
            this.waveHandler.Add(new objects.Wave([objects.Penguin, 2]), new objects.Wave([objects.Penguin, 3]), new objects.Wave([objects.Penguin, 5]), new objects.Wave([objects.Wolf, 5], [objects.Penguin, 3]), new objects.Wave([objects.PolarBear, 1]), new objects.Wave([objects.PolarBear, 1], [objects.Penguin, 2]), new objects.Wave([objects.PolarBear, 3]), new objects.Wave([objects.Penguin, 4], [objects.Wolf, 5]), new objects.Wave([objects.Wolf, 5], [objects.Penguin, 4], [objects.PolarBear, 3]), new objects.Wave([objects.Wolf, 10], [objects.Penguin, 4], [objects.PolarBear, 5]));
            this.waveHandler.on('complete', function () {
                managers.Keyboard.disable();
                _this.player.intangible = true;
                _this.player.canLeaveBounds = true;
                _this.dialogHandler.TriggerMany(["Hopefully that's the last of 'em.", 2], ["", 1], ["Wait what's that in the distance?!", 3], ["Whatever it is, it\ndoesn't look normal...", 3, function () { return _this.ending = true; }], ["", 2.5], ["[  to be continued...  ]", 3, function () {
                        objects.Game.currentState = config.Scene.START;
                        managers.Keyboard.enable();
                        managers.Sound.music(false);
                    }]);
            });
        };
        return ArcticScene;
    }(scenes.PlayScene));
    scenes.ArcticScene = ArcticScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=arctic.js.map