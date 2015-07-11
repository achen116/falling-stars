// THE GAME STATE
// It is handled by game.js. 
// This is the actual play area of the game. 
// [Example Game: You control the snake, eat apples and have lots of fun. 
// When you die, you transition to the Game_Over state.]

var sky;
var ground;
var kirby;

var Game = {
	preload: function() {
		game.load.image('sky', './imgs/sky.png');
		game.load.image('ground', './imgs/ground.png');
		game.load.spritesheet('kirby', './imgs/kirby.png', 28.75, 25);
	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// the sky =====================================
		game.add.sprite(0, 0, 'sky');

		// the ground ==================================
		ground = game.add.sprite(0, 700, 'ground');
		game.physics.arcade.enable(ground);
		// ground.enableBody = true;
		ground.body.immovable = true;

		// the kirby ===================================
		kirby = game.add.sprite(game.world.centerX, game.world.height - 250, 'kirby');
		kirby.frame = 11

		game.physics.arcade.enable(kirby);
		kirby.body.bounce.y = 0.5;
		kirby.body.gravity.y = 350;
		kirby.body.collideWorldBounds = true;

	},

	update: function() {
		game.physics.arcade.collide(kirby, ground);

	}
}