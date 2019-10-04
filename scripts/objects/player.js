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
var objects;
(function (objects) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // Constructor
        function Player() {
            var _this = _super.call(this, "player") || this;
            _this.Start();
            return _this;
        }
        // Methods
        Player.prototype.Start = function () {
            var _this = this;
            // Set the initial position
            this.y = 700;
            this.x = 320;
            this.lives = 3;
            managers.Input.keypress('a', function () {
                _this.x -= 15;
                _this.CheckBound();
            });
            managers.Input.keypress('d', function () {
                _this.x += 15;
                _this.CheckBound();
            });
            //this.scaleX = 0.25;
            //this.scaleY = 0.25;
        };
        Player.prototype.Update = function () {
            this.Move();
            this.CheckBound(); // <-- Check collisions
        };
        Player.prototype.Reset = function () { };
        Player.prototype.Move = function () {
            // We reference the stage object and get mouse position
            //this.x = objects.Game.stage.mouseX;
            // This is evetually replaced with keyboard input
            // Maybe xbox controller...
        };
        Player.prototype.CheckBound = function () {
            // Right boundary
            if (this.x >= 640 - this.halfW) {
                this.x = 640 - this.halfW;
            }
            // Left boundary
            if (this.x <= this.halfW) {
                this.x = this.halfW;
            }
        };
        Player.prototype.OnCollision = function (_gameObject) {
            this.lives -= 1;
            if (this.lives == 0) {
                objects.Game.currentScene = config.Scene.OVER;
                console.log("dead");
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map