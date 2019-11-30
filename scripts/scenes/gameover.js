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
    var GameOverScene = /** @class */ (function (_super) {
        __extends(GameOverScene, _super);
        // Constructor
        function GameOverScene(lastScene) {
            if (lastScene === void 0) { lastScene = null; }
            var _this = _super.call(this) || this;
            _this.lastScene = lastScene || config.Scene.START;
            var g = new createjs.Graphics();
            g.beginFill("black");
            g.drawRect(-1, -1, objects.Game.canvas.width + 10, objects.Game.canvas.height + 10);
            g.endStroke();
            _this.bg = new createjs.Shape(g);
            _this.halfCanvasW = objects.Game.canvas.width * .5;
            _this.halfCanvasH = objects.Game.canvas.height * .5;
            return _this;
        }
        // Method
        GameOverScene.prototype.Start = function () {
            managers.Sound.music(false);
            this.gameOverLabel = new ui.Label("Game Over!", "48px", "Consolas", "white", this.halfCanvasW, 150, true);
            // 190 x 49
            var alignBtnX = this.halfCanvasW - 95;
            var alignBtnY = this.halfCanvasH - 24.5;
            var tryOff = 20;
            var backOff = 110;
            this.tryAgainBtn = new ui.Button("blueButton", alignBtnX, alignBtnY + tryOff);
            this.tryAgainLabel = new ui.Label("Try Again", "32px", "Consolas", "white", this.halfCanvasW, this.halfCanvasH + tryOff - 5, true);
            this.backBtn = new ui.Button("greenButton", alignBtnX, alignBtnY + backOff);
            this.backLabel = new ui.Label("Main Menu", "32px", "Consolas", "white", this.halfCanvasW, this.halfCanvasH + backOff - 5, true);
            this.Main();
        };
        GameOverScene.prototype.Main = function () {
            var _this = this;
            this.addChild(this.bg);
            this.addChild(this.gameOverLabel);
            this.addChild(this.tryAgainBtn);
            this.addChild(this.tryAgainLabel);
            this.addChild(this.backBtn);
            this.addChild(this.backLabel);
            this.tryAgainBtn.on("click", function () {
                objects.Game.currentState = _this.lastScene;
            });
            this.backBtn.on("click", function () {
                objects.Game.currentState = config.Scene.START;
            });
        };
        return GameOverScene;
    }(scenes.Scene));
    scenes.GameOverScene = GameOverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map