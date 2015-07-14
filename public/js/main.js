// THE MAIN JAVASCRIPT FILE
// This is the place where we will create a new game instance and add a menu state.

var game = new Phaser.Game(1000, 800, Phaser.AUTO, '');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);

game.state.start('Menu');