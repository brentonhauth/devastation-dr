(function() {

    // Global Game Variables
    let canvas = document.getElementById("canvas");
    let stage: createjs.Stage;

    let assetManager: createjs.LoadQueue;

    // Store current scene and state information
    let currentScene: scenes.Scene;
    let currentState: config.Scene;

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
        if(currentState != objects.Game.currentState) {
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