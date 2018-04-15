window.onload = function() {
	new Vue({
		el: "#app",
		data: {
			gameRunning: false,

			health: {
				player: 100,
				monster: 100,
			},

			playerStrength: 20,
			monsterStrength: 15
		},
		computed: {
			playerHealthBar: function() {
				return {
					width: this.health.player + "%"
				};
			},
			monsterHealthBar: function() {
				return {
					width: this.health.monster + "%"
				};
			}
		},
		methods: {
			newGame: function() {
				this.gameRunning = true;
			},
			attack: function() {
				this.attackAction("monster", this.playerStrength);
				this.attackAction("player", this.monsterStrength);
			},
			attackAction: function(target, strength) {
				let damage = getRandomInteger(1, strength);

				if(this.health[target] - damage >= 0) {
					this.health[target] -= damage;
				} else {
					this.health[target] = 0;
				}
			}
		}
	});
};

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
