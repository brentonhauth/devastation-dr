var config;
(function (config) {
    function getManifest() {
        return [
            // Images
            { id: "logo", src: "./assets/images/devastation-dr.PNG" },
            { id: "backButton", src: "./assets/images/BackButton.png" },
            { id: "nextButton", src: "./assets/images/NextButton.png" },
            { id: "background", src: "./assets/images/desert.png" },
            { id: "desert", src: "./assets/images/desert.png" },
            { id: "arctic", src: "./assets/images/winter2.png" },
            { id: "jungle", src: "./assets/images/desert.png" },
            { id: "player", src: "./assets/images/car.png" },
            { id: "enemy", src: "./assets/images/ship.png" },
            { id: "bullet", src: "./assets/images/bullet.png" },
            { id: "basicEnemy", src: "./assets/images/enemy.png" },
            { id: "spider", src: "./assets/images/spider1.png" },
            { id: "playerSheet", src: "./assets/images/sheets/player_sheet112x146.png" },
            { id: "hummer", src: "./assets/images/hummer.png" },
            { id: "fish", src: "./assets/images/fish.png" },
            { id: "store", src: "./assets/images/store.png" },
            { id: "wolfSheet", src: "./assets/images/sheets/enemies/wolfSheet.png" },
            { id: "polarBearSheet", src: "./assets/images/sheets/enemies/polarBearSheet.png" },
            { id: "penguinSheet", src: "./assets/images/sheets/enemies/penguinSheet.png" },
            { id: "lizardSheet", src: "./assets/images/sheets/enemies/alligatorSheet.png" },
            { id: "powerup", src: "./assets/images/powerup.png" },
            { id: "pistol", src: "./assets/images/Pistol.png" },
            { id: "machineGun", src: "./assets/images/MachineGun.png" },
            // Sounds
            { id: "explosion", src: "./assets/sounds/explosion.wav" },
            { id: "cyberpunker", src: "./assets/sounds/cyberpunker.ogg" },
            { id: "reload", src: "./assets/sounds/reload.mp3" }
        ];
    }
    config.getManifest = getManifest;
})(config || (config = {}));
//# sourceMappingURL=manifest.js.map