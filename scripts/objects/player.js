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
            _this.blink = false;
            _this.oddBlink = 0;
            _this.moveSpeed = 8;
            _this.Start();
            return _this;
        }
        // Methods
        Player.prototype.Start = function () {
            // Set the initial position
            this.y = 500;
            this.x = 320;
            this.lives = 3;
            this.moved = new math.Vec2(0, 0);
            // managers.Input.keypress('a', () => {
            //     this.x -= 15;
            //     this.CheckBound();
            // });
            // managers.Input.keypress('d', () => {
            //     this.x += 15;
            //     this.CheckBound();
            // });
            //this.scaleX = 0.25;
            //this.scaleY = 0.25;
        };
        Player.prototype.Update = function () {
            this.Move();
            this.CheckBound(); // <-- Check collisions
            this.Blink();
        };
        Player.prototype.Reset = function () { };
        Player.prototype.Move = function () {
            this.moved.x = this.moved.y = 0;
            if (managers.Keyboard.pressed(config.Key.W)) {
                this.moved.y = -this.moveSpeed;
            }
            if (managers.Keyboard.pressed(config.Key.S)) {
                this.moved.y += this.moveSpeed;
            }
            if (managers.Keyboard.pressed(config.Key.A)) {
                this.moved.x = -this.moveSpeed;
            }
            if (managers.Keyboard.pressed(config.Key.D)) {
                this.moved.x += this.moveSpeed;
            }
            if (this.moved.x || this.moved.y) {
                if (this.moved.x && this.moved.y) {
                    this.moved = this.moved.Scale(Math.SQRT1_2);
                }
                this.position = this.position.Add(this.moved);
            }
            // We reference the stage object and get mouse position
            // this.x = objects.Game.stage.mouseX;
            // this.y = objects.Game.stage.mouseY;
            this.CheckBound();
            // This is evetually replaced with keyboard input
            // Maybe xbox controller...
        };
        Player.prototype.Blink = function () {
            if (this.blink) {
                if (this.oddBlink == 2) {
                    this.visible = !this.visible;
                    this.oddBlink = 0;
                }
                else {
                    this.oddBlink++;
                }
            }
        };
        Player.prototype.StartBlink = function () {
            var _this = this;
            this.blink = true;
            setTimeout(function () {
                _this.blink = false;
                _this.visible = true;
            }, 750);
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
            if (this.y <= this.halfH) {
                this.y = this.halfH;
            }
            /*
            if (this.y >= 900 - this.halfH) {
                this.y = this.halfH;
            }
            */
        };
        Player.prototype.OnCollision = function (_gameObject) {
            this.lives -= 1;
            createjs.Sound.play("explosion");
            this.StartBlink();
            if (this.lives == 0) {
                objects.Game.currentState = config.Scene.OVER;
                console.log("dead");
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map