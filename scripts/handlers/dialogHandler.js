var handlers;
(function (handlers) {
    /**
     * TODO:
     * - create 'Time' manager for delayed callbacks instead of using setTimeout()
     *  - Useful in pausing is ever implemented.
     */
    var DialogHandler = /** @class */ (function () {
        // private outline: createjs.Shape;
        function DialogHandler(playScene) {
            this.playScene = playScene;
            this.queue = new Array();
            this.dialogBox = new ui.Label("", "24px", "Arial", "#1d1d1d", objects.Game.canvas.width * .5, objects.Game.canvas.height * .9, true);
            this.dialogBox.visible = false;
        }
        DialogHandler.prototype.Trigger = function (text, delay, cb) {
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
                _this.Trigger(d[0], d[1], d[2]);
            });
        };
        DialogHandler.prototype.ShowNext = function () {
            var _this = this;
            var current = this.queue.shift();
            this.dialogBox.visible = true;
            this.dialogBox.text = current.text;
            this.dialogBox.Center();
            setTimeout(function () {
                if (_this.queue.length > 0) {
                    requestAnimationFrame(_this.ShowNext.bind(_this));
                }
                else {
                    requestAnimationFrame(_this.Clear.bind(_this));
                }
                if (current.cb) {
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