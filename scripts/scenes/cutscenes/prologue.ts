module scenes {
    export class Prologue extends Scene {

        private playerAnimator: components.PlayerAnimator;
        private storeBg: createjs.Bitmap;
        private dialogHandler: handlers.DialogHandler;

        private initialTrigger = false;
        private initialTriggerCount = 0;
        private secondaryTrigger = false;
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

            this.counterPoint = new math.Vec2(56, 65).Scale(this.storeScale).Add(this.storePos);
            this.doorPoint = new math.Vec2(74, 119).Scale(this.storeScale).Add(this.storePos);
            this.dir = math.Vec2.Difference(this.doorPoint, this.counterPoint).Normalized;

            this.dir = this.dir.Scale(5);


            this.dialogHandler = new handlers.DialogHandler(this);
            
            this.playerAnimator = new components.PlayerAnimator();
            this.storeBg = new createjs.Bitmap(objects.Game.assetManager.getResult("store"));

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
                ["", .5],
                ["Wow, what a wonderful day it is!", 2.5],
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
                let y = math.randRange(-1, 1);
                let x = math.randRange(-1, 1);
                this.storeBg.x += x; this.storeBg.y += y;
                if (this.initialTriggerCount < 100) {
                    this.playerAnimator.alpha =
                    this.storeBg.alpha = (100 - this.initialTriggerCount)/100;
                } else if (this.initialTriggerCount < 200) {
                    this.playerAnimator.alpha =
                    this.storeBg.alpha = (this.initialTriggerCount - 100)/100;
                } else {
                    this.storeBg.x = 100;
                    this.storeBg.y = 100;
                    this.playerAnimator.x = this.counterPoint.x;
                    this.playerAnimator.y = this.counterPoint.y;
                    this.playerAnimator.alpha =
                    this.storeBg.alpha = 1;
                    this.initialTrigger = false;
                    this.dialogHandler.TriggerMany(
                        ["What was that?!", 2], ["", 1.5],
                        ["No time to waste!\nI gotte get home!", 2,
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
                if (math.Vec2.Distance(this.playerPos, this.doorPoint) < 5) {
                    this.secondaryTrigger = false;
                    this.playerAnimator.visible = false;

                    this.dialogHandler.TriggerMany(
                        ["Hey look a car!", 2, () => {
                            objects.Game.currentState = config.Scene.JUNGLE;
                        }]
                    );
                }
            }
        }


        private resetStorePos() {
            this.storeBg.x = this.storePos.x;
            this.storeBg.y = this.storePos.y;
        }
    }
}
