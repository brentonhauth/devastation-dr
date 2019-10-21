module objects {
    export class Game {
        public static stage: createjs.Stage;
        public static assetManager: createjs.LoadQueue;
        public static currentScene: scenes.Scene;
        public static currentState: config.Scene;
    }
}