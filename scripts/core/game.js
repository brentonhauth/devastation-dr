(function () {
    // Global Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var assetManager;
    var manifest;
    // Store current scene and state information
    var currentScene;
    var currentState;
    manifest = [
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
        // Sounds
        { id: "explosion", src: "./assets/sounds/explosion.wav" },
        { id: "cyberpunker", src: "./assets/sounds/cyberpunker.ogg" }
    ];
    function Init() {
        console.log("Initialization Start");
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(manifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        // Freqeuncy of checks. Computationally expensive. Turn on in menus, Turn off in game
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        // Set up default game state
        // Create a global reference to our stage object
        objects.Game.stage = stage;
        objects.Game.currentState = currentState = config.Scene.START;
        objects.Game.assetManager = assetManager;
        managers.Input.listen();
        Main();
    }
    function Update() {
        // Has my state changed since the last check?
        if (currentState != objects.Game.currentState) {
            console.log("Changing scenes to" + objects.Game.currentState);
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    function Main() {
        console.log("Game Start...");
        // Finite State Machine
        switch (objects.Game.currentState) {
            case config.Scene.START:
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.GAME:
                currentScene = new scenes.PlayScene();
                break;
            case config.Scene.OVER:
                currentScene = new scenes.GameOverScene();
                break;
        }
        stage.removeAllChildren();
        objects.Game.currentScene = currentScene;
        currentState = objects.Game.currentState;
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map