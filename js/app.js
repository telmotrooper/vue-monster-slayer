window.onload = function() {
	new Vue({
		el: "#app",
		data: {
			gameRunning: false,

			playerHealth: 100,
			monsterHealth: 100,
			
			playerStrength: 20,
			monsterStrength: 15
		},
		computed: {
			playerHealthBar: function() {
				return {
					width: this.playerHealth + "%"
				};
			},
			monsterHealthBar: function() {
				return {
					width: this.monsterHealth + "%"
				};
			}
		},
		methods: {
			newGame: function() {
				this.gameRunning = true;
				// this.playerHealth = 20;
			},
			attack: function() {
				let damage = getRandomInteger(1, this.playerStrength);

				if(this.monsterHealth - damage >= 0) {
					this.monsterHealth -= damage;
				} else {
					this.monsterHealth = 0;
				}

				console.log(`Player deals ${damage} damage to the monster.`);
				console.log(`Monster has ${this.monsterHealth} health points left.`);

				damage = getRandomInteger(1, this.monsterStrength);

				if(this.playerHealth - damage >= 0) {
					this.playerHealth -= damage;
				} else {
					this.playerHealth = 0;
				}

				console.log(`Monster deals ${damage} damage to the player.`);
				console.log(`Player has ${this.playerHealth} health points left.`);
			}
		}
	});
};

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
