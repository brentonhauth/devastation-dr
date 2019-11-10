module objects {
    export class Game {
        public static stage: createjs.Stage;
        public static assetManager: createjs.LoadQueue;
        public static currentScene: scenes.Scene;
        public static currentState: config.Scene;
        public static canvas: HTMLCanvasElement;

        public static isWithinCanvas(point: math.Vec2): boolean {
            if (point.x < 0 || point.x > Game.canvas.width) {
                return false;
            } else if (point.y < 0 || point.y > Game.canvas.height) {
                return false;
            } else {
                return true;
            }
        }
    }
}