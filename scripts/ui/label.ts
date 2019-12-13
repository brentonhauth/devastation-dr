module ui {    // Module == Namespace
    export class Label extends createjs.Text {    // export == public
        // Variables
        // Constructor

        public get position(): math.Vec2 {
            return new math.Vec2(this.x, this.y);
        }

        public set position(pos: math.Vec2) {
            this.SetPosition(pos.x, pos.y);
        }

        public SetPosition(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        public Center() {
            this.regX = this.getMeasuredWidth() * 0.5;
            this.regY = this.getMeasuredHeight() * 0.5;
            this.SetPosition(this.x, this.y);
        }

        constructor(labelString:string, fontSize:string, fontFamily:string, 
            fontColor:string, x:number = 0, y:number = 0, isCentered:boolean = false)  {
            super(labelString, fontSize + " " + fontFamily, fontColor);

            // Set the registration point if true to be in the middle
            if(isCentered) {
                this.Center();
            }

            // Set initial position
            this.SetPosition(x, y);
        }
        // Methods
    }
}