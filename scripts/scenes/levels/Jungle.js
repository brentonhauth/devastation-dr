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
    var JungleScene = /** @class */ (function (_super) {
        __extends(JungleScene, _super);
        function JungleScene() {
            return _super.call(this) || this;
        }
        JungleScene.prototype.Start = function () {
            _super.prototype.Start.call(this);
        };
        JungleScene.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        return JungleScene;
    }(scenes.PlayScene));
    scenes.JungleScene = JungleScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=Jungle.js.map