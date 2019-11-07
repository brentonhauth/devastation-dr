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
            return _super.call(this, "arctic") || this;
        }
        ArcticScene.prototype.Start = function () {
            _super.prototype.Start.call(this);
        };
        ArcticScene.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        return ArcticScene;
    }(scenes.PlayScene));
    scenes.ArcticScene = ArcticScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=arctic.js.map