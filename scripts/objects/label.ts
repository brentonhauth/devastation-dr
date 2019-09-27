module objects { // namespace

    // export == public
    export class Label extends createjs.Text {
        // Variables
        // Constructor
        constructor(labelString: string, fontSize: string, fontFamily: string,
            fontColor: string, x: number=0, y: number=0, isCentered:boolean=false) {
            // super call
            super(labelString, fontSize + " " + fontFamily, fontColor);

            // set registration point if true to be middle
            if (isCentered) {
                this.regX = this.getMeasuredWidth() * .5;
                this.regY = this.getMeasuredHeight() * .5;
            }

            // set initial position
            this.x = x;
            this.y = y;
        }
    }
}
