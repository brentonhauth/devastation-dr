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
var hud;
(function (hud) {
    var Score = /** @class */ (function (_super) {
        __extends(Score, _super);
        function Score() {
            var _this = _super.call(this) || this;
            _this.display = new ui.Label("Score: 0", "20px", "Consolas", "#FFFFFF", 240, 30, true);
            _this.addChild(_this.display);
            return _this;
        }
        Score.prototype.resetCurrentScore = function () {
            Score.currentScore = 0;
        };
        Score.prototype.addPoints = function (amount) {
            Score.currentScore += amount;
            this.updateText();
        };
        Score.prototype.updateText = function () {
            this.display.text = "Score: " + (Score.savedScore + Score.currentScore);
        };
        Score.prototype.saveCurrentScore = function () {
            Score.savedScore += Score.currentScore;
            Score.currentScore = 0;
        };
        Score.savedScore = 0;
        Score.currentScore = 0;
        return Score;
    }(createjs.Container));
    hud.Score = Score;
})(hud || (hud = {}));
//# sourceMappingURL=score.js.map