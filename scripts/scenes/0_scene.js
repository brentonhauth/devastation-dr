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
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // Variables
        // Constructor
        function Scene() {
            return _super.call(this) || this;
        }
        // Methods
        Scene.prototype.Start = function () { };
        Scene.prototype.Update = function () { };
        Scene.prototype.Main = function () { };
        return Scene;
    }(createjs.Container));
    scenes.Scene = Scene;
})(scenes || (scenes = {}));
//# sourceMappingURL=0_scene.js.map