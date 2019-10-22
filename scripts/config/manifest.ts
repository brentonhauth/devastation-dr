module config {
    export function getManifest() {
        return [
            // Images
            { id: "logo", src: "./assets/images/devastation-dr.PNG" },
            { id: "backButton", src: "./assets/images/BackButton.png" },
            { id: "nextButton", src: "./assets/images/NextButton.png" },
            { id: "background", src: "./assets/images/road1.png" }, // "./assets/images/background.png"
            { id: "player", src: "./assets/images/car.png" },
            { id: "enemy", src: "./assets/images/ship.png" },
            { id: "bullet", src: "./assets/images/bullet.png" },
            { id: "basicEnemy", src: "./assets/images/enemy.png" },
            { id: "spider", src: "./assets/images/spider1.png" },

            // Sounds
            { id: "explosion", src: "./assets/sounds/explosion.wav" },
            { id: "cyberpunker", src: "./assets/sounds/cyberpunker.ogg" }
        ];
    }
}