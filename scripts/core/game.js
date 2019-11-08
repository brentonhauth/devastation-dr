(function () {
    // Global Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var assetManager;
    // Store current scene and state information
    var currentScene;
    var currentState;
    function Init() {
        console.log("Initialization Start");
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(config.getManifest());
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        // Initialize CreateJS
        objects.Game.stage = stage = new createjs.Stage(canvas);
        // Freqeuncy of checks. Computationally expensive. Turn on in menus, Turn off in game
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        // Set up default game state
        // Create a global reference to our stage object
        managers.Keyboard.listen();
        objects.Game.currentState = currentState = config.Scene.START;
        objects.Game.assetManager = assetManager;
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
                // currentScene = new scenes.PlayScene();
                break;
            case config.Scene.OVER:
                currentScene = new scenes.GameOverScene();
                break;
            // LEVELS
            case config.Scene.JUNGLE:
                currentScene = new scenes.JungleScene();
                break;
            case config.Scene.DESERT:
                currentScene = new scenes.DesertScene();
                break;
            case config.Scene.ARCTIC:
                currentScene = new scenes.ArcticScene();
                break;
            // CUTSCENES
            case config.Scene.PROLOGUE:
                currentScene = new scenes.Prologue();
                break;
        }
        stage.removeAllChildren();
        objects.Game.currentScene = currentScene;
        currentState = objects.Game.currentState;
        stage.addChild(currentScene);
        currentScene.Start();
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map