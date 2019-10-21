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
            _this.Start();
            return _this;
        }
        StartScene.prototype.Start = function () {
            // Initialize our objects for this scene
            this.background = new objects.Background();
            this.logo = new createjs.Bitmap(objects.Game.assetManager.getResult("logo"));
            this.infoLabel = new ui.Label("(c) Rude Rhino", "18px", "Arial", "#e1e1f1", 320, 800, true);
            this.logo.scaleX *= .8;
            this.logo.scaleY *= .8;
            this.logo.x = 80;
            this.logo.y = 140;
            this.startButton = new ui.Button("nextButton", 270, 300);
            this.startButton.scaleY *= 3.25;
            this.startButton.scaleX *= 3.25;
            this.Main();
        };
        StartScene.prototype.Update = function () {
            // this.background.Update();
        };
        StartScene.prototype.startButtonClick = function () {
            // Change our game state from START to GAME
            objects.Game.currentState = config.Scene.GAME;
        };
        StartScene.prototype.Main = function () {
            // Add items to our scene
            this.addChild(this.background);
            this.addChild(this.startButton);
            this.addChildAt(this.logo, 2);
            this.addChild(this.infoLabel);
            this.startButton.on("click", this.startButtonClick);
        };
        return StartScene;
    }(scenes.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map