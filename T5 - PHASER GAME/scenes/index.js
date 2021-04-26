import gameStart from './start_game.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [gameStart],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
};

var game = new Phaser.Game(config);