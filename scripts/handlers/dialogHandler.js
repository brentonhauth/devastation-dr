var handlers;
(function (handlers) {
    var DialogHandler = /** @class */ (function () {
        function DialogHandler(playScene) {
            this.playScene = playScene;
            this.queue = new Array();
            this.dialogBox = new ui.Label("", "24px", "Arial", "#1d1d1d", 300, 500);
            this.dialogBox.visible = false;
        }
        DialogHandler.prototype.Trigger = function (text, delay, cb) {
            if (cb === void 0) { cb = undefined; }
            this.queue.push({ text: text, delay: delay, cb: cb });
            if (!this.dialogBox.visible) {
                this.ShowNext();
            }
        };
        DialogHandler.prototype.TriggerMany = function () {
            var _this = this;
            var dialog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                dialog[_i] = arguments[_i];
            }
            dialog.forEach(function (d) {
                if (Array.isArray(d)) {
                    _this.Trigger(d[0], d[1], d[2]);
                }
            });
        };
        DialogHandler.prototype.ShowNext = function () {
            var _this = this;
            var current = this.queue.shift();
            this.dialogBox.visible = true;
            this.dialogBox.text = current.text;
            setTimeout(function () {
                if (_this.queue.length > 0) {
                    _this.ShowNext();
                }
                else {
                    _this.Clear();
                }
                if (typeof current.cb === "function") {
                    current.cb();
                }
            }, current.delay * 1000);
        };
        DialogHandler.prototype.Clear = function () {
            this.dialogBox.text = "";
            this.dialogBox.visible = false;
        };
        DialogHandler.prototype.AppendDialogBox = function () {
            this.playScene.addChild(this.dialogBox);
        };
        return DialogHandler;
    }());
    handlers.DialogHandler = DialogHandler;
})(handlers || (handlers = {}));
//# sourceMappingURL=dialogHandler.js.map