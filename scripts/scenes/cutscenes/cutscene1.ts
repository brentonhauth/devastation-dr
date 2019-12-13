module scenes {
    export class Cutscene1 extends Scene {

        private playerAnimator: components.PlayerAnimator;
        private dialogHandler: handlers.DialogHandler;
        private bg: createjs.Bitmap;
        private hummer: createjs.Bitmap;
        private driveTo: math.Vec2;
        private driverSideExit: math.Vec2;
        private walkTo: math.Vec2;
        private walkToDir: math.Vec2;

        private drivingToSpot = true;
        private walkToEdge = false;
        private walkBackToCar = false;
        private driveOff = false;

        constructor() {
            super();
            this.dialogHandler = new handlers.DialogHandler(this);
            this.playerAnimator = new components.PlayerAnimator();
            this.playerAnimator.visible = false;
            this.bg = new createjs.Bitmap(objects.Game.getAsset('arcticMerge'));
            this.hummer = new createjs.Bitmap(objects.Game.getAsset('hummer'));

            this.driveTo = new math.Vec2(360, 409);
            this.driverSideExit = new math.Vec2(
                this.playerAnimator.x = this.driveTo.x - 21,
                this.playerAnimator.y = this.driveTo.y + 37
            );
            managers.Sound.music(false);

            //
            this.hummer.x = this.driveTo.x;
            this.hummer.y = this.driveTo.y + 500;
            this.walkTo = new math.Vec2(334, 216);

            this.playerAnimator.gotoAndPlay('idle_up');


            let bounds = this.bg.getBounds(),
            scale = objects.Game.canvas.width / (bounds.width || 1);
            scale = Number(scale.toFixed(3));

            this.bg.scaleX = this.bg.scaleY = scale;
            this.bg.y = -80;

            this.playerAnimator.scaleX = this.playerAnimator.scaleY = .8;
        }

        public Start() {
            this.addChild(this.bg);
            this.addChild(this.playerAnimator);
            this.addChild(this.hummer);
            this.dialogHandler.AppendDialogBox();
        }

        public Update() {
            let x = objects.Game.stage.mouseX, y = objects.Game.stage.mouseY;
            // this.hummer.x = x; this.hummer.y = y;
            if (managers.Keyboard.down(config.Key.Q)) {
                console.log(`(${x}, ${y})`);
            }
            if (this.drivingToSpot) {
                let hummerPos = new math.Vec2(this.hummer.x, this.hummer.y);
                if (math.Vec2.WithinRange(hummerPos, this.driveTo, 5)) {
                    this.drivingToSpot = false;
                    this.dialogHandler.TriggerMany(
                        ['', .75],
                        ["I must be crazy...", 1.5],
                        ["", 1, () => {
                            this.playerAnimator.visible = true;
                        }], ['', 1],
                        ["Otherwise how could I explain...", 1.5],
                        ["well, whatever \"this\" is", 1],
                        ['', 1.5, () => {
                            this.walkToEdge = true;
                            this.playerAnimator.gotoAndPlay('walk_up');
                        }]
                    );
                } else {
                    this.hummer.y -= 5;
                }
            } else if (this.walkToEdge) {
                let playerPos = new math.Vec2(
                    this.playerAnimator.x,
                    this.playerAnimator.y
                );

                if (math.Vec2.WithinRange(playerPos, this.walkTo, 5)) {
                    this.walkToEdge = false;
                    this.walkToDir = null;
                    this.playerAnimator.gotoAndPlay('idle_up');
                    this.dialogHandler.TriggerMany(
                        ['', .5],
                        // ["", .5, () => {
                        //     managers.Sound.sfx('monsterGrowl')
                        // }],
                        ["I'm not sure if there's anything left...", 1.5],
                        ['', 2],
                        ["But there's only one way to find out!", 1.5, () => {
                            managers.Sound.music("cyberpunker");
                            this.walkBackToCar = true;
                            this.playerAnimator.gotoAndPlay('walk_down');
                        }]
                    );

                } else {
                    if (!this.walkToDir) {
                        this.walkToDir = math.Vec2.Direction(this.walkTo, playerPos).ScaleEq(3);
                    }
                    this.playerAnimator.x += this.walkToDir.x;
                    this.playerAnimator.y += this.walkToDir.y;
                }


            } else if (this.walkBackToCar) {
                let playerPos = new math.Vec2(
                    this.playerAnimator.x,
                    this.playerAnimator.y
                );

                if (math.Vec2.WithinRange(playerPos, this.driverSideExit, 5)) {
                    this.walkBackToCar = false;
                    this.playerAnimator.visible = false;
                    setTimeout(() => {
                        this.driveOff = true;
                    }, 500);
                } else {
                    if (!this.walkToDir) {
                        this.walkToDir = math.Vec2.Direction(this.driverSideExit, playerPos).ScaleEq(4);
                    }

                    this.playerAnimator.x += this.walkToDir.x;
                    this.playerAnimator.y += this.walkToDir.y;
                }
            } else if (this.driveOff) {
                this.hummer.y -= 7;
                if (this.hummer.y <= -25) {
                    objects.Game.currentState = config.Scene.RETROWAVE;
                }
            }
        }
    }
}
