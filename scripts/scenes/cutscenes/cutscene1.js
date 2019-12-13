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
var scenes;
(function (scenes) {
    var Cutscene1 = /** @class */ (function (_super) {
        __extends(Cutscene1, _super);
        function Cutscene1() {
            var _this = _super.call(this) || this;
            _this.drivingToSpot = true;
            _this.walkToEdge = false;
            _this.walkBackToCar = false;
            _this.driveOff = false;
            _this.dialogHandler = new handlers.DialogHandler(_this);
            _this.playerAnimator = new components.PlayerAnimator();
            _this.playerAnimator.visible = false;
            _this.bg = new createjs.Bitmap(objects.Game.getAsset('arcticMerge'));
            _this.hummer = new createjs.Bitmap(objects.Game.getAsset('hummer'));
            _this.driveTo = new math.Vec2(360, 409);
            _this.driverSideExit = new math.Vec2(_this.playerAnimator.x = _this.driveTo.x - 21, _this.playerAnimator.y = _this.driveTo.y + 37);
            managers.Sound.music(false);
            //
            _this.hummer.x = _this.driveTo.x;
            _this.hummer.y = _this.driveTo.y + 500;
            _this.walkTo = new math.Vec2(334, 216);
            _this.playerAnimator.gotoAndPlay('idle_up');
            var bounds = _this.bg.getBounds(), scale = objects.Game.canvas.width / (bounds.width || 1);
            scale = Number(scale.toFixed(3));
            _this.bg.scaleX = _this.bg.scaleY = scale;
            _this.bg.y = -80;
            _this.playerAnimator.scaleX = _this.playerAnimator.scaleY = .8;
            return _this;
        }
        Cutscene1.prototype.Start = function () {
            this.addChild(this.bg);
            this.addChild(this.playerAnimator);
            this.addChild(this.hummer);
            this.dialogHandler.AppendDialogBox();
        };
        Cutscene1.prototype.Update = function () {
            var _this = this;
            var x = objects.Game.stage.mouseX, y = objects.Game.stage.mouseY;
            // this.hummer.x = x; this.hummer.y = y;
            if (managers.Keyboard.down(config.Key.Q)) {
                console.log("(" + x + ", " + y + ")");
            }
            if (this.drivingToSpot) {
                var hummerPos = new math.Vec2(this.hummer.x, this.hummer.y);
                if (math.Vec2.WithinRange(hummerPos, this.driveTo, 5)) {
                    this.drivingToSpot = false;
                    this.dialogHandler.TriggerMany(['', .75], ["I must be crazy...", 1.5], ["", 1, function () {
                            _this.playerAnimator.visible = true;
                        }], ['', 1], ["Otherwise how could I explain...", 1.5], ["well, whatever \"this\" is", 1], ['', 1.5, function () {
                            _this.walkToEdge = true;
                            _this.playerAnimator.gotoAndPlay('walk_up');
                        }]);
                }
                else {
                    this.hummer.y -= 5;
                }
            }
            else if (this.walkToEdge) {
                var playerPos = new math.Vec2(this.playerAnimator.x, this.playerAnimator.y);
                if (math.Vec2.WithinRange(playerPos, this.walkTo, 5)) {
                    this.walkToEdge = false;
                    this.walkToDir = null;
                    this.playerAnimator.gotoAndPlay('idle_up');
                    this.dialogHandler.TriggerMany(['', .5], 
                    // ["", .5, () => {
                    //     managers.Sound.sfx('monsterGrowl')
                    // }],
                    ["I'm not sure if there's anything left...", 1.5], ['', 2], ["But there's only one way to find out!", 1.5, function () {
                            managers.Sound.music("cyberpunker");
                            _this.walkBackToCar = true;
                            _this.playerAnimator.gotoAndPlay('walk_down');
                        }]);
                }
                else {
                    if (!this.walkToDir) {
                        this.walkToDir = math.Vec2.Direction(this.walkTo, playerPos).ScaleEq(3);
                    }
                    this.playerAnimator.x += this.walkToDir.x;
                    this.playerAnimator.y += this.walkToDir.y;
                }
            }
            else if (this.walkBackToCar) {
                var playerPos = new math.Vec2(this.playerAnimator.x, this.playerAnimator.y);
                if (math.Vec2.WithinRange(playerPos, this.driverSideExit, 5)) {
                    this.walkBackToCar = false;
                    this.playerAnimator.visible = false;
                    setTimeout(function () {
                        _this.driveOff = true;
                    }, 500);
                }
                else {
                    if (!this.walkToDir) {
                        this.walkToDir = math.Vec2.Direction(this.driverSideExit, playerPos).ScaleEq(4);
                    }
                    this.playerAnimator.x += this.walkToDir.x;
                    this.playerAnimator.y += this.walkToDir.y;
                }
            }
            else if (this.driveOff) {
                this.hummer.y -= 7;
                if (this.hummer.y <= -25) {
                    objects.Game.currentState = config.Scene.RETROWAVE;
                }
            }
        };
        return Cutscene1;
    }(scenes.Scene));
    scenes.Cutscene1 = Cutscene1;
})(scenes || (scenes = {}));
//# sourceMappingURL=cutscene1.js.map