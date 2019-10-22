module handlers {
    export class BulletHandler {

        protected bullets: any;
        protected playScene: scenes.PlayScene;


        constructor(playScene: scenes.PlayScene) {
            this.playScene = playScene;
            this.bullets = {};
        }

        public Update() {
            for (let key in this.bullets) {
                let bullet: objects.Bullet = this.bullets[key];
                bullet.Update();
            }
        }

        public UpdateWithCallback(cb:(_bullet:objects.Bullet)=>void) {
            for (let key in this.bullets) {
                let bullet = <objects.Bullet>this.bullets[key];
                bullet.Update();
                cb(bullet);
            }
        }

        public CheckCollision(obj: objects.GameObject|objects.GameObject[]) {
            let check = this.GetCheckFunction(obj);

            for (let key in this.bullets) {
                let b: objects.Bullet = this.bullets[key];
                check(b);
            }
        }

        public UpdateAndCheckCollision(obj: objects.GameObject|objects.GameObject[]) {
            let check = this.GetCheckFunction(obj);

            this.UpdateWithCallback(check);
        }

        private GetCheckFunction(obj: objects.GameObject|objects.GameObject[]) {
            if (Array.isArray(obj)) {
                return (b: objects.Bullet) => {
                    obj.forEach(o => {
                        managers.Collision.Check(o, b);
                    });
                };
            } else {
                return (b: objects.Bullet) => {
                    managers.Collision.Check(obj, b);
                };
            }
        }
    }
}
