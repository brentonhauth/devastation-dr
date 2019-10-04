var managers;
(function (managers) {
    var Input = /** @class */ (function () {
        function Input() {
        }
        // Remove (?)
        //private static keyupMaping: InputOption[];
        //private static keyholdMaping: InputOption[];
        Input.Init = function () {
            this.keydownMaping = new Array(0);
        };
        Input.keypress = function (key, callback) {
            var io = new InputOption(key, KeyAction.Down, callback);
            Input.keydownMaping.push(io);
            return io;
        };
        Input.listen = function () {
            this.keydownMaping = new Array(0);
            window.addEventListener("keydown", Input.onKey, false);
        };
        Input.onKey = function (e) {
            var key = e.key ? e.key.toLowerCase() : "";
            Input.keydownMaping.forEach(function (k) {
                if (k.getKey().toLowerCase() == key && !k.isDisabled()) {
                    k.Call(e);
                }
            });
        };
        Input.disable = function (key) {
            key = key.toLowerCase();
            Input.keydownMaping.forEach(function (keyOption) {
                if (keyOption.getKey().toLowerCase() == key) {
                    keyOption.disable();
                }
            });
        };
        Input.enabled = function (key) {
            key = key.toLowerCase();
            Input.keydownMaping.forEach(function (keyOption) {
                if (keyOption.getKey().toLowerCase() == key) {
                    keyOption.enable();
                }
            });
        };
        return Input;
    }());
    managers.Input = Input;
    var InputOption = /** @class */ (function () {
        function InputOption(key, keyAct, callback) {
            this.disabled = false;
            this.key = key.charAt(0);
            this.keyAction = keyAct;
            this.callback = callback;
        }
        InputOption.prototype.getKey = function () {
            return this.key;
        };
        InputOption.prototype.Call = function (e) {
            this.callback(e);
        };
        InputOption.prototype.isDisabled = function () {
            return this.disabled;
        };
        InputOption.prototype.disable = function () {
            this.disabled = true;
        };
        InputOption.prototype.enable = function () {
            this.disabled = false;
        };
        return InputOption;
    }());
    managers.InputOption = InputOption;
    var KeyAction;
    (function (KeyAction) {
        KeyAction[KeyAction["Down"] = 0] = "Down";
        KeyAction[KeyAction["Up"] = 1] = "Up";
        KeyAction[KeyAction["Hold"] = 2] = "Hold";
    })(KeyAction = managers.KeyAction || (managers.KeyAction = {}));
})(managers || (managers = {}));
//# sourceMappingURL=input.js.map