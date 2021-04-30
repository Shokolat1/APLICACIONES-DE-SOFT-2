import cutScene1 from '../scenes/cutscene1.js';

class gameStart extends Phaser.Scene{
    constructor (){
        super({
            key: "gameStart",
            active: true
        });
        this.i = 0;
    }

    preload (){
        this.load.image('logo', './game/assets/logo.png');
        this.load.audio('ping','./game/audio/Ping.mp3');
    }

    create (){
        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.graphics = this.add.graphics();

        this.shapes = new Array(15).fill(null).map(
            () => new Phaser.Geom.Circle(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), Phaser.Math.Between(25, 75))
        );

        this.rect = Phaser.Geom.Rectangle.Clone(this.cameras.main);
        const logo = this.add.image(400, 250, 'logo').setVisible(false);

        this.text1 = this.add.text(278, 350, 'Click to Start', { font: "30px Arial Black", fill: "#000" });
        this.text1.setStroke('#fff', 14);
        this.text1.setShadow(2, 2, "#333333", 2, true, true);

        //  Let's show the logo when the camera flashes
        this.cameras.main.on('cameraflashstart', function (cam, fx, duration) {
            logo.setVisible(true);
            logo.setScale(1.3);
        });

        //  Every time you click, shake the camera
        this.input.on('pointerdown', function () {
            this.cameras.main.flash();
            var start = this.sound.add('ping');
            start.play();
            this.cameras.main.fadeOut(1500, 0, 0, 0);
        }, this);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.add('cutScene1', new cutScene1, true, {x:0,y:0});
            this.scene.moveUp('cutScene1');
        })
    }

    update (time, delta)
    {
        this.shapes.forEach(function (shape, i) {
            shape.x += (1 + 0.1 * i);
            shape.y += (1 + 0.1 * i);
        });

        Phaser.Actions.WrapInRectangle(this.shapes, this.rect, 72);

        this.draw();

        const top = this.hsv[this.i].color;
        const bottom = this.hsv[359 - this.i].color;

        this.text1.setTint(top, bottom, top, bottom);

        this.i++;

        if (this.i === 360)
        {
            this.i = 0;
        }
    }

    // Locals methods, they are not part of Phaser.scene
    color (i)
    {
        return 0x001100 * (i % 15) + 0x000033 * (i % 5);
    }

    draw ()
    {
        this.graphics.clear();

        this.shapes.forEach((shape, i) => {
            this.graphics
            .fillStyle(this.color(i), 0.5)
            .fillCircleShape(shape);
        }, this);
    }
}

export default gameStart;