module handlers {

    type DialogArg = [string, number, (()=>void)?];
    type Dialog = { text: string, delay: number, cb?: ()=>void };

    /**
     * TODO:
     * - create 'Time' manager for delayed callbacks instead of using setTimeout()
     *  - Useful in pausing is ever implemented.
     */
    export class DialogHandler {

        public playScene: scenes.Scene;

        private queue: Dialog[];
        private dialogBox: ui.Label;
        // private outline: createjs.Shape;

        constructor(playScene: scenes.Scene) {
            this.playScene = playScene;
            this.queue = new Array<Dialog>();
            this.dialogBox = new ui.Label(
                "", "24px", "Arial", "#1d1d1d",
                objects.Game.canvas.width * .5,
                objects.Game.canvas.height * .9, true
            );
            this.dialogBox.visible = false;
        }

        public Trigger(text: string, delay: number, cb?:()=>void) {

            this.queue.push({ text, delay, cb });

            if (!this.dialogBox.visible) {
                this.ShowNext();
            }
        }

        public TriggerMany(...dialog: DialogArg[]) {
            dialog.forEach(d => {
                this.Trigger(d[0], d[1], d[2]);
            });
        }

        private ShowNext() {
            let current = this.queue.shift();

            this.dialogBox.visible = true;

            this.dialogBox.text = current.text;

            this.dialogBox.Center();

            setTimeout(() => {
                if (this.queue.length > 0) {
                    requestAnimationFrame(this.ShowNext.bind(this));
                } else {
                    requestAnimationFrame(this.Clear.bind(this));
                }

                if (current.cb) {
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
