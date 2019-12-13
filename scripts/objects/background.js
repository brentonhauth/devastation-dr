var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // Constructor
        function Background(speed) {
            if (speed === void 0) { speed = 1.5; }
            var _this = _super.call(this) || this;
            _this.overlap = 0;
            _this.hasStarted = false;
            _this.images = new Array();
            _this.speedY = speed;
            _this.canvasH = objects.Game.canvas.height;
            _this.canvasW = objects.Game.canvas.width;
            var imgString = Background.getImageFromState(objects.Game.currentState);
            var img = objects.Game.getAsset(imgString);
            _this.images.push(new createjs.Bitmap(img), new createjs.Bitmap(img));
            if (imgString === 'retrowave') {
                _this.images.forEach(function (i) { return i.alpha = .7; });
            }
            return _this;
        }
        Object.defineProperty(Background.prototype, "Speed", {
            get: function () {
                return this.speedY;
            },
            set: function (value) {
                this.speedY = (isNaN(value) || value < 0) ? 1.5 : value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Background.prototype, "Overlap", {
            set: function (value) {
                this.overlap = value;
                if (this.hasStarted) {
                    this.Reset();
                }
            },
            enumerable: true,
            configurable: true
        });
        // Functions 
        // Initializing our variables with default values
        Background.prototype.Start = function () {
            var _this = this;
            this.hasStarted = true;
            var bounds = this.images[0].getBounds();
            var scale = this.canvasW / (bounds.width || 1);
            scale = Number(scale.toFixed(3));
            this.images.forEach(function (img) {
                img.x = 0;
                img.scaleX = img.scaleY = scale;
                _this.addChild(img);
            });
            this.imageHeight = bounds.height * scale;
            this.Reset();
        };
        // Updated 60 times per second (60FPS)
        Background.prototype.Update = function () {
            var _this = this;
            this.images.forEach(function (img, i) {
                img.y += _this.speedY;
                if (img.y >= _this.canvasH) {
                    var img2 = _this.images[!!i ? 0 : 1];
                    // this.removeChild(img, img2);
                    // this.addChildAt(img, 0);
                    // this.addChildAt(img2, 1);
                    // this.addChildAt(img, img2, 1);
                    img.y = img2.y;
                    img2.y = img.y - _this.imageHeight + _this.overlap;
                }
            });
            // this.Move();
            // this.CheckBound();
        };
        // Resets the position of the object
        Background.prototype.Reset = function () {
            this.images[1].y = -this.imageHeight + this.canvasH;
            this.images[0].y = (this.images[1].y - this.imageHeight) + this.overlap;
        };
        // Collision Detection 
        Background.prototype.CheckBound = function () {
            if (this.y >= 0) {
                this.Reset();
            }
        };
        // // Temporary Method
        // private static getOverlapFromState(state: config.Scene) {
        //     switch (state) {
        //         case config.Scene.JUNGLE:
        //             return 10;
        //         case config.Scene.DESERT:
        //             return 20;
        //         case config.Scene.ARCTIC:
        //             return 104;
        //     }
        // }
        Background.getImageFromState = function (state) {
            switch (state) {
                case config.Scene.JUNGLE:
                    return 'jungle';
                case config.Scene.DESERT:
                    return 'desert';
                case config.Scene.ARCTIC:
                    return 'arctic';
                case config.Scene.RETROWAVE:
                    return 'retrowave';
            }
        };
        return Background;
    }(createjs.Container));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map