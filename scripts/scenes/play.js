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
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        PlayScene.prototype.Start = function () {
            // init objects
            this.welcomeLabel = new objects.Label("welcome to School!", "60px", "Consolas", "firebrick", 320, 240, true);
            this.startButton = new objects.Button(this.assetManager, "backButton", 320, 300);
            this.nextButton = new objects.Button(this.assetManager, "nextButton", 360, 300);
            this.Main();
        };
        PlayScene.prototype.Update = function() { };
        PlayScene.prototype.Main = function() {
            this.addChild(this.welcomeLabel);
            this.addChild(this.startButton);
            this.addChild(this.nextButton);
            this.startButton.on("click", function() {
                objects.Game.currentScene = config.Scene.START;
            });
            this.nextButton.on("click", function() {
                objects.Game.currentScene = config.Scene.OVER;
            });
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map