// THE GAME STATE
// It is handled by game.js. 
// This is the actual play area of the game. 
// [Example Game: You control the snake, eat apples and have lots of fun. 
// When you die, you transition to the Game_Over state.]

var sky;
var ground;
var platforms;
var kirby;

var cursors;

var stars;
var fireballs;
var score = 0;
var scoreText;

var Game = {
	preload: function() {
		game.load.image('sky', './imgs/sky.png');
		game.load.image('ground', './imgs/ground.png');
		game.load.image('ledge', './imgs/ledge.png');
		game.load.image('star', './imgs/star.png');
		game.load.image('fireball', './imgs/red-fireball.png');
		game.load.spritesheet('kirby', './imgs/kirby.png', 28.75, 26);
		game.load.spritesheet('hurt-kirby', './imgs/hurt-kirby.png', 29.85, 26);

		game.load.image('play-again', './imgs/play-again.png');
	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// the sky ========================================
		game.add.sprite(0, 0, 'sky');

		// the ground =====================================
		ground = game.add.sprite(0, 700, 'ground');
		game.physics.arcade.enable(ground);
		ground.body.immovable = true;

		// the platforms ==================================
		platforms = game.add.group();
		platforms.enableBody = true;

		var bottomLedge = platforms.create(600, 500, 'ledge');
		bottomLedge.body.immovable = true;

		var middleLedge = platforms.create(-100, 350, 'ledge');
		middleLedge.body.immovable = true;

		var topLedge = platforms.create(500, 150, 'ledge');
		topLedge.scale.setTo(0.5, 1)
		topLedge.body.immovable = true;


		// the kirby ======================================
		kirby = game.add.sprite(game.world.centerX, game.world.height - 250, 'kirby');
		kirby.scale.setTo(2, 2);
		kirby.frame = 11

		game.physics.arcade.enable(kirby);
		kirby.body.bounce.y = 0.2;
		kirby.body.gravity.y = 250;
		kirby.body.collideWorldBounds = true;

		kirby.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
		kirby.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, true);

		// the key controls ==============================
		cursors = game.input.keyboard.createCursorKeys();

		// the stars =====================================
		stars = game.add.emitter(450, 0, 250);
		stars.makeParticles('star', [0], 25, true, false)

		stars.gravity = 50;
		stars.bounce.setTo(0.5, 0.5);

		stars.start(false, 0, 1000)

		// the fireball ==================================
		// fireballs = game.add.group();
		// fireballs.enableBody = true;

		// for (var i = 0; i < 5; i++) {
		// 	var fireball = fireballs.create(i * 200, 0, 'fireball');
		// 	fireball.body.bounce.y = 0.1 + Math.random() * 0.2;
		// 	fireball.body.gravity.y = 5 + Math.random() * 10;
		// }

		// the score =====================================
		scoreText = game.add.text(20, 20, 'Score: 0', { fontSize: '20px', fill: '#fff' })

	},

	restartGame: function() {
		this.state.start('Game');
	},

	update: function() {
		game.physics.arcade.collide(kirby, ground);
		game.physics.arcade.collide(kirby, platforms);
		game.physics.arcade.collide(stars, platforms);

		game.physics.arcade.overlap(kirby, stars, collectStar, null, this);
		game.physics.arcade.overlap(kirby, fireballs, fireballCollision, null, this);


		// reset kirby's velocity ========================
		kirby.body.velocity.x = 0;

		if (cursors.left.isDown) {
			kirby.body.velocity.x = -150;
			kirby.animations.play('left');
		}
		else if (cursors.right.isDown) {
			kirby.body.velocity.x = 150;
			kirby.animations.play('right');
		}
		else if (cursors.up.isDown && kirby.body.touching.down) {
			kirby.body.velocity.y = -350;
		}
		else {
			kirby.animations.stop();
			kirby.frame = 11;
		}

	},

}

var collectStar = function(player, star) {
	star.kill()

	score += 5;
	scoreText.text = 'Score: ' + score;
}

var fireballCollision = function(player, fireball) {
	kirby.kill()
	hurtKirby = game.add.sprite(kirby.position.x, kirby.position.y, 'hurt-kirby');
	hurtKirby.scale.setTo(2, 2);
	
	hurtKirby.animations.add('hurt', [0, 1, 2, 3, 4, 5, 6], 10, false);
	hurtKirby.animations.play('hurt');

	game.add.text(350, game.world.height - 500, 'GAME OVER', { fontSize: '50px', fill: '#fff' })
	game.add.button(435, game.world.height - 450, 'play-again', this.restartGame, this);
}

var restartGame = function() {
	this.state.start('Game');
}