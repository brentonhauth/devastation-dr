module components {
    export class BoxCollider {
        public aabb: math.AABB;
        private center: math.Vec2;
        private shape: any;
        
        public ignore: any[] = [];

        public drawMode = true;


        public set position(pos: math.Vec2) {
            // let m = math.Vec2.Difference(pos, this.center);
            // let dx = pos.x - this.center.x,
            //     dy = pos.y - this.center.y;

            this.SetPosition(pos.x, pos.y);
        }

        public SetPosition(x: number, y: number) {
            let m = {
                x: x - this.center.x,
                y: y - this.center.y
            };

            this.aabb.min.Add(<math.Vec2>m);
            this.aabb.max.Add(<math.Vec2>m);

            this.center.setValues(x, y);

            if (this.drawMode) {
                this.draw()
            }
        }

        public get width(): number {
            if (this.aabb) {
                return this.aabb.max.x - this.aabb.min.x;
            } else {
                return 0;
            }
        }

        public set width(w: number) {
            if (w < 0) { w = 0; }
            let hw = w / 2;
            this.aabb.min.x = this.center.x - hw;
            this.aabb.max.x = this.center.x + hw;
        }

        public get height(): number {
            if (this.aabb) {
                return this.aabb.max.y - this.aabb.min.y;
            } else {
                return 0;
            }
        }

        public set height(h: number) {
            if (h < 0) { h = 0; }
            let hh = h / 2;
            this.aabb.min.x = this.center.y - hh;
            this.aabb.max.x = this.center.y + hh;
        }

        constructor(x: number, y: number, width: number, height: number) {
            let hw = width / 2;
            let hh = height / 2;

            this.center = new math.Vec2(x, y);

            let min = new math.Vec2(x - hw, y - hh);
            let max = new math.Vec2(x + hw, y + hh);

            this.aabb = new math.AABB(min, max);
        }

        public draw() {

            if (this.shape) {
                objects.Game.stage.removeChild(this.shape);
            }

            let g = new createjs.Graphics();

            g.beginStroke("green");

            // let rect: any = {
            //     x: this.aabb.min
            // };


            g.drawRect(this.aabb.min.x, this.aabb.min.y, this.width, this.height);

            g.endStroke();

            this.shape = new createjs.Shape(g);

            objects.Game.stage.addChild(this.shape);
        }
    }
}
