window.onload = function() {
	new Vue({
		el: "#app",
		data: {
			gameRunning: false,
			gameOverMessage: "",
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
			endGame: function() {
				if(this.player.health <= 0) {
					this.gameOverMessage = `YOU'VE BEEN KILLED BY THE ${this.monster.name}...`;
					this.gameRunning = false;
					return true;
				} else if(this.monster.health <= 0) {
					this.gameOverMessage = `YOU'VE KILLED THE ${this.monster.name}!`;
					this.gameRunning = false;
					return true;
				} else {
					return false;
				}
			},
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

				if(randomChoice) {
					this.healAction(this.monster);
				} else {
					this.attackAction(this.monster, this.player);

					this.endGame();
				}
			},
			attack: function() {
				this.attackAction(this.player, this.monster);

				if(!this.endGame()) {
					this.monsterMove();
				}
			},
			attackAction: function(actor, target) {
				let damage = getRandomInteger(1, actor.strength);

				if(target.health - damage >= 0) {
					target.health -= damage;
				} else {
					target.health = 0;
				}

				let cssClass = "";

				if(actor == this.player) {
					cssClass = "player-turn";
				} else {
					cssClass = "monster-turn";
				}

				this.log.unshift(`<p class="${cssClass}">${actor.name} hits ${target.name} for ${damage}</p>`);
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

				let cssClass = "";

				if(actor == this.player) {
					cssClass = "player-turn";
				} else {
					cssClass = "monster-turn";
				}

				this.log.unshift(`<p class=${cssClass}>${actor.name} heals himself for ${extraHealth}</p>`);
			},
			giveUp: function() {
				this.log.unshift(`<p class="player-turn">${this.player.name} RUN AWAY</p>`);
				this.gameRunning = false;
				this.gameOverMessage = `YOU DECIDED TO RUN AWAY FROM THE ${this.monster.name}...`;
			},

			skip: function() {
				this.log.unshift(`<p class="player-turn">${this.player.name} SKIPPED HIS TURN</p>`);
				this.monsterMove();
			}
		}
	});
};

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
