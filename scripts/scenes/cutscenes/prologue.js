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
    var Prologue = /** @class */ (function (_super) {
        __extends(Prologue, _super);
        function Prologue() {
            var _this = _super.call(this) || this;
            _this.initialTrigger = false;
            _this.initialTriggerCount = 0;
            _this.secondaryTrigger = false;
            _this.playSoundTrigger = false;
            _this.storeScale = 2;
            _this.storePos = new math.Vec2(100, 100);
            _this.counterPoint = new math.Vec2(56, 65).ScaleEq(_this.storeScale).Add(_this.storePos);
            _this.doorPoint = new math.Vec2(74, 119).ScaleEq(_this.storeScale).Add(_this.storePos);
            // console.log('Counter Point', this.counterPoint, '\nDoor', this.doorPoint)
            _this.dir = math.Vec2.Direction(_this.doorPoint, _this.counterPoint).ScaleEq(5);
            _this.dialogHandler = new handlers.DialogHandler(_this);
            _this.playerAnimator = new components.PlayerAnimator();
            _this.storeBg = new createjs.Bitmap(objects.Game.getAsset("store"));
            _this.storeBg.scaleX = _this.storeBg.scaleY = _this.storeScale;
            _this.resetStorePos();
            return _this;
        }
        Object.defineProperty(Prologue.prototype, "playerPos", {
            get: function () {
                return new math.Vec2(this.playerAnimator.x, this.playerAnimator.y);
            },
            enumerable: true,
            configurable: true
        });
        Prologue.prototype.Start = function () {
            var _this = this;
            this.addChild(this.storeBg);
            this.addChild(this.playerAnimator);
            this.dialogHandler.AppendDialogBox();
            this.playerAnimator.gotoAndPlay("idle_left");
            this.playerAnimator.x = this.counterPoint.x;
            this.playerAnimator.y = this.counterPoint.y;
            this.dialogHandler.TriggerMany(["", 1], ["Wow, what a wonderful day it is!", 2.5], ["I'm really glad I walked", 2.5], ["Well, better start making my way back", 2.5], ["", 1.5, function () {
                    _this.initialTrigger = true;
                }]);
        };
        Prologue.prototype.Update = function () {
            var _this = this;
            if (this.initialTrigger) {
                this.initialTriggerCount += 1;
                if (!(this.initialTriggerCount % 3)) {
                    this.storeBg.x += math.randRange(-1, 1);
                    this.storeBg.y += math.randRange(-1, 1);
                }
                if (!this.playSoundTrigger && this.initialTriggerCount > 45) {
                    managers.Sound.sfx('monsterGrowl');
                    this.playSoundTrigger = true;
                }
                if (this.initialTriggerCount < 150) {
                    this.playerAnimator.alpha =
                        this.storeBg.alpha = (150 - this.initialTriggerCount) / 150;
                }
                else if (this.initialTriggerCount < 300) {
                    this.playerAnimator.alpha =
                        this.storeBg.alpha = (this.initialTriggerCount - 150) / 150;
                }
                else {
                    this.resetStorePos();
                    this.playerAnimator.gotoAndPlay('oscillate');
                    this.playerAnimator.alpha = this.storeBg.alpha = 1;
                    this.initialTrigger = false;
                    this.dialogHandler.TriggerMany(["", 2, function () {
                            _this.playerAnimator.gotoAndPlay('idle_right');
                        }], ["What was that?!", 2], ["", 1.5], ["No time to waste!\nI gotta get home!", 2,
                        function () {
                            _this.secondaryTrigger = true;
                            _this.playerAnimator.gotoAndPlay("walk_down");
                        }]);
                }
                // this.initialTrigger = false;
            }
            else if (this.secondaryTrigger) {
                this.playerAnimator.x += this.dir.x;
                this.playerAnimator.y += this.dir.y;
                // console.log(this.playerAnimator.x, this.playerAnimator.y, '<---->', this.dir);
                if (math.Vec2.WithinRange(this.playerPos, this.doorPoint, 5)) {
                    this.secondaryTrigger = false;
                    this.playerAnimator.visible = false;
                    this.dialogHandler.Trigger("Hey look a car!", 2, function () {
                        objects.Game.currentState = config.Scene.JUNGLE;
                    });
                }
            }
        };
        Prologue.prototype.resetStorePos = function () {
            this.storeBg.x = this.storePos.x;
            this.storeBg.y = this.storePos.y;
            this.playerAnimator.x = this.counterPoint.x;
            this.playerAnimator.y = this.counterPoint.y;
        };
        return Prologue;
    }(scenes.Scene));
    scenes.Prologue = Prologue;
})(scenes || (scenes = {}));
//# sourceMappingURL=prologue.js.map