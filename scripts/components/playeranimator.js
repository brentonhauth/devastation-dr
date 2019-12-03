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
var components;
(function (components) {
    var PlayerAnimator = /** @class */ (function (_super) {
        __extends(PlayerAnimator, _super);
        function PlayerAnimator() {
            return _super.call(this, new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("playerSheet")],
                frames: { width: 28, height: 36, count: 16 },
                animations: {
                    idle_down: 1,
                    walk_down: {
                        frames: [0, 1, 2, 3],
                        speed: .1
                    },
                    idle_right: 5,
                    walk_right: {
                        frames: [4, 5, 6, 7],
                        speed: .1
                    },
                    idle_left: 8,
                    walk_left: {
                        frames: [8, 9, 10, 11],
                        speed: .1
                    },
                    idle_up: 13,
                    walk_up: {
                        frames: [12, 13, 14, 15],
                        speed: .1
                    },
                    oscillate: {
                        frames: [7, 8],
                        speed: .025
                    }
                }
            })) || this;
        }
        return PlayerAnimator;
    }(createjs.Sprite));
    components.PlayerAnimator = PlayerAnimator;
})(components || (components = {}));
//# sourceMappingURL=playeranimator.js.map