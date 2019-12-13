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
    var BossAttack;
    (function (BossAttack) {
        BossAttack[BossAttack["None"] = 0] = "None";
        BossAttack[BossAttack["Spiral"] = 1] = "Spiral";
        // Oscillate = 2,
        // ReverseSpiral = 4,
        BossAttack[BossAttack["Direct"] = 8] = "Direct";
        BossAttack[BossAttack["Charge"] = 16] = "Charge";
        BossAttack[BossAttack["Shadow"] = 32] = "Shadow";
    })(BossAttack || (BossAttack = {}));
    var BossState;
    (function (BossState) {
        BossState[BossState["SettingUp"] = 1] = "SettingUp";
        BossState[BossState["Attacking"] = 2] = "Attacking";
        BossState[BossState["Pending"] = 3] = "Pending";
        BossState[BossState["Dying"] = 4] = "Dying";
    })(BossState || (BossState = {}));
    var Boss = /** @class */ (function (_super) {
        __extends(Boss, _super);
        function Boss() {
            var _this = _super.call(this, new createjs.SpriteSheet({
                images: [objects.Game.getAsset('bossSheet')],
                frames: { width: 72, height: 114, count: 12 },
                animations: {
                    green: { speed: .1, frames: [0, 1, 2] },
                    white: { speed: .1, frames: [3, 4, 5] },
                    gold: { speed: .1, frames: [6, 7, 8] },
                    blue: { speed: .1, frames: [9, 10, 11] },
                }
            })) || this;
            _this.intangible = false;
            _this.shadowGotClose = false;
            _this.initialSetup = true;
            _this.setFrame = 0;
            if (!Boss.centerPosition) {
                Boss.centerPosition = new math.Vec2(objects.Game.canvas.width / 2, objects.Game.canvas.height / 4);
                Boss.aboveCenter = new math.Vec2(Boss.centerPosition.x, Boss.centerPosition.y - 300);
            }
            _this.Init();
            _this.animator.gotoAndPlay('white');
            _this.bossShadow = new createjs.Shape();
            _this.bossShadow.graphics
                .beginFill("rgba(0,0,0,.4)")
                .drawCircle(0, 0, 50)
                .endFill();
            //
            _this.playScene.addChild(_this.bossShadow);
            _this.bossShadow.visible = false;
            _this.Reset();
            return _this;
        }
        Object.defineProperty(Boss.prototype, "frameDifference", {
            get: function () {
                if (this.setFrame <= 0) {
                    return 0;
                }
                var tick = createjs.Ticker.getTicks();
                return tick - this.setFrame;
            },
            enumerable: true,
            configurable: true
        });
        Boss.prototype.Start = function () {
            // this.position = Boss.aboveCenter;
        };
        Boss.prototype.Reset = function () {
            this.health = 35;
            this.initialSetup = true;
            this.state = BossState.Pending;
            this.resetToAboveCenter();
            // this.startingPosition = Boss.centerPosition;//Boss.randomStartingPosition();
        };
        Boss.prototype.Update = function () {
            if (this.state === BossState.SettingUp) {
                this.SettingUp();
            }
            else if (this.state === BossState.Pending) {
                this.Pending();
            }
            else if (this.state === BossState.Attacking) {
                var bullet = void 0, point = void 0;
                var tick = createjs.Ticker.getTicks();
                if (this.hasAttack(BossAttack.Spiral) && !(tick % 9)) {
                    point = math.pointOnCircle(this.position, (tick * 2.5) % 360);
                    bullet = new objects.EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }
                if (this.hasAttack(BossAttack.Direct) && !(tick % 20)) {
                    bullet = new objects.EnemyBullet(this.position, this.playScene.player.position, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }
                if (this.hasAttack(BossAttack.Charge)) {
                    if (this.frameDifference < 30) {
                        // shake or somethin'
                        // console.log('Frame difference', this.frameDifference);
                    }
                    else {
                        if (!this.playerPositionSnapshot) {
                            this.playerPositionSnapshot = this.playScene.player.position;
                            this.direction = math.Vec2.Direction(this.playerPositionSnapshot, this.position);
                            this.direction.ScaleEq(10);
                        }
                        this.position = this.position.Add(this.direction);
                        if (!objects.Game.isWithinCanvas(this.position)) {
                            this.state = BossState.Pending;
                            // this.resetToAboveCenter();
                            // this.attack = Boss.randomAttack();
                            // this.playerPositionSnapshot = null;
                        }
                    }
                }
                if (this.hasAttack(BossAttack.Shadow)) {
                    var shadowPos = new math.Vec2(this.bossShadow.x, this.bossShadow.y), playerPos = this.playScene.player.position;
                    // diff = math.Vec2.Difference(playerPos, shadowPos);
                    if (!this.shadowGotClose) {
                        if (this.frameDifference >= 160) {
                            this.state = BossState.Pending;
                        }
                        else if (this.frameDifference === 110) {
                            this.bossShadow.visible = false;
                            this.position = shadowPos; //new math.Vec2(this.bossShadow.x, this.bossShadow.y);
                        }
                        else if (this.frameDifference <= 100) {
                            var dir = math.Vec2.Direction(playerPos, shadowPos).ScaleEq(6);
                            shadowPos.Add(dir);
                            this.setShadowPos(shadowPos.x, shadowPos.y);
                        }
                        if (math.Vec2.WithinRange(shadowPos, playerPos, 10)) {
                            this.setFrame = createjs.Ticker.getTicks();
                            this.playerPositionSnapshot = playerPos;
                            this.shadowGotClose = true;
                        }
                    }
                    else {
                        if (this.frameDifference >= 160) {
                            this.state = BossState.Pending;
                        }
                        else if (this.frameDifference === 110) {
                            this.bossShadow.visible = false;
                            this.position = shadowPos; //new math.Vec2(this.bossShadow.x, this.bossShadow.y);
                        }
                        else if (this.frameDifference <= 100) {
                            var playerPos_1 = this.playerPositionSnapshot; // || this.playScene.player.position;
                            this.playerPositionSnapshot = this.playScene.player.position;
                            // playerPos.Add(math.randVec2([-20, 20], [-20, 20]));
                            if (playerPos_1) {
                                this.setShadowPos(playerPos_1.x, playerPos_1.y);
                            }
                        }
                    }
                }
            }
        };
        Boss.prototype.SettingUp = function () {
            var _this = this;
            if (math.Vec2.WithinRange(this.position, this.startingPosition, 10)) {
                this.state = BossState.Attacking;
                // setTimeout(() => {}, math.randRange());
                this.playerPositionSnapshot = null;
                this.setFrame = createjs.Ticker.getTicks();
                if (this.hasAttack(BossAttack.Direct | BossAttack.Spiral)) {
                    setTimeout(function () {
                        _this.state = BossState.Pending;
                    }, math.randRange(3, 6) * 1000);
                }
                if (this.initialSetup) {
                    managers.Sound.sfx('monsterGrowl');
                    this.initialSetup = false;
                }
            }
            else {
                this.position = this.position.Add(this.dirToPos);
            }
        };
        Boss.prototype.resetToAboveCenter = function () {
            this.position = Boss.aboveCenter;
            this.startingPosition = Boss.centerPosition;
            this.dirToPos = math.Vec2.Direction(this.startingPosition, this.position);
        };
        Boss.prototype.Pending = function () {
            this.playerPositionSnapshot = null;
            var newAttack, resetAboveCenter = false;
            if (this.initialSetup) {
                newAttack = BossAttack.Direct;
            }
            else {
                do {
                    newAttack = Boss.randomAttack();
                } while (newAttack === this.attack);
            }
            this.attack = newAttack;
            this.setFrame = createjs.Ticker.getTicks();
            console.log('New Attack', BossAttack[this.attack]);
            if (!objects.Game.isWithinCanvas(this.position)) {
                this.resetToAboveCenter();
                resetAboveCenter = true;
            }
            if (this.hasAttack(BossAttack.Direct | BossAttack.Spiral)) {
                if (!resetAboveCenter) {
                    this.startingPosition = Boss.randomStartingPosition();
                    this.dirToPos = math.Vec2.Direction(this.startingPosition, this.position).ScaleEq(4);
                }
            }
            else if (this.attack === BossAttack.Shadow) {
                var p = this.position;
                this.setShadowPos(p.x, p.y);
                this.position = new math.Vec2(-100, -100);
                this.bossShadow.visible = true;
                this.state = BossState.Attacking;
                this.shadowGotClose = false;
                return;
            }
            else if (this.attack === BossAttack.Charge) {
                this.state = BossState.Attacking;
                return;
            }
            this.attack = newAttack;
            //this.resetToAboveCenter();
            this.state = BossState.SettingUp;
            // this.initialSetup = false;
        };
        Boss.randomAttack = function () {
            switch (math.randInt(1, 4)) {
                case 1: return BossAttack.Direct;
                case 2: return BossAttack.Charge;
                case 3: return BossAttack.Shadow;
                case 4: return BossAttack.Spiral;
                // case 4: return BossAttack.ReverseSpiral;
                // prevents unexpected failure
                default: return BossAttack.Direct;
            }
            return BossAttack.Shadow;
        };
        Boss.prototype.hasAttack = function (attack) {
            // console.log((this.attack & attack))
            return (this.attack & attack) !== 0;
        };
        Boss.randomStartingPosition = function () {
            return math.randVec2([50, 400], [50, 250]);
        };
        Boss.prototype.Destroy = function () {
            if (this.intangible) {
                return;
            }
            this.health--;
            if (this.health === 0) {
                _super.prototype.Destroy.call(this);
                managers.Sound.sfx('monsterGrowl');
            }
        };
        Boss.prototype.setShadowPos = function (x, y) {
            this.bossShadow.x = x;
            this.bossShadow.y = y;
        };
        return Boss;
    }(objects.Enemy));
    objects.Boss = Boss;
})(objects || (objects = {}));
//# sourceMappingURL=boss.js.map