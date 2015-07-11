// THE GAME STATE
// It is handled by game.js. 
// This is the actual play area of the game. 
// [Example Game: You control the snake, eat apples and have lots of fun. 
// When you die, you transition to the Game_Over state.]

var sky;
var ground;
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
		game.load.image('star', './imgs/star.png');
		game.load.image('fireball', './imgs/fireball.png');
		game.load.spritesheet('kirby', './imgs/kirby.png', 28.75, 26);
		game.load.spritesheet('hurt-kirby', './imgs/hurt-kirby.png', 29.85, 26);
	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// the sky ========================================
		game.add.sprite(0, 0, 'sky');

		// the ground =====================================
		ground = game.add.sprite(0, 700, 'ground');
		game.physics.arcade.enable(ground);
		ground.body.immovable = true;

		// the kirby ======================================
		kirby = game.add.sprite(game.world.centerX, game.world.height - 250, 'kirby');
		kirby.frame = 11

		game.physics.arcade.enable(kirby);
		kirby.body.bounce.y = 0.5;
		kirby.body.gravity.y = 350;
		kirby.body.collideWorldBounds = true;

		kirby.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
		kirby.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, true);

		// the key controls ==============================
		cursors = game.input.keyboard.createCursorKeys();

		// the star ======================================
		stars = game.add.group();
		stars.enableBody = true;

		for (var i = 0; i < 20; i++) {
			var star = stars.create(i * 50, 0, 'star');
			star.body.bounce.y = 0.5 + Math.random() * 0.2;
			star.body.gravity.y = 50 + Math.random() * 100;
		}

		// the fireball ==================================
		fireballs = game.add.group();
		fireballs.enableBody = true;

		for (var i = 0; i < 5; i++) {
			var fireball = fireballs.create(i * 100, 0, 'fireball');
			fireball.body.bounce.y = 0.1 + Math.random() * 0.2;
			fireball.body.gravity.y = 25 + Math.random() * 100;
		}

		// the score =====================================
		scoreText = game.add.text(20, 20, 'Score: 0', { fontSize: '20px', fill: '#fff' })

	},

	update: function() {
		game.physics.arcade.collide(kirby, ground);
		game.physics.arcade.collide(stars, ground);
		game.physics.arcade.collide(fireballs, ground);

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

		// game over ====================================
		// this.gameOver;

	},

	// gameOver: function() {
	// 	if (starCount === 0) {
	// 		game.state.start('GameOver');
	// 	}
	// }
}

var collectStar = function(player, star) {
	star.kill()

	score += 5;
	scoreText.text = 'Score: ' + score;
}

var fireballCollision = function(player, fireball) {
	kirby.kill()
	hurtKirby = game.add.sprite(kirby.position.x, kirby.position.y, 'hurt-kirby');
	
	hurtKirby.animations.add('hurt', [0, 1, 2, 3, 4, 5, 6], 5, false);
	hurtKirby.animations.play('hurt');

	// this.state.start('GameOver');
}