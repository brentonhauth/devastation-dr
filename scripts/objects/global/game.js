var objects;
(function (objects) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.isWithinCanvas = function (point) {
            if (point.x < 0 || point.x > Game.canvas.width) {
                return false;
            }
            else if (point.y < 0 || point.y > Game.canvas.height) {
                return false;
            }
            else {
                return true;
            }
        };
        Game.getAsset = function (tag) {
            return Game.assetManager.getResult(tag);
        };
        return Game;
    }());
    objects.Game = Game;
})(objects || (objects = {}));
//# sourceMappingURL=game.js.map