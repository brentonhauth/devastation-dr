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
        function Player(playScene) {
            var _this = _super.call(this) || this;
            _this.blink = false;
            _this.intangible = false;
            _this.oddBlink = 0;
            _this.moveSpeed = 8;
            _this.playScene = playScene;
            _this.sprite = new createjs.Bitmap(objects.Game.assetManager.getResult("hummer"));
            var bounds = _this.sprite.getBounds();
            _this.width = bounds.width;
            _this.height = bounds.height;
            _this.weapon = new objects.Pistol(playScene);
            _this.Init();
            _this.addChild(_this.sprite);
            _this.Start();
            return _this;
        }
        // Methods
        Player.prototype.Start = function () {
            // Set the initial position
            this.position = new math.Vec2(320, 500);
            this.lives = 3;
            this.moved = new math.Vec2(0, 0);
            //this.scaleX = 0.25;
            //this.scaleY = 0.25;
        };
        Player.prototype.Update = function () {
            this.Move();
            // this.CheckBound(); // <-- Check collisions
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
            this.blink = this.intangible = true;
            setTimeout(function () {
                _this.blink = _this.intangible = false;
                _this.visible = true;
            }, 1000);
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
        Player.prototype.ShootWeapon = function () {
            this.weapon.Shoot();
        };
        Player.prototype.ChangeWeapon = function (weaponType) {
            if (weaponType == config.Weapon.MACHINEGUN) {
                this.weapon = new objects.MachineGun(this.playScene);
            }
            managers.Sound.sfx("reload");
        };
        Player.prototype.OnCollision = function (_gameObject) {
            if (_gameObject instanceof objects.EnemyItem) {
                if (_gameObject.itemType == config.Item.MACHINEGUN) {
                    if (this.weapon.weaponType == config.Weapon.MACHINEGUN) {
                        this.weapon.Upgrade();
                    }
                    else {
                        this.ChangeWeapon(config.Weapon.MACHINEGUN);
                    }
                    this.playScene.weaponHUD.updateWeapon(this.weapon);
                }
                _gameObject.Destroy();
            }
            else {
                if (!this.intangible) {
                    this.lives -= 1;
                    var cs = objects.Game.currentScene;
                    if (cs.lifeCounter) {
                        cs.lifeCounter.text(this.lives);
                    }
                    managers.Sound.sfx("explosion");
                    this.StartBlink();
                    if (this.lives == 0) {
                        objects.Game.currentState = config.Scene.OVER;
                        console.log("dead");
                    }
                }
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map