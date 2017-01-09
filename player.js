// Player has a name cards, an action, player capital, and a position

var readlineSync = require('readline-sync'); 


function Player(name, capital){
	this.nam = name;
	this.capital = capital; 
}


Player.prototype.fold = function(){
	//Putback player cards in the bottom of the deck
}

Player.prototype.callBet = function(betAmount){
	this.capital -= betAmount; 
}

Player.prototype.raise = function(rasieAmount){
	this.capital -= rasieAmount;
}
module.exports = Player;


var aids = new Player('Sharath', 40);
console.log(aids);
aids.callBet(20);
console.log('Money after calling: '+aids.capital);
