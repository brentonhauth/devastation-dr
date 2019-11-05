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
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        // Constructor
        function StartScene() {
            var _this = _super.call(this) || this;
            _this.background = new objects.Background();
            _this.logo = new createjs.Bitmap(objects.Game.assetManager.getResult("logo"));
            _this.infoLabel = new ui.Label("(c) Rude Rhino", "18px", "Arial", "#e1e1f1", 320, 800, true);
            _this.logo.scaleX *= .65;
            _this.logo.scaleY *= .65;
            _this.logo.x = 10;
            _this.logo.y = 10;
            _this.startButton = new ui.Button("nextButton", 30, 120);
            _this.startButton.scaleY *= 2.25;
            _this.startButton.scaleX *= 2.25;
            return _this;
        }
        StartScene.prototype.Start = function () {
            this.addChild(this.background);
            this.addChild(this.startButton);
            this.addChildAt(this.logo, 2);
            this.addChild(this.infoLabel);
            this.startButton.on("click", function () {
                objects.Game.currentState = config.Scene.JUNGLE;
            });
        };
        return StartScene;
    }(scenes.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map