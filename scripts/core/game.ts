(function() {
"use strict";


// Global Game Variables
let canvas = document.getElementById("canvas");

let stage: createjs.Stage;
let currentState: number;
let currentScene: objects.Scene;


let queue: createjs.LoadQueue; // assetManager

let assetManifest: any[];


assetManifest = [
    { id: "clickMeButton", src: "./assets/ClickMeButton.png" },
    { id: "nextButton", src: "./assets/NextButton.png" },
    { id: "backButton", src: "./assets/BackButton.png" },
    // { id: "", src: "./assets/outerSpace" }
];

function Init() {
    
    console.log("Initialization Started...");
    queue = new createjs.LoadQueue();

    queue.installPlugin(createjs.Sound);
    queue.loadManifest(assetManifest);
    queue.on("complete", Start, this);
    
    // Start();
}


function Start() {
    console.log("Starting Application...");

    // Init CreateJS
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // frequency of checks. expensive. turn on in menu, off in game.
    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", Update);

    objects.Game.currentScene = currentState = config.Scene.START;
    
    Main();
}


function Update() {
    if (currentState != objects.Game.currentScene) {
        currentState = objects.Game.currentScene;
        Main();
    }

    currentScene.Update();

    stage.update();
}

function Main() {
    // Finite state machine
    switch (objects.Game.currentScene) {
        case config.Scene.START:
            stage.removeAllChildren();
            currentScene = new scenes.StartScene(queue);
            stage.addChild(currentScene);
            break;
        case config.Scene.GAME:
            stage.removeAllChildren();
            currentScene = new scenes.PlayScene(queue);
            stage.addChild(currentScene);
            break;
        case config.Scene.OVER:
            stage.removeAllChildren();
            currentScene = new scenes.OverScene(queue);
            stage.addChild(currentScene);
            break;
    }
}


window.onload = Init;

})();
