var Cards = require(__dirname+'/Cards.js');
/*
			--2--	--3--
		--1--			--4--  where 6 is dealer, 1 is small blind, and 2 is big blind
			--6--	--5--	

		
*/
function Table() {
	this.commonCards = [];

	//make table deck from cards class
	this.deck = new Cards();
	this.players = [1,2,3,4,5,6];
	this.myPosition = Math.floor(Math.random() * (7 - 1)) + 1;
	this.myHand = [];
	this.othersHands = [];

};

//deal cards to players
Table.prototype.dealToPlayers = function() {
	console.log(this.deck.toString());
	console.log("My Position: "+this.myPosition);
	for(var i = 1; i<2*this.players.length+1;i++){
		if(i%6 == this.myPosition || (this.myPosition == 6 && i%6 == 0)) 
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


module.exports = Table;





//--------------------Testing-----------------------------------

var table = new Table();
table.deck.shuffle();
table.dealToPlayers();
console.log(table.myHandToString());  



