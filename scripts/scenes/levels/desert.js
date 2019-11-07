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
            return _super.call(this) || this;
        }
        DesertScene.prototype.Start = function () {
            _super.prototype.Start.call(this);
        };
        DesertScene.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        return DesertScene;
    }(scenes.PlayScene));
    scenes.DesertScene = DesertScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=desert.js.map