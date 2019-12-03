module scenes {
    export class Prologue extends Scene {

        private playerAnimator: components.PlayerAnimator;
        private storeBg: createjs.Bitmap;
        private dialogHandler: handlers.DialogHandler;

        private initialTrigger = false;
        private initialTriggerCount = 0;
        private secondaryTrigger = false;
        private playSoundTrigger = false;
        private doorPoint: math.Vec2;
        private counterPoint: math.Vec2;
        private storePos: math.Vec2;

        private storeScale = 2;

        private get playerPos(): math.Vec2 {
            return new math.Vec2(this.playerAnimator.x, this.playerAnimator.y);
        }

        private dir: math.Vec2;

        constructor() {
            super();

            this.storePos = new math.Vec2(100, 100);

            this.counterPoint = new math.Vec2(56, 65).ScaleEq(this.storeScale).Add(this.storePos);
            this.doorPoint = new math.Vec2(74, 119).ScaleEq(this.storeScale).Add(this.storePos);
            // console.log('Counter Point', this.counterPoint, '\nDoor', this.doorPoint)
            this.dir = math.Vec2.Direction(this.doorPoint, this.counterPoint).ScaleEq(5);


            this.dialogHandler = new handlers.DialogHandler(this);

            this.playerAnimator = new components.PlayerAnimator();
            this.storeBg = new createjs.Bitmap(objects.Game.getAsset("store"));

            this.storeBg.scaleX = this.storeBg.scaleY = this.storeScale;
            this.resetStorePos();
        }

        public Start() {
            this.addChild(this.storeBg);
            this.addChild(this.playerAnimator);
            this.dialogHandler.AppendDialogBox();
            this.playerAnimator.gotoAndPlay("idle_left");

            this.playerAnimator.x = this.counterPoint.x;
            this.playerAnimator.y = this.counterPoint.y;

            this.dialogHandler.TriggerMany(
                ["", 1], ["Wow, what a wonderful day it is!", 2.5],
                ["I'm really glad I walked", 2.5],
                ["Well, better start making my way back", 2.5],
                ["", 1.5, () => {
                    this.initialTrigger = true;
                }]
            );
        }

        public Update() {
            if (this.initialTrigger) {
                this.initialTriggerCount += 1;
                if (!(this.initialTriggerCount % 3)) {
                    this.storeBg.x += math.randRange(-1, 1);
                    this.storeBg.y += math.randRange(-1, 1);
                }

                if (!this.playSoundTrigger && this.initialTriggerCount > 45) {
                    managers.Sound.sfx('monsterGrowl');
                    this.playSoundTrigger = true;
                }

                if (this.initialTriggerCount < 150) {
                    this.playerAnimator.alpha =
                    this.storeBg.alpha = (150 - this.initialTriggerCount) / 150;
                } else if (this.initialTriggerCount < 300) {
                    this.playerAnimator.alpha =
                    this.storeBg.alpha = (this.initialTriggerCount - 150) / 150;
                } else {
                    this.resetStorePos();
                    this.playerAnimator.gotoAndPlay('oscillate');
                    this.playerAnimator.alpha = this.storeBg.alpha = 1;
                    this.initialTrigger = false;
                    this.dialogHandler.TriggerMany(
                        ["", 2, () => {
                            this.playerAnimator.gotoAndPlay('idle_right');
                        }], ["What was that?!", 2], ["", 1.5],
                        ["No time to waste!\nI gotta get home!", 2,
                        () => {
                            this.secondaryTrigger = true;
                            this.playerAnimator.gotoAndPlay("walk_down");
                        }]
                    );
                }

                // this.initialTrigger = false;
            } else if (this.secondaryTrigger) {
                this.playerAnimator.x += this.dir.x;
                this.playerAnimator.y += this.dir.y;
                // console.log(this.playerAnimator.x, this.playerAnimator.y, '<---->', this.dir);
                if (math.Vec2.WithinRange(this.playerPos, this.doorPoint, 5)) {
                    this.secondaryTrigger = false;
                    this.playerAnimator.visible = false;

                    this.dialogHandler.Trigger("Hey look a car!", 2, () => {
                        objects.Game.currentState = config.Scene.JUNGLE;
                    });
                }
            }
        }


        private resetStorePos() {
            this.storeBg.x = this.storePos.x;
            this.storeBg.y = this.storePos.y;
            this.playerAnimator.x = this.counterPoint.x;
            this.playerAnimator.y = this.counterPoint.y;
        }
    }
}
