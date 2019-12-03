module scenes {
    export class Cutscene1 extends Scene {

        private playerAnimator: components.PlayerAnimator;

        constructor() {
            super();

            this.playerAnimator = new components.PlayerAnimator();
        }
    }
}
