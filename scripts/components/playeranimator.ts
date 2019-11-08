module components {
    export class PlayerAnimator extends createjs.Sprite {
        constructor() {
            super(new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("playerSheet")],
                frames: { width: 28, height: 36, count: 16 },
                animations: {
                    idle_down: 1,
                    walk_down: {
                        frames: [0, 1, 2, 3],
                        speed: .1
                    },
                    idle_right: 5,
                    walk_right: {
                        frames: [4, 5, 6, 7],
                        speed: .1
                    },
                    idle_left: 8,
                    walk_left: {
                        frames: [8, 9, 10, 11],
                        speed: .1
                    },
                    idle_up: 13,
                    walk_up: {
                        frames: [12, 13, 14, 15],
                        speed: .1
                    }
                }
            }));
        }
    }
}
