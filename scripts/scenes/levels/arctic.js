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
            _this.finishedCheck = false;
            _this.ending = false;
            _this.backings = new Array();
            _this.backings.push(new createjs.Bitmap(objects.Game.assetManager.getResult("arctic")), new createjs.Bitmap(objects.Game.assetManager.getResult("arctic")));
            _this.backings.forEach(function (b) {
                b.x = 0;
                b.scaleX = b.scaleY = 1.6;
                _this.addChild(b);
            });
            // 1107[.2] = 692 * 1.6
            _this.backings[1].y = -537; // -1107 + 570
            _this.backings[0].y = -1540; // (-537 - 1107) + 104
            return _this;
        }
        ArcticScene.prototype.Start = function () {
            var _this = this;
            _super.prototype.Start.call(this);
            this.removeChild(this.background);
            if (!managers.Sound.isPlayingMusic) {
                managers.Sound.music("cyberpunker");
            }
            this.dialogHandler.TriggerMany(["Brrr... When did it get so cold...", 3], ["", 1, function () { return _this.waveHandler.Start(); }]);
        };
        ArcticScene.prototype.Update = function () {
            var _this = this;
            _super.prototype.Update.call(this);
            if (!this.finishedCheck && this.waveHandler.CompletedAllWaves) {
                managers.Keyboard.disable();
                this.player.intangible = true;
                this.player.canLeaveBounds = true;
                this.dialogHandler.TriggerMany(["Hopefully that's the last of 'em.", 2], ["", 1], ["Wait what's that in the distance?!", 3], ["Whatever it is, it\ndoesn't look normal...", 3, function () { return _this.ending = true; }], ["", 2.5], ["[  to be continued...  ]", 3, function () {
                        objects.Game.currentState = config.Scene.START;
                        managers.Keyboard.enable();
                        managers.Sound.music(false);
                    }]);
                this.finishedCheck = true;
            }
            if (this.ending) {
                this.player.position = this.player.position.Add(new math.Vec2(0, -8));
            }
            this.backings.forEach(function (b, i) {
                b.y += 1.5;
                // 104 = 65 * 1.6
                if (b.y >= 570) {
                    var b2 = _this.backings[!!i ? 0 : 1];
                    _this.removeChild(b, b2);
                    var h = 1107;
                    _this.addChildAt(b, 0);
                    _this.addChildAt(b2, 1);
                    b.y = b2.y - h + 104;
                    console.log(b.y, b2.y);
                }
            });
        };
        ArcticScene.prototype.Main = function () {
            _super.prototype.Main.call(this);
            this.waveHandler.Add(new objects.Wave([objects.Penguin, 2]), new objects.Wave([objects.Penguin, 3]), new objects.Wave([objects.Penguin, 5]), new objects.Wave([objects.Wolf, 5], [objects.Penguin, 3]), new objects.Wave(new objects.PolarBear()), new objects.Wave(new objects.PolarBear(), [objects.Penguin, 2]), new objects.Wave([objects.PolarBear, 3]));
        };
        return ArcticScene;
    }(scenes.PlayScene));
    scenes.ArcticScene = ArcticScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=arctic.js.map