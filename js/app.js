window.onload = function() {
	new Vue({
		el: "#app",
		data: {
			gameRunning: false,
			log: [],

			player: {
				name: "Hero",
				health: 100,
				strength: 20
			},

			monster: {
				name: "Goblin",
				health: 100,
				strength: 15
			},
		},
		computed: {
			playerHealthBar: function() {
				return {width: this.player.health + "%"};
			},
			monsterHealthBar: function() {
				return {width: this.monster.health + "%"};
			}
		},
		methods: {
			newGame: function() {
				this.gameRunning = true;
			},
			attack: function() {
				this.attackAction(this.player, this.monster);
				this.attackAction(this.monster, this.player);
			},
			attackAction: function(actor, target) {

				let damage = getRandomInteger(1, actor.strength);

				if(target.health - damage >= 0) {
					target.health -= damage;
				} else {
					target.health = 0;
				}

				this.log.unshift(`<p>${actor.name} hits ${target.name} for ${damage}</p>`);
			},
		}
	});
};

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
