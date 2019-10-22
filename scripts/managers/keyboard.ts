module managers {
    export class Keyboard {

        private static keysPressed = {};
        private static isEnabled = true;
        
        public static listen() {
            document.addEventListener("keydown", Keyboard.onkeydown);
            document.addEventListener("keyup", Keyboard.onkeyup);
        }

        private static onkeydown(event: KeyboardEvent) {
            if (Keyboard.isEnabled) {
                Keyboard.keysPressed[event.keyCode] = true;
            }
        }

        private static onkeyup(event: KeyboardEvent) {
            if (Keyboard.isEnabled) {
                Keyboard.keysPressed[event.keyCode] = false;
            }
        }

        public static disable() {
            Keyboard.isEnabled = false;
            for (let keyCode in Keyboard.keysPressed) {
                delete Keyboard.keysPressed[keyCode];
            }
        }

        public static enable() {
            Keyboard.isEnabled = true;
        }

        public static pressed(key: config.Key): boolean {
            return Keyboard.keysPressed[key];
        }
    }
}
