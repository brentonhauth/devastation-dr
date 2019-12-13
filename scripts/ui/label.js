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
var ui;
(function (ui) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label(labelString, fontSize, fontFamily, fontColor, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, labelString, fontSize + " " + fontFamily, fontColor) || this;
            // Set the registration point if true to be in the middle
            if (isCentered) {
                _this.Center();
            }
            // Set initial position
            _this.SetPosition(x, y);
            return _this;
        }
        Object.defineProperty(Label.prototype, "position", {
            // Variables
            // Constructor
            get: function () {
                return new math.Vec2(this.x, this.y);
            },
            set: function (pos) {
                this.SetPosition(pos.x, pos.y);
            },
            enumerable: true,
            configurable: true
        });
        Label.prototype.SetPosition = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Label.prototype.Center = function () {
            this.regX = this.getMeasuredWidth() * 0.5;
            this.regY = this.getMeasuredHeight() * 0.5;
            this.SetPosition(this.x, this.y);
        };
        return Label;
    }(createjs.Text));
    ui.Label = Label;
})(ui || (ui = {}));
//# sourceMappingURL=label.js.map