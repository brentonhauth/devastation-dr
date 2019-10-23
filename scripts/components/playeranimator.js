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
                    idle_0: 1,
                    walk_0: {
                        frames: [0, 1, 2, 3],
                        speed: .1
                    },
                    idle_1: 5,
                    walk_1: {
                        frames: [4, 5, 6, 7],
                        speed: .1
                    },
                    idle_2: 8,
                    walk_2: {
                        frames: [8, 9, 10, 11],
                        speed: .1
                    },
                    idle_3: 13,
                    walk_3: {
                        frames: [12, 13, 14, 15],
                        speed: .1
                    }
                }
            })) || this;
        }
        return PlayerAnimator;
    }(createjs.Sprite));
    components.PlayerAnimator = PlayerAnimator;
})(components || (components = {}));
//# sourceMappingURL=playeranimator.js.map