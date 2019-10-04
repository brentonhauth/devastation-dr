// Immediate Invoked Anonymous Function

(function() {

    // Global Game Variables
    let canvas = document.getElementById("canvas");
    let stage: createjs.Stage;

    let assetManager: createjs.LoadQueue;
    let manifest: any[];

    // Store current scene and state information
    let currentScene:objects.Scene;
    let currentState:number

    manifest = [
        { id: "backButton", src: "./assets/BackButton.png" },
        { id: "nextButton", src: "./assets/NextButton.png" },
        { id: "background", src: "./assets/background.png" },
        { id: "player", src: "./assets/car.png" },
        { id: "enemy", src: "./assets/ship.png" },
        { id: "bullet", src: "./assets/bullet.png" }
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
        objects.Game.currentScene = config.Scene.START;
        objects.Game.assetManager = assetManager;
        currentState = config.Scene.START; 
        managers.Input.listen();
        Main();
    }

    function Update() {
        // Has my state changed since the last check?
        if(currentState != objects.Game.currentScene) {
            console.log("Changing scenes to" + objects.Game.currentScene);
            Main();
        }

        currentScene.Update();

        stage.update();
    }

    function Main() {
        console.log("Game Start...");

        // Finite State Machine
        switch (objects.Game.currentScene) {
            case config.Scene.START:
                stage.removeAllChildren();
                currentScene = new scenes.StartScene();
                stage.addChild(currentScene);
            break;
            case config.Scene.GAME:
                stage.removeAllChildren();
                currentScene = new scenes.PlayScene();
                stage.addChild(currentScene);
            break;
            case config.Scene.OVER:
                stage.removeAllChildren();
                currentScene = new scenes.GameOverScene();
                stage.addChild(currentScene);
            break;
        }

        currentState = objects.Game.currentScene;
    }

    window.onload = Init;
})();