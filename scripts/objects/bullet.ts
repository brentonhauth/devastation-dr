module objects {
    export class Bullet extends objects.GameObject {


        public isDestroyed: boolean = false;

        constructor(x: number, y: number) {
            super("bullet");
            this.x = x;
            this.y = y;
            this.Start();
        }

        public Start(): void {
            setTimeout(() => {
                this.Destroy();
            }, 10 * 1000);
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public Move(): void {
            this.y -= 7;
            //console.log('(' +this.x+', ' +this.y+')');
        }

        public CheckBounds(): void {
        }

        public Destroy(): void {
            this.isDestroyed = true;
        }

        public OnCollision(obj: objects.GameObject): void {
            if (obj instanceof objects.Enemy ||
                obj instanceof objects.Spider) {
                obj.Reset();
                this.Destroy();
                objects.Game.currentSceneRef.removeChild(this);
                if (objects.Game.currentSceneRef instanceof scenes.PlayScene) {
                    let points = 100;
                    if (obj instanceof objects.Lizard) {
                        points = 300;
                    }

                    objects.Game.currentSceneRef.score.addPoints(points);
                }
            } else if (obj instanceof objects.EnemyBullet) {
                obj.Destroy();
                this.Destroy();
                if (objects.Game.currentSceneRef instanceof scenes.PlayScene) {
                    objects.Game.currentSceneRef.score.addPoints(10);

                }
            }
        }


    }
}
