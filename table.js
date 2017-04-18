var Cards = require(__dirname+'/Cards.js');
var Player = require(__dirname+'/Player.js')
/*
				--3--	--4--
			--2--			--5--
		--1--				 	--6--  where 9 is dealer, 1 is small blind, and 2 is big blind
			--9--	--8--	--7--	
				

		
*/
function Table() {
	this.commonCards = [];

	//make table deck from cards class
	this.deck = new Cards();
	this.players = [];
	this.myPosition = Math.floor(Math.random() * (7 - 1)) + 1;
	this.myHand = [];
	this.othersHands = [];

};

//create a number (numpPlayer) of players with amMoney
Table.prototype.createPlayers = function(numPlayers, amMoney) {
	for(var i = 0; i<numPlayers;i++) {
		 this.players.push((new Player("P"+(i+1),amMoney)));
	}
}

//deal cards to players
Table.prototype.dealToPlayers = function() {
	for(var i = 1; i<2*this.players.length+1;i++){
		if(i%this.players.length == this.myPosition || 
			(this.myPosition == this.players.length && i%this.player.length == 0)) 
		{
			this.myHand.push(this.deck.deal());
		}
		else{
			this.othersHands.push(this.deck.deal());
		}
	}
}

//toString for myHand
Table.prototype.myHandToString = function() {
	var res = "["
	for (var i = 0; i< this.myHand.length; i++) {
		if(i!=this.myHand.length-1) {
			res+= this.myHand[i]+", ";
		}
	}
	res+=this.myHand[this.myHand.length-1]+"]";
	return res;
}

//evaluate the position of the player (Helper method)
//-1 is early, 0 is middle, 1 is late
Table.prototype.evalPos = function() {
	if(this.myPosition <= 9 && this.myPosition >=7) {
		return 1;
	}
	else if(this.myPosition <=6 && this.myPosition >=4) {
		return 0;
	}
	else {
		return -1;
	}
}


//evaluate starting hand
Table.prototype.evalHand = function() {
	var posType = this.evalPos();
	var nums = [];
	var suits = [];
	var suited = false; 
	var paired = false;

	//go through 2 elements
	for(var i = 0; i<this.myHand.length;i++) {
		suits.push(this.myHand[i][0]);
		nums.push(this.myHand[i][1]);
	}

	
	if(nums[0] == nums[1]) {
		paired = true; 
	}

	if(suits[0] == suits[1]) {
		suited = true; 
	}
	console.log(suited);
	console.log(paired);

}


module.exports = Table;





//--------------------Testing-----------------------------------

var table = new Table();
table.deck.shuffle();

table.createPlayers(9,40);
console.log(table.players);
table.dealToPlayers();
console.log(table.myHandToString());
table.evalHand();



