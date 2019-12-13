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
    var Retrowave = /** @class */ (function (_super) {
        __extends(Retrowave, _super);
        function Retrowave() {
            var _this = _super.call(this) || this;
            _this.ending = false;
            _this.fadeCounter = 0;
            _this.background.Overlap = 5;
            return _this;
        }
        Retrowave.prototype.Start = function () {
            var _this = this;
            _super.prototype.Start.call(this);
            this.dialogHandler.TriggerMany(["", 1, function () {
                    managers.Sound.sfx('monsterGrowl');
                }], ["", 2], ["There's that noise again...", 2, function () {
                    _this.waveHandler.Start();
                }]);
        };
        Retrowave.prototype.Update = function () {
            var _this = this;
            _super.prototype.Update.call(this);
            if (this.ending) {
                this.fadeCounter++;
                if (!(createjs.Ticker.getTicks() % 2)) {
                    var randV2 = math.randVec2([-1, 1], [-1, 1]);
                    this.player.position = this.player.position.Add(randV2);
                }
                if (this.fadeCounter <= 250) {
                    this.player.alpha =
                        this.background.alpha = (250 - this.fadeCounter) / 250;
                    if (this.fadeCounter === 100) {
                        this.dialogHandler.Trigger("WHAAAAAAAAAAAA!", 1.5);
                    }
                }
                else {
                    this.ending = false;
                    var txt_1 = new ui.Label("To be continued...", "28px", "Arial", "#000", objects.Game.canvas.width / 2, objects.Game.canvas.height / 2, true);
                    this.dialogHandler.TriggerMany(["", 1], ["", 1, function () {
                            _this.addChild(txt_1);
                        }], ["", 2, function () {
                            txt_1.text = "";
                        }], ["", 1, function () {
                            txt_1.text = "In memory of Reggie";
                        }], ["", 2, function () {
                            txt_1.text = "";
                        }], ["", 1, function () {
                            managers.Keyboard.enable();
                            objects.Game.currentState = config.Scene.START;
                        }]);
                }
            }
        };
        Retrowave.prototype.Main = function () {
            var _this = this;
            _super.prototype.Main.call(this);
            this.waveHandler.Add(new objects.Wave([objects.Boss, 1]));
            this.waveHandler.on('complete', function () {
                _this.ending = true;
                _this.weaponHUD.visible = false;
                _this.player.intangible = true;
                managers.Keyboard.disable();
                managers.Sound.music(false);
                // this.dialogHandler.TriggerMany(
                //     ["", 1.5, () => {
                //     }],
                //     ['', 2, () => {
                //         //objects.Game.currentState = config.Scene.START;
                //     }]
                // );
            });
        };
        return Retrowave;
    }(scenes.PlayScene));
    scenes.Retrowave = Retrowave;
})(scenes || (scenes = {}));
//# sourceMappingURL=retrowave.js.map