var config;
(function (config) {
    function getManifest() {
        return [
            // Images
            { id: "logo", src: "./assets/images/devastation-dr.PNG" },
            { id: "backButton", src: "./assets/images/BackButton.png" },
            { id: "nextButton", src: "./assets/images/NextButton.png" },
            { id: "background", src: "./assets/images/road1.png" },
            { id: "player", src: "./assets/images/car.png" },
            { id: "enemy", src: "./assets/images/ship.png" },
            { id: "bullet", src: "./assets/images/bullet.png" },
            { id: "basicEnemy", src: "./assets/images/enemy.png" },
            { id: "spider", src: "./assets/images/spider1.png" },
            { id: "playerSheet", src: "./assets/images/player_sheet112x146.png" },
            { id: "hummer", src: "./assets/images/hummer.png" },
            // Sounds
            { id: "explosion", src: "./assets/sounds/explosion.wav" },
            { id: "cyberpunker", src: "./assets/sounds/cyberpunker.ogg" }
        ];
    }
    config.getManifest = getManifest;
})(config || (config = {}));
//# sourceMappingURL=manifest.js.map