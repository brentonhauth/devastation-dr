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
            _this.vMoveSpeed = 8;
            _this.canLeaveBounds = false;
            _this.hasShield = false;
            _this.hMoveSpeed = _this.vMoveSpeed * .75;
            _this.playScene = playScene;
            _this.sprite = new createjs.Bitmap(objects.Game.getAsset("hummer"));
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
            this.SetPosition(320, 500);
            this.lives = 3;
            this.moved = new math.Vec2();
            //this.scaleX = 0.25;
            //this.scaleY = 0.25;
        };
        Player.prototype.Update = function () {
            this.Move();
            if (this.blink) {
                this.Blink();
            }
        };
        Player.prototype.Reset = function () { };
        Player.prototype.Move = function () {
            this.moved.x = this.moved.y = 0;
            if (managers.Keyboard.pressed(config.Key.W)) {
                this.moved.y = -this.vMoveSpeed;
            }
            if (managers.Keyboard.pressed(config.Key.S)) {
                this.moved.y += this.vMoveSpeed;
            }
            if (managers.Keyboard.pressed(config.Key.A)) {
                this.moved.x = -this.hMoveSpeed;
            }
            if (managers.Keyboard.pressed(config.Key.D)) {
                this.moved.x += this.hMoveSpeed;
            }
            if (this.moved.x || this.moved.y) {
                if (this.moved.x && this.moved.y) {
                    this.moved = this.moved.ScaleEq(Math.SQRT1_2);
                }
                this.position = this.position.Add(this.moved);
                if (!this.canLeaveBounds) {
                    this.CheckBound();
                }
            }
        };
        Player.prototype.Blink = function () {
            if (!(createjs.Ticker.getTicks() % 3)) {
                this.visible = !this.visible;
            }
        };
        Player.prototype.StartBlink = function () {
            var _this = this;
            this.blink = this.intangible = true;
            setTimeout(function () {
                requestAnimationFrame(function () {
                    _this.blink = _this.intangible = false;
                    _this.visible = true;
                });
            }, 1000);
        };
        Player.prototype.CheckBound = function () {
            var setX, setY;
            if (this.x >= (objects.Game.canvas.width - this.halfW)) {
                setX = objects.Game.canvas.width - this.halfW;
            }
            else if (this.x <= this.halfW) {
                setX = this.halfW;
            }
            if (this.y >= (objects.Game.canvas.height - this.halfH)) {
                setY = objects.Game.canvas.height - this.halfH;
            }
            else if (this.y <= this.halfH) {
                setY = this.halfH;
            }
            if (setX || setY) {
                this.SetPosition(setX || this.x, setY || this.y);
            }
        };
        Player.prototype.ShootWeapon = function () {
            this.weapon.Shoot();
        };
        Player.prototype.ChangeWeapon = function (weaponType) {
            if (this.playScene.flamethrowerBulletHandler.isActive) {
                this.playScene.flamethrowerBulletHandler.StopFlame();
            }
            if (weaponType == config.Weapon.MACHINEGUN) {
                this.weapon = new objects.MachineGun(this.playScene);
            }
            else if (weaponType == config.Weapon.LASER) {
                this.weapon = new objects.Laser(this.playScene);
            }
            else if (weaponType == config.Weapon.FLAMETHROWER) {
                this.weapon = new objects.Flamethrower(this.playScene);
            }
            managers.Sound.sfx("reload");
        };
        Player.prototype.OnCollision = function (gameObject) {
            if (gameObject instanceof objects.EnemyItem) {
                this.handleItemCollision(gameObject);
            }
            else {
                if (!this.intangible) {
                    if (!this.hasShield) {
                        this.StartBlink();
                        this.lives -= 1;
                        this.playScene.lifeCounter.text(this.lives);
                        managers.Sound.sfx("explosion");
                        if (this.lives == 0) {
                            objects.Game.currentState = config.Scene.OVER;
                            console.log("dead");
                        }
                        if (gameObject instanceof objects.Jackal) {
                            // TODO: improve upon downgrade system (when hit by Jackal)
                            this.weapon.Downgrade();
                            gameObject.yoink(this.weapon.weaponType);
                        }
                    }
                    else {
                        this.hasShield = false;
                        this.changeSprite();
                        this.StartBlink(); // this.startShieldBlink();
                    }
                }
            }
        };
        Player.prototype.handleItemCollision = function (gameObject) {
            if (gameObject.itemType == config.Item.machineGun) {
                if (this.weapon.weaponType == config.Weapon.MACHINEGUN) {
                    if (this.weapon.upgradeLevel >= 3) {
                        this.playScene.score.addPoints(100);
                    }
                    else {
                        this.weapon.Upgrade();
                    }
                }
                else {
                    this.ChangeWeapon(config.Weapon.MACHINEGUN);
                }
                this.playScene.weaponHUD.updateWeapon(this.weapon);
            }
            else if (gameObject.itemType == config.Item.laser) {
                if (this.weapon.weaponType == config.Weapon.LASER) {
                    if (this.weapon.upgradeLevel >= 3) {
                        this.playScene.score.addPoints(100);
                    }
                    else {
                        this.weapon.Upgrade();
                    }
                }
                else {
                    this.ChangeWeapon(config.Weapon.LASER);
                }
                this.playScene.weaponHUD.updateWeapon(this.weapon);
            }
            else if (gameObject.itemType == config.Item.flamethrower) {
                if (this.weapon.weaponType == config.Weapon.FLAMETHROWER) {
                    if (this.weapon.upgradeLevel >= 3) {
                        this.playScene.score.addPoints(100);
                    }
                    else {
                        this.weapon.Upgrade();
                    }
                }
                else {
                    this.ChangeWeapon(config.Weapon.FLAMETHROWER);
                }
                this.playScene.weaponHUD.updateWeapon(this.weapon);
            }
            else if (gameObject.itemType == config.Item.life) {
                this.lives++;
                this.playScene.lifeCounter.text(this.lives);
            }
            else if (gameObject.itemType == config.Item.shield) {
                if (!this.hasShield) {
                    this.hasShield = true;
                    this.changeSprite();
                }
            }
            gameObject.Destroy();
        };
        Player.prototype.changeSprite = function () {
            var spriteString = this.hasShield ? "hummerShield" : "hummer";
            this.removeChild(this.sprite);
            this.sprite = new createjs.Bitmap(objects.Game.getAsset(spriteString));
            var bounds = this.sprite.getBounds();
            this.width = bounds.width;
            this.height = bounds.height;
            this.Init();
            this.addChild(this.sprite);
            //this.Start();
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map