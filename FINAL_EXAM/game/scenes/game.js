class Game extends Phaser.Scene{
    constructor (){
        super({
            key: "Game"
        });
    }

    preload (){
        this.load.image('sky', './game/assets/bg.png');
        this.load.image('ground', './game/assets/platform.png');
        this.load.image('bone', './game/assets/bone.png');
        this.load.image('bomb', './game/assets/bomb.png');
        this.load.spritesheet('dude','./game/assets/brou.png', {frameWidth: 32, frameHeight: 48});
        this.load.audio('collect','./game/audio/Collect.mp3');
        this.load.audio('ping','./game/audio/Ping.mp3');
        this.load.audio('death','./game/audio/Death.mp3');
    }

    create (){
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 530, 'ground').setScale(2.15).refreshBody();

        platforms.create(600, 370, 'ground');
        platforms.create(50, 220, 'ground');
        platforms.create(740, 190, 'ground');

        player = this.physics.add.sprite(100, 300, 'dude');

        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(player, platforms);

        stars = this.physics.add.group({
            key: 'bone',
            repeat: 9,
            setXY: { x: 40, y: 0, stepX: 80}
        });

        stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);

        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px Courier', fill: '#fff' });

        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(player, bombs, hitBomb, null, this);
}

    update (time, delta){
        cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown){
            player.setVelocityX(-180);
            player.anims.play('left', true);
        }else if (cursors.right.isDown){
            player.setVelocityX(180);
            player.anims.play('right', true);
        }else{
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-400);
        }
    }
}

function collectStar (player, bone){
    var collect = this.sound.add('collect');
    collect.play();
    bone.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0){
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var nextLvl = this.sound.add('ping');
        nextLvl.play();

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    }
}

function hitBomb (player, bomb){
    var death = this.sound.add('death');
    death.play();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    
    totalScore = score;
    
    pName = prompt("What's your name, player?");
    
    alert("Which country are you from? Choose the number corresponding to the country of your choice! If your country is not on this list, please choose the closest one to your country.")
    countryNum = prompt("1 = USA; 2 = Brazil; 3 = Spain; 4 = Russia; 5 = Japan");
    
    if(countryNum == 1){
        countryName = "USA";
    }else if(countryNum == 2){
        countryName = "Brazil";
    }else if(countryNum == 3){
        countryName = "Spain";
    }else if(countryNum == 4){
        countryName = "Russia";
    }else{
        countryName = "Japan";
    };

    alert("Try to get a higher score, or add this game's score to the global leaderboard!")

    this.scene.restart('Game');
    score = 0;
}

var player;
var stars;
var bombs;
var cursors;
var platforms;
var score = 0;
var scoreText;
var totalScore = 0;
var pName = "";
var countryName = "";
var countryNum = 0;
var gameOver;

export default Game;
export {totalScore, pName, countryName};