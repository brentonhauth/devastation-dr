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
        CamelAttack[CamelAttack["ReverseSpiral"] = 4] = "ReverseSpiral";
        CamelAttack[CamelAttack["Direct"] = 8] = "Direct";
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
            var _this = _super.call(this, new createjs.SpriteSheet({
                images: [objects.Game.getAsset('camelSheet')],
                frames: { width: 72, height: 72, count: 12 },
                animations: {
                    idle_down: 1, walk_down: { speed: .1, frames: [0, 1, 2] },
                    idle_left: 4, walk_left: { speed: .1, frames: [3, 4, 5] },
                    idle_right: 7, walk_right: { speed: .1, frames: [6, 7, 8] },
                    idle_up: 10, walk_up: { speed: .1, frames: [9, 10, 11] },
                    walk_backwards: { speed: .1, frames: [2, 1, 0] },
                    oscillate: { speed: .05, frames: [4, 7] }
                }
            })) || this;
            _this.oscillateCountUp = true;
            _this.oscillateCounter = 60;
            _this.health = 30;
            // this.width = 72;
            // this.height = 72;
            _this.Init();
            _this.Reset();
            return _this;
        }
        Camel.prototype.Start = function () {
            this.animator.gotoAndPlay('walk_down');
            managers.Sound.music(false);
            this.currentAttack = Camel.randomAttack();
            this.position = new math.Vec2(this.startingPos.x, this.startingPos.y - 300);
            this.dirToNextPost = math.Vec2.Down; // math.Vec2.Direction(this.startingPos, this.position);
        };
        Camel.prototype.Reset = function () {
            this.state = CamelState.SettingUp;
            this.health = 30;
            this.startingPos = Camel.randomStartingPosition();
        };
        Camel.prototype.Update = function () {
            var point, bullet, tick = createjs.Ticker.getTicks();
            if (this.state === CamelState.SettingUp) {
                this.SettingUp();
            }
            else if (this.state === CamelState.Pending) {
                this.Pending();
            }
            else if (this.state === CamelState.Attacking) {
                if (this.hasAttack(CamelAttack.Spiral) && !(tick % 9)) {
                    point = math.pointOnCircle(this.position, (tick * 2.5) % 360);
                    bullet = new objects.EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }
                if (this.hasAttack(CamelAttack.ReverseSpiral) && !(tick % 9)) {
                    point = math.pointOnCircle(this.position, 360 - ((tick * 2.5) % 360));
                    bullet = new objects.EnemyBullet(this.position, point, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }
                if (this.hasAttack(CamelAttack.Oscillate)) {
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
                if (this.hasAttack(CamelAttack.Direct) && !(tick % 15)) {
                    bullet = new objects.EnemyBullet(this.position, this.playScene.player.position, this, this.playScene.enemyBulletHandler);
                    this.playScene.enemyBulletHandler.AddExistingBullet(bullet);
                }
            }
        };
        Camel.prototype.SettingUp = function () {
            var _this = this;
            if (math.Vec2.WithinRange(this.position, this.startingPos, 10)) {
                this.state = CamelState.Attacking;
                if (!managers.Sound.isPlayingMusic) {
                    this.playScene.dialogHandler.Trigger('What is that?!', 2.5);
                    managers.Sound.music(true);
                }
                managers.Sound.sfx('camelSpit');
                if (this.currentAttack === CamelAttack.Oscillate) {
                    this.animator.gotoAndPlay('oscillate');
                }
                else {
                    this.animator.gotoAndPlay('walk_backwards');
                }
                setTimeout(function () {
                    _this.state = CamelState.Pending;
                }, math.randRange(4, 8) * 1000);
            }
            else {
                this.position = this.position.Add(this.dirToNextPost);
            }
        };
        Camel.prototype.Pending = function () {
            var prevAttack = this.currentAttack, newAttack = CamelAttack.None, curAttack = CamelAttack.None, numOfAttacks = this.health <= 15 ? 2 : 1;
            // if (this.health <= 10) {
            //     numOfAttacks = 3;
            // } else if (this.health <= 20) {
            //     numOfAttacks = 2;
            // }
            for (var i = 0; i < numOfAttacks; i++) {
                do {
                    newAttack = Camel.randomAttack();
                } while ((curAttack & newAttack) !== 0);
                curAttack |= newAttack;
            }
            this.currentAttack = curAttack;
            // while (prevAttack === this.currentAttack) {
            //     this.currentAttack = Camel.randomAttack();
            // }
            this.startingPos = Camel.randomStartingPosition();
            this.state = CamelState.SettingUp;
            this.dirToNextPost = math.Vec2.Direction(this.startingPos, this.position).ScaleEq(3);
        };
        Camel.randomAttack = function () {
            switch (math.randInt(1, 4)) {
                case 1: return CamelAttack.Direct;
                case 2: return CamelAttack.Oscillate;
                case 3: return CamelAttack.Spiral;
                case 4: return CamelAttack.ReverseSpiral;
                // prevents unexpected failure
                default: return CamelAttack.Direct;
            }
        };
        Camel.prototype.hasAttack = function (attack) {
            return (this.currentAttack & attack) !== 0;
        };
        Camel.randomStartingPosition = function () {
            return math.randVec2([50, 400], [50, 250]);
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