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
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        // Constructor
        function StartScene() {
            var _this = _super.call(this) || this;
            _this.helpLabels = [];
            _this.background = new createjs.Bitmap(objects.Game.getAsset("menu"));
            _this.logo = new createjs.Bitmap(objects.Game.getAsset("logo"));
            _this.infoLabel = new ui.Label("(c) Rude Rhino", "18px", "Arial", "#e1e1f1", 320, 800, true);
            _this.logo.scaleX *= .65;
            _this.logo.scaleY *= .65;
            _this.logo.x = 350;
            _this.logo.y = 50;
            //Main Game UI
            _this.startButton = new ui.Button("playButton", 640, 180);
            _this.settingsButton = new ui.Button("settingsButton", 640, 240);
            _this.helpButton = new ui.Button("helpButton", 640, 300);
            _this.mainUIContainer = new createjs.Container();
            _this.mainUIContainer.addChild(_this.startButton, _this.settingsButton, _this.helpButton);
            // Volume Settings UI 
            _this.volumeControlsContainer = new createjs.Container();
            _this.volumeControlsContainer.x = 530;
            _this.volumeControlsContainer.y = 130;
            _this.soundSlider = new ui.Volumeslider("Sound");
            _this.soundSlider.y = 15;
            _this.musicSlider = new ui.Volumeslider("Music");
            _this.musicSlider.y = 60;
            _this.sfxSlider = new ui.Volumeslider("Sfx");
            _this.sfxSlider.y = 105;
            _this.backButton = new ui.Button("backButton", 125, 145);
            _this.volumeControlsContainer.addChild(_this.soundSlider, _this.musicSlider, _this.sfxSlider, _this.backButton);
            _this.volumeControlsContainer.visible = false;
            //Help UI
            _this.backButtonForHelpUI = new ui.Button("backButton", 590, 325);
            _this.helpContainer = new createjs.Container();
            _this.setUpHelpLabels();
            _this.helpLabels.forEach(function (element) {
                _this.helpContainer.addChild(element);
            });
            _this.helpContainer.addChild(_this.backButtonForHelpUI, _this.helpTitle);
            _this.helpContainer.visible = false;
            return _this;
        }
        StartScene.prototype.Start = function () {
            var _this = this;
            this.addChild(this.background);
            //Adding UI to scene
            this.addChild(this.mainUIContainer);
            this.addChild(this.volumeControlsContainer);
            this.addChild(this.helpContainer);
            this.addChildAt(this.logo, 2);
            this.addChild(this.infoLabel);
            //Click event for start button
            this.startButton.on("click", function () {
                objects.Game.currentState = config.Scene.PROLOGUE;
            });
            //Click event for settings button
            this.settingsButton.on("click", function () {
                _this.mainUIContainer.visible = false;
                _this.volumeControlsContainer.visible = true;
            });
            //Click event for back button (Setting UI)
            this.backButton.on("click", function () {
                _this.volumeControlsContainer.visible = false;
                _this.mainUIContainer.visible = true;
            });
            //Click event for help button
            this.helpButton.on("click", function () {
                _this.volumeControlsContainer.visible = false;
                _this.mainUIContainer.visible = false;
                _this.helpContainer.visible = true;
            });
            //Click event for start button (Help UI)
            this.backButtonForHelpUI.on("click", function () {
                _this.volumeControlsContainer.visible = false;
                _this.mainUIContainer.visible = true;
                _this.helpContainer.visible = false;
            });
        };
        //Adding KeyBinding Labels for Help UI
        StartScene.prototype.setUpHelpLabels = function () {
            this.helpTitle = new ui.Label("Key Bindings", "24px", "Arial", "#008000", 630, 155, true);
            this.helpTitle.outline = 1.5;
            this.helpLabels[0] = new ui.Label("Move up - W", "18px", "Arial", "#000800", 630, 190, true);
            this.helpLabels[0].outline = 1.5;
            this.helpLabels[1] = new ui.Label("Move down - S", "18px", "Arial", "#000800", 630, 220, true);
            this.helpLabels[1].outline = 1.5;
            this.helpLabels[2] = new ui.Label("Move Left - A", "18px", "Arial", "#000800", 630, 250, true);
            this.helpLabels[2].outline = 1.5;
            this.helpLabels[3] = new ui.Label("Move  Right - D", "18px", "Arial", "#000800", 630, 280, true);
            this.helpLabels[3].outline = 1.5;
            this.helpLabels[4] = new ui.Label("Shoot - Space", "18px", "Arial", "#000800", 630, 310, true);
            this.helpLabels[4].outline = 1.5;
        };
        return StartScene;
    }(scenes.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map