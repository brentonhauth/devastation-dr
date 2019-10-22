var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        function Keyboard() {
        }
        Keyboard.listen = function () {
            document.addEventListener("keydown", Keyboard.onkeydown);
            document.addEventListener("keyup", Keyboard.onkeyup);
        };
        Keyboard.onkeydown = function (event) {
            if (Keyboard.isEnabled) {
                Keyboard.keysPressed[event.keyCode] = true;
            }
        };
        Keyboard.onkeyup = function (event) {
            if (Keyboard.isEnabled) {
                Keyboard.keysPressed[event.keyCode] = false;
            }
        };
        Keyboard.disable = function () {
            Keyboard.isEnabled = false;
            for (var keyCode in Keyboard.keysPressed) {
                delete Keyboard.keysPressed[keyCode];
            }
        };
        Keyboard.enable = function () {
            Keyboard.isEnabled = true;
        };
        Keyboard.pressed = function (key) {
            return Keyboard.keysPressed[key];
        };
        Keyboard.keysPressed = {};
        Keyboard.isEnabled = true;
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
//# sourceMappingURL=keyboard.js.map