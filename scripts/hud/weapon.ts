module hud {
    export class WeaponHUD extends createjs.Container {
        private weaponText: ui.Label;
        private static savedScore: number = 0;
        private static currentScore: number = 0;
        private weaponImage: createjs.Bitmap;
        private tempMap: Object;
        public playScene: scenes.PlayScene;

        constructor() {
            super();
            this.weaponText = new ui.Label("Weapon level: 1", "16px", "Consolas", "#FFFFFF", 540, 30, true);
            this.weaponImage = new createjs.Bitmap(objects.Game.assetManager.getResult("pistol"));

            this.tempMap = new Object;
            this.tempMap[config.Weapon.MACHINEGUN] = "machineGun";
            this.tempMap[config.Weapon.PISTOL] = "pistol";
            this.tempMap[config.Weapon.LASER] = "laser";
            this.tempMap[config.Weapon.FLAMETHROWER] = "machineGun";

            this.weaponImage.x = 640;
            this.weaponImage.y = 20;

            this.weaponText.x = 640;
            this.weaponText.y = 70;

            this.addChild(this.weaponImage);
            this.addChild(this.weaponText);
        }

        public updateWeapon(weapon: objects.Weapon): void {
            this.removeChild(this.weaponImage)
            let imageString = this.tempMap[weapon.weaponType];

            this.weaponImage = new createjs.Bitmap(objects.Game.assetManager.getResult(imageString));
            this.weaponImage.x = 640;
            this.weaponImage.y = 30;           
            this.addChild(this.weaponImage);
            this.weaponText.text = "Weapon level: " + String(weapon.upgradeLevel);
            //this.weaponImage.image = objects.Game.assetManager.getResult(imageString)
        }

    }
}
