import Game from '../scenes/game.js';

class cutScene1 extends Phaser.Scene{
    constructor (){
        super({
            key: "cutScene1"
        });
    }

    preload (){
        this.load.image('star2', './game/assets/star2.png');
        this.load.image('dude_C', './game/assets/brou_idle.png');
    }

    create (){
        this.cameras.main.fadeIn(5000, 0, 0, 0);

        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
    
        var bg = this.add.group({ key: 'star2', frameQuantity: 400 });
    
        this.sky = new Phaser.Display.Color(120, 120, 255);
        this.space = new Phaser.Display.Color(0, 0, 0);
    
        this.player = this.add.sprite(this.w / 2, 0, 'dude_C');
    
        this.cameras.main.startFollow(this.player);
    
        var rect = new Phaser.Geom.Rectangle(0, -3 * this.h, this.w, 2 * this.h);
    
        Phaser.Actions.RandomRectangle(bg.getChildren(), rect);
        
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.add('Game', new Game, true,{x:0, y:0});
            this.scene.bringToTop('Game');
        })
    }

    update (time, delta){
        this.player.y = (Math.cos(this.time.now / 1000) * (this.h - 10)) - this.h;

        var hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(this.sky, this.space, -this.h * 2, this.player.y);
    
        this.cameras.main.setBackgroundColor(hexColor);
    }
}

export default cutScene1;