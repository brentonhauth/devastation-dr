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
    var Cutscene1 = /** @class */ (function (_super) {
        __extends(Cutscene1, _super);
        function Cutscene1() {
            var _this = _super.call(this) || this;
            _this.playerAnimator = new components.PlayerAnimator();
            return _this;
        }
        return Cutscene1;
    }(scenes.Scene));
    scenes.Cutscene1 = Cutscene1;
})(scenes || (scenes = {}));
//# sourceMappingURL=cutscene1.js.map