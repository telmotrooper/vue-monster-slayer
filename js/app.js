window.onload = function() {
	new Vue({
		el: "#app",
		data: {
			gameRunning: false
		},
		methods: {
			newGame: function() {
				console.log("Starting a new game...");
				this.gameRunning = true;
			}
		}
	});
};
