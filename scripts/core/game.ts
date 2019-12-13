(function () {

    // Global Game Variables
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");
    let stage: createjs.Stage;

    let assetManager: createjs.LoadQueue;

    // Store current scene and state information
    let currentScene: scenes.Scene;
    let currentState: config.Scene;

    let StopLoading = (function() {
        var ctx = canvas.getContext('2d'),
        color = Math.ceil(Math.random()*360);
        var g: any = {};
        g.run = true, g.angle = 1.5;
        g.W = canvas.width, g.X = g.W * .5;
        g.H = canvas.height, g.Y = g.H * .5;
        (g.Draw=function() {
            if (!g.run) { return; }
            setTimeout(() => requestAnimationFrame(g.Draw), 19);
            ctx.fillStyle = 'rgba(255,255,255,.15)';
            ctx.fillRect(0, 0, g.W, g.H);
            let e = (g.angle % 2) * Math.PI,
            s = ((g.angle - .1) % 2) * Math.PI;
            ctx.beginPath(); ctx.lineWidth = 3;
            ctx.arc(g.X, g.Y, 45, s, e, false);
            ctx.strokeStyle = `hsl(${(color += .5) % 360}, 80%, 60%)`;
            ctx.stroke();
            g.angle += .025;
        })();
        return function Stop() {
            g.run = false;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, g.W, g.H);
        };
    })();

    function Init() {
        console.log("Initialization Start");
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(config.getManifest());
        assetManager.on("complete", Start, this);
    }

    function Start() {
        console.log("Starting Application...");

        StopLoading();

        // Initialize CreateJS
        objects.Game.stage = stage = new createjs.Stage(canvas);
        objects.Game.canvas = canvas;
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
            console.log('Starting scene ' + config.Scene[objects.Game.currentState]);
            Main();
        }

        currentScene.Update();

        stage.update();
    }

    function Main() {
        switch (objects.Game.currentState) {
            case config.Scene.START:
                currentScene = new scenes.StartScene();
                break;
            // case config.Scene.GAME:
            //     currentScene = new scenes.PlayScene();
            //     break;
            case config.Scene.OVER:
                currentScene = new scenes.GameOverScene(currentState);
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
            case config.Scene.RETROWAVE:
                currentScene = new scenes.Retrowave();
                break;
            
            // CUTSCENES
            case config.Scene.PROLOGUE:
                currentScene = new scenes.Prologue();
                break;
            case config.Scene.CUTSCENE_1:
                currentScene = new scenes.Cutscene1();
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