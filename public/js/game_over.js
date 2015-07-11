// THE GAME_OVER STATE
// It shows gameover.png and displays your last score. 
// When it is clicked you transition to the Game state.

var GameOver = {
	preload: function() {
		game.load.image('gameover', './imgs/menu.png');
	},

	create: function() {
		this.add.sprite(0, 0, 'gameover');
	},

	startGame: function() {

	}
}