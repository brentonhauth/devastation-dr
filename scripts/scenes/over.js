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
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        function OverScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        OverScene.prototype.Start = function () {
            // init objects
            this.welcomeLabel = new objects.Label("Game Over!", "60px", "Consolas", "firebrick", 320, 240, true);
            this.startButton = new objects.Button(this.assetManager, "backButton", 320, 300);
            this.Main();
        };
        OverScene.prototype.Update = function () { };
        OverScene.prototype.startButtonClick = function () {
            // change game state from START to GAME
            objects.Game.currentScene = config.Scene.GAME;
        };
        OverScene.prototype.Main = function () {
            this.addChild(this.welcomeLabel);
            this.addChild(this.startButton);
            this.startButton.on("click", this.startButtonClick);
        };
        return OverScene;
    }(objects.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map