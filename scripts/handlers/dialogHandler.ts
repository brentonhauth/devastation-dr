module handlers {

    type DialogArg = [string, number, Function?];
    type Dialog = { text: string, delay: number, cb?: Function };

    /**
     * TODO:
     * - create 'Time' manager for delayed callbacks instead of using setTimeout()
     *  - Useful in pausing is ever implemented.
     */
    export class DialogHandler {

        public playScene: scenes.Scene;

        private queue: Dialog[];
        private dialogBox: ui.Label;

        constructor(playScene: scenes.Scene) {
            this.playScene = playScene;
            this.queue = new Array<Dialog>();
            this.dialogBox = new ui.Label("", "24px", "Arial", "#1d1d1d", 300, 500);
            this.dialogBox.visible = false;
        }

        public Trigger(text: string, delay: number, cb:Function=undefined) {

            this.queue.push({ text, delay, cb });

            if (!this.dialogBox.visible) {
                this.ShowNext();
            }
        }

        public TriggerMany(...dialog: DialogArg[]) {
            dialog.forEach(d => {
                if (Array.isArray(d)) {
                    this.Trigger(d[0], d[1], d[2]);
                }
            });
        }

        private ShowNext() {
            let current = this.queue.shift();

            this.dialogBox.visible = true;

            this.dialogBox.text = current.text;

            setTimeout(() => {
                if (this.queue.length > 0) {
                    requestAnimationFrame(this.ShowNext.bind(this));
                    // this.ShowNext();
                } else {
                    requestAnimationFrame(this.Clear.bind(this));
                    // this.Clear();
                }

                if (typeof current.cb === "function") {
                    current.cb();
                }
            }, current.delay * 1000);

        }

        private Clear() {
            this.dialogBox.text = "";
            this.dialogBox.visible = false;
        }

        public AppendDialogBox() {
            this.playScene.addChild(this.dialogBox);
        }
    }
}
