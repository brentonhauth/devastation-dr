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
    var DesertScene = /** @class */ (function (_super) {
        __extends(DesertScene, _super);
        function DesertScene() {
            var _this = _super.call(this) || this;
            _this.ending = false;
            _this.background.Overlap = 20;
            return _this;
        }
        DesertScene.prototype.Start = function () {
            var _this = this;
            _super.prototype.Start.call(this);
            if (!managers.Sound.isPlayingMusic) {
                managers.Sound.music("cyberpunker");
            }
            this.dialogHandler.TriggerMany(["Man, when did it get so hot?", 2.5,
                function () { return _this.waveHandler.Start(); }]);
        };
        DesertScene.prototype.Update = function () {
            _super.prototype.Update.call(this);
            if (this.ending) {
                this.player.position = this.player.position.Add(new math.Vec2(0, -8));
            }
        };
        DesertScene.prototype.Main = function () {
            var _this = this;
            this.waveHandler.Add(new objects.Wave([objects.Jackal, 3]), new objects.Wave([objects.Lizard, 1]), new objects.Wave([objects.Turtle, 1]), new objects.Wave([objects.Turtle, 2]), new objects.Wave([objects.Lizard, 2], [objects.Turtle, 1]), new objects.Wave([objects.Turtle, 2], [objects.Lizard, 2]), new objects.Wave([objects.Camel, 1]));
            this.waveHandler.on('complete', function () {
                _this.player.intangible = true;
                managers.Keyboard.disable();
                _this.dialogHandler.TriggerMany(["I think that's it for now...", 2], ["We're pretty far north, but it's\n" +
                        "really hot for some reason...", 3,
                    function () {
                        _this.ending = true;
                        _this.player.canLeaveBounds = true;
                    }], ["", 2.5, function () {
                        managers.Keyboard.enable();
                        objects.Game.currentState = config.Scene.ARCTIC;
                    }]);
            });
        };
        return DesertScene;
    }(scenes.PlayScene));
    scenes.DesertScene = DesertScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=desert.js.map