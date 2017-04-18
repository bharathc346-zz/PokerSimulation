function Player(name, money) {
	this.nam = name;
	this.money = money; 
};

//set name of the player
Player.prototype.setName = function(str) {
	this.nam = str;
}

//return name of player
Player.prototype.getName = function() {
	return this.nam;
}

//setMoney for player
Player.prototype.setMoney = function(x) {
	this.money = x;
} 

//return money for player
Player.prototype.getMoney = function() {
	return this.money;
}

//toString for player
Player.prototype.toString = function() {
	var res = this.nam+": 	"+this.money+"$";
	return res;
}

module.exports = Player;



//--------------------Testing-----------------------------------
// var player = new Player("Player 1",40);
// console.log(player.toString());



