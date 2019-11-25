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
    var CamelAttack;
    (function (CamelAttack) {
        CamelAttack[CamelAttack["None"] = 0] = "None";
        CamelAttack[CamelAttack["Spiral"] = 1] = "Spiral";
        CamelAttack[CamelAttack["Oscillate"] = 2] = "Oscillate";
        CamelAttack[CamelAttack["ReverseSpiral"] = 3] = "ReverseSpiral";
        CamelAttack[CamelAttack["Direct"] = 4] = "Direct";
    })(CamelAttack || (CamelAttack = {}));
    var CamelState;
    (function (CamelState) {
        CamelState[CamelState["SettingUp"] = 1] = "SettingUp";
        CamelState[CamelState["Attacking"] = 2] = "Attacking";
        CamelState[CamelState["Pending"] = 3] = "Pending";
        CamelState[CamelState["Dying"] = 4] = "Dying";
    })(CamelState || (CamelState = {}));
    var Camel = /** @class */ (function (_super) {
        __extends(Camel, _super);
        function Camel() {
            var _this = _super.call(this, 'camelSheet') || this;
            _this.isSettingUp = true;
            _this.oscillateCountUp = true;
            _this.initialTrigger = true;
            _this.attackTime = 7.5; // seconds
            _this.oscillateCounter = 60;
            _this.health = 30;
            _this.playScene = objects.Game.currentScene;
            _this.state = CamelState.SettingUp;
            var speed = .1;
            var sheet = new createjs.SpriteSheet({
                images: [objects.Game.getAsset('camelSheet')],
                frames: { width: 72, height: 72, count: 12 },
                animations: {
                    idle_down: 1, walk_down: { speed: speed, frames: [0, 1, 2] },
                    idle_left: 4, walk_left: { speed: speed, frames: [3, 4, 5] },
                    idle_right: 7, walk_right: { speed: speed, frames: [6, 7, 8] },
                    idle_up: 10, walk_up: { speed: speed, frames: [9, 10, 11] },
                    walk_backwards: { speed: speed, frames: [2, 1, 0] },
                    oscillate: { speed: .05, frames: [4, 7] }
                }
            });
            _this.startingPos = Camel.randomStartingPos();
            _this.camalAnimator = new createjs.Sprite(sheet, 'idle_down');
            _this.width = 72;
            _this.height = 72;
            _this.Init();
            return _this;
        }
        Camel.prototype.Start = function () {
            this.camalAnimator.gotoAndPlay('walk_down');
            managers.Sound.music(false);
            this.removeChild(this.sprite);
            this.addChild(this.camalAnimator);
            this.currentAttack = Camel.randomAttack();
            this.position = new math.Vec2(this.startingPos.x, this.startingPos.y - 300);
            this.dirToNextPost = math.Vec2.Difference(this.startingPos, this.position).Normalized;
        };
        Camel.prototype.Update = function () {
            var _this = this;
            var point, bullet, tick = createjs.Ticker.getTicks();
            if (this.state === CamelState.SettingUp) {
                if (math.Vec2.WithinRange(this.position, this.startingPos, 10)) {
                    this.state = CamelState.Attacking;
                    if (!managers.Sound.isPlayingMusic) {
                        this.playScene.dialogHandler.Trigger('What is that?!', 2.5);
                        managers.Sound.music(true);
                    }
                    if (this.currentAttack === CamelAttack.Oscillate) {
                        this.camalAnimator.gotoAndPlay('oscillate');
                    }
                    else {
                        this.camalAnimator.gotoAndPlay('walk_backwards');
                    }
                    setTimeout(function () {
                        _this.state = CamelState.Pending;
                    }, math.randRange(4, 8) * 1000);
                }
                else {
                    this.position = this.position.Add(this.dirToNextPost);
                }
            }
            else if (this.state === CamelState.Pending) {
                var prevAttack = this.currentAttack;
                while (prevAttack === this.currentAttack) {
                    this.currentAttack = Camel.randomAttack();
                }
                this.startingPos = Camel.randomStartingPos();
                this.state = CamelState.SettingUp;
                this.dirToNextPost = math.Vec2.Difference(this.startingPos, this.position).Normalized;
                this.dirToNextPost = this.dirToNextPost.Scale(3);
            }
            else if (this.state === CamelState.Attacking) {
                if (this.currentAttack === CamelAttack.Spiral) {
                    if (!(tick % 9)) {
                        point = math.pointOnCircle(this.position, (tick * 2.5) % 360);
                        bullet = new objects.EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                        this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                    }
                }
                else if (this.currentAttack === CamelAttack.ReverseSpiral) {
                    if (!(tick % 9)) {
                        point = math.pointOnCircle(this.position, 360 - ((tick * 2.5) % 360));
                        bullet = new objects.EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                        this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                    }
                }
                else if (this.currentAttack === CamelAttack.Oscillate) {
                    if (this.oscillateCountUp) {
                        if (this.oscillateCounter > 120) {
                            this.oscillateCountUp = false;
                        }
                        else {
                            this.oscillateCounter += 1.5; // ?
                        }
                    }
                    else {
                        if (this.oscillateCounter < 60) {
                            this.oscillateCountUp = true;
                        }
                        else {
                            this.oscillateCounter -= 1.5;
                        }
                    }
                    if (!(this.oscillateCounter % 5)) {
                        point = math.pointOnCircle(this.position, this.oscillateCounter);
                        bullet = new objects.EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                        this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                    }
                    this.position = this.position.Add(new math.Vec2(this.oscillateCountUp ? -1 : 1));
                }
                else if (this.currentAttack === CamelAttack.Direct && !(tick % 15)) {
                    bullet = new objects.EnemyBullet(this.position, this.playScene.player.position, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }
            }
        };
        Camel.randomAttack = function () {
            var rnd = Math.floor(math.randRange(1, 5));
            console.log('Random Attack', CamelAttack[rnd]);
            return CamelAttack[CamelAttack[rnd]];
        };
        Camel.randomStartingPos = function () {
            return new math.Vec2(math.randRange(50, 400), math.randRange(50, 250));
        };
        Camel.prototype.Destroy = function () {
            this.health--;
            if (this.health === 0) {
                _super.prototype.Destroy.call(this);
            }
        };
        return Camel;
    }(objects.Enemy));
    objects.Camel = Camel;
})(objects || (objects = {}));
//# sourceMappingURL=camel.js.map