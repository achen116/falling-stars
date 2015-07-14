// THE MENU STATE
// It is handled by menu.js, and only displays the start image. 
// When it is clicked, the game transitions to the Game state.

var Menu = {

	preload: function() {
		game.load.image('menu', './imgs/menu.png');
	},

	create: function() {
		this.add.button(0, 0, 'menu', this.startGame, this);
	},

	startGame: function() {
		this.state.start('Game');
	}

}