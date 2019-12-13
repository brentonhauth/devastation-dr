module scenes {
    export class StartScene extends Scene {
        // Variables
        private background: createjs.Bitmap;
        private infoLabel: ui.Label;
        private helpLabels: ui.Label[];
        private logo: createjs.Bitmap;
        private startButton: ui.Button;
        private settingsButton: ui.Button;
        private backButton: ui.Button;
        private backButtonForHelpUI: ui.Button;
        private helpButton: ui.Button;
        private mainUIContainer: createjs.Container;
        private volumeControlsContainer: createjs.Container;
        private helpContainer: createjs.Container;
        private soundSlider: ui.Volumeslider;
        private musicSlider: ui.Volumeslider;
        private sfxSlider: ui.Volumeslider;
        private helpTitle: ui.Label;

        // Constructor
        constructor() {
            super();

            this.background = new createjs.Bitmap(objects.Game.assetManager.getResult("menu"));
            this.logo = new createjs.Bitmap(objects.Game.assetManager.getResult("logo"));
            this.helpLabels = [];

            this.infoLabel = new ui.Label(
                "(c) Rude Rhino", "18px", "Arial", "#e1e1f1", 320, 800, true);

            this.logo.scaleX *= .65;
            this.logo.scaleY *= .65;
            this.logo.x = 350;
            this.logo.y = 50;

            //Main Game UI
            this.startButton = new ui.Button("playButton", 640, 180);
            this.settingsButton = new ui.Button("settingsButton", 640, 240);
            this.helpButton = new ui.Button("helpButton", 640, 300);

            this.mainUIContainer = new createjs.Container();
            this.mainUIContainer.addChild(this.startButton, this.settingsButton, this.helpButton);

            // Volume Settings UI 
            this.volumeControlsContainer = new createjs.Container();
            this.volumeControlsContainer.x = 530;
            this.volumeControlsContainer.y = 130;

            this.soundSlider = new ui.Volumeslider("Sound");
            this.soundSlider.y = 15;
            this.musicSlider = new ui.Volumeslider("Music");
            this.musicSlider.y = 60;
            this.sfxSlider = new ui.Volumeslider("Sfx");
            this.sfxSlider.y = 105;

            this.backButton = new ui.Button("backButton", 125, 145);

            this.volumeControlsContainer.addChild(this.soundSlider, this.musicSlider, this.sfxSlider, this.backButton)
            this.volumeControlsContainer.visible = false;

            //Help UI
            this.backButtonForHelpUI = new ui.Button("backButton", 590, 325);

            this.helpContainer = new createjs.Container();
            this.setUpHelpLabels();
            this.helpLabels.forEach(element => {
                this.helpContainer.addChild(element);
            });
            this.helpContainer.addChild(this.backButtonForHelpUI, this.helpTitle);
            this.helpContainer.visible = false;
        }


        public Start(): void {
            this.addChild(this.background);

            //Adding UI to scene
            this.addChild(this.mainUIContainer);
            this.addChild(this.volumeControlsContainer);
            this.addChild(this.helpContainer);

            this.addChildAt(this.logo, 2);
            this.addChild(this.infoLabel);

            //Click event for start button
            this.startButton.on("click", () => {
                objects.Game.currentState = config.Scene.JUNGLE;
            });

            //Click event for settings button
            this.settingsButton.on("click", () => {
                this.mainUIContainer.visible = false;
                this.volumeControlsContainer.visible = true;
            });

            //Click event for back button (Setting UI)
            this.backButton.on("click", () => {
                this.volumeControlsContainer.visible = false;
                this.mainUIContainer.visible = true;
            });

            //Click event for help button
            this.helpButton.on("click", () => {
                this.volumeControlsContainer.visible = false;
                this.mainUIContainer.visible = false;
                this.helpContainer.visible = true;
            });

            //Click event for start button (Help UI)
            this.backButtonForHelpUI.on("click", () => {
                this.volumeControlsContainer.visible = false;
                this.mainUIContainer.visible = true;
                this.helpContainer.visible = false;
            });
        }

        //Adding KeyBinding Labels for Help UI
        setUpHelpLabels(): void {
            this.helpTitle = new ui.Label(
                "Key Bindings", "24px", "Arial", "#008000", 630, 155, true);
            this.helpTitle.outline = 1.5;
            this.helpLabels[0] = new ui.Label(
                "Move up - W", "18px", "Arial", "#000800", 630, 190, true);
            this.helpLabels[0].outline = 1.5;
            this.helpLabels[1] = new ui.Label(
                "Move down - S", "18px", "Arial", "#000800", 630, 220, true);
            this.helpLabels[1].outline = 1.5;
            this.helpLabels[2] = new ui.Label(
                "Move Left - A", "18px", "Arial", "#000800", 630, 250, true);
            this.helpLabels[2].outline = 1.5;
            this.helpLabels[3] = new ui.Label(
                "Move  Right - D", "18px", "Arial", "#000800", 630, 280, true);
            this.helpLabels[3].outline = 1.5;
            this.helpLabels[4] = new ui.Label(
                "Shoot - Space", "18px", "Arial", "#000800", 630, 310, true);
            this.helpLabels[4].outline = 1.5;
        }
    }
}
