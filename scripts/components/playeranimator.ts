module components {
    export class PlayerAnimator extends createjs.Sprite {
        constructor() {
            super(new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("playerSheet")],
                frames: { width: 28, height: 36, count: 16 },
                animations: {
                    idle_0: 1,
                    walk_0: {
                        frames: [0, 1, 2, 3],
                        speed: .1
                    },
                    idle_1: 5,
                    walk_1: {
                        frames: [4, 5, 6, 7],
                        speed: .1
                    },
                    idle_2: 8,
                    walk_2: {
                        frames: [8, 9, 10, 11],
                        speed: .1
                    },
                    idle_3: 13,
                    walk_3: {
                        frames: [12, 13, 14, 15],
                        speed: .1
                    }
                }
            }));
        }
    }
}
