window.onload = function() {
	new Vue({
		el: "#app",
		data: {
			gameRunning: false,
			log: [],

			player: {
				name: "HERO",
				health: 100,
				strength: 20,
				intelligence: 25
			},

			monster: {
				name: "GOBLIN",
				health: 100,
				strength: 15,
				intelligence: 15
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
				
				/* Resetting game */
				this.log = [];
				this.player.health = 100;
				this.monster.health = 100;
			},
			monsterMove: function() {
				let randomChoice = 0;

				if(this.monster.health <= 50) {	// 66,66% chance of healing if life is under 50%
					randomChoice = getRandomInteger(0,2);
				} else if(this.monster.health <= 75) {	// 50% chance of healing if life is under 75%
					randomChoice = getRandomInteger(0,1);
				}

				console.log("Monster health: " + this.monster.health);
				console.log("Choice value: " + randomChoice);

				if(randomChoice) {
					this.healAction(this.monster);
				} else {
					this.attackAction(this.monster, this.player);
				}
			},
			attack: function() {
				this.attackAction(this.player, this.monster);
				this.monsterMove();
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
			heal: function() {
				this.healAction(this.player);
				this.monsterMove();
			},
			healAction: function(actor) {
				let extraHealth = getRandomInteger(1, actor.intelligence);
				
				if(actor.health + extraHealth <= 100) {
					actor.health += extraHealth;
				} else {
					actor.health = 100;
				}

				this.log.unshift(`<p>${actor.name} heals himself for ${extraHealth}</p>`);
			},
			giveUp: function() {
				this.gameRunning = false;
			}
		}
	});
};

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
