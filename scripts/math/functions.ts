module math {

    const PI_OVER_180 = Math.PI / 180;

    export function cosWaveFunction(stretch: number, depth: number): Function {
        let o: any = { stretch, depth };
        o.fn = (val: number): number => {

            if (o.stretch == 0) {
                return o.depth;
            }

            return Math.cos(val / o.stretch) * o.depth;
        };

        return o.fn;
    }


    export function randRange(min: number, max: number=null): number {
        if (max === null) {
            [min, max] = [0, min];
        }
        let r = Math.random() * (max - min);
        
        return min + r;
    }

    export function pointOnCircle(center: math.Vec2, degree: number) {
        let radian = degree * PI_OVER_180;

        let x = center.x + Math.cos(radian);
        let y = center.y + Math.sin(radian);

        return new math.Vec2(x, y);
    }
}
