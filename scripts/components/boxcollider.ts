module components {
    export class BoxCollider {
        public aabb: math.AABB;
        private center: math.Vec2;
        private shape: any;

        public drawMode = false;


        public set position(v2: math.Vec2) {


            let m = math.Vec2.Difference(this.center, v2);

            // let mx = v2.x - this.center.x;
            // let my = v2.y - this.center.y;

            this.aabb.min.x += m.x;
            this.aabb.min.y += m.y;

            this.aabb.max.x += m.x;
            this.aabb.max.y += m.y;

            this.center.x = v2.x;
            this.center.y = v2.y;

            if (this.drawMode) {
                this.draw()

            // REMOVE
            } else {
                objects.Game.stage.removeChild(this.shape);
            }
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

            g.beginStroke("firebrick");

            // let rect: any = {
            //     x: this.aabb.min
            // };

            let w = this.aabb.max.x - this.aabb.min.x;
            let h = this.aabb.max.y - this.aabb.min.y;

            g.drawRect(this.aabb.min.x, this.aabb.min.y, w, h);

            g.endStroke();

            this.shape = new createjs.Shape(g);

            objects.Game.stage.addChild(this.shape);
        }
    }
}