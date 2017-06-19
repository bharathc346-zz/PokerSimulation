var Cards = require(__dirname+'/Cards.js');
var Player = require(__dirname+'/Player.js')
var includes = require('array-includes');
/*
				--3--	--4--
			--2--			--5--
		--1--				 	--6--  where 9 is dealer, 1 is small blind, and 2 is big blind
			--9D--	--8--	--7--	
				

		
*/
function Table() {
	this.commonCards = [];

	//make table deck from cards class
	this.deck = new Cards();
	this.players = [];
	this.myPosition = Math.floor(Math.random() * (10 - 1)) + 1;
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
			(this.myPosition == this.players.length && i%this.players.length == 0)) 
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
		this.late = true; 
		return 1;
	}
	else if(this.myPosition <=6 && this.myPosition >=4) {
		this.mid = true;
		return 0;
	}
	else {
		this.early = true;
		return -1;
	}
}


//evaluate starting hand
Table.prototype.evalStarHand = function() {
	var posType = this.evalPos();
	var nums = [];
	var suits = [];
	var play = true;
	var suited = false; 
	var paired = false;
	var mapVals = this.StarHandMap();

	//go through 2 elements
	for(var i = 0; i<this.myHand.length;i++) {
		nums.push(this.myHand[i][0]);
		suits.push(this.myHand[i][1]);
	}
	if(nums[0] == nums[1]) {
		paired = true; 
	}
	if(suits[0] == suits[1]) {
		suited = true; 
	}

	//starting hand is unsuited and not pair
	if(!suited && !paired) {
		//playable hands 
		if(includes(mapVals,13) && mapVals[2]>=19) {
			play = true;
		}
		else if(includes(mapVals,12) && mapVals[2]>=20) {
			play = true
		}
		else if(includes(mapVals,11)&& mapVals[2]>=19) {
			play = true;
		}
		else if(includes(mapVals,10)&& mapVals[2]>=17) {
			play = true;
		}
		else if(includes(mapVals,9)&& mapVals[2]>=16) {
			play = true;
		}
		else if(includes(mapVals,8)&& mapVals[2]>=14) {
			play = true;
		}
		else if(includes(mapVals,7)&& mapVals[2]>=13) {
			play = true;
		}
		else {
			play = false;
		}

	}
	console.log("Playable: "+play);
}

Table.prototype.StarHandMap = function() {
	var totalMap = 0; 
	var mapVals = [];
	for(var i = 0; i<this.myHand.length;i++) {
		var j = 0;
		var mapNum = 0;
		if(this.myHand[i][j] == 'T') {
			mapNum = 58-49;
		}
		else if(this.myHand[i][j] == 'J') {
			mapNum = 59-49;
		}
		else if(this.myHand[i][j] == 'Q') {
			mapNum = 60-49;
		}
		else if(this.myHand[i][j] == 'K') {
			mapNum = 61-49;
		}
		else if(this.myHand[i][j] == 'A') {
			mapNum = 62-49;
		}
		else {
			mapNum = this.myHand[i][j].charCodeAt(j) - 49;		
		}
		mapVals.push(mapNum);
	}
	for(var k = 0; k<mapVals.length;k++) {
		totalMap = totalMap+mapVals[k];
	}
	mapVals.push(totalMap);
	return mapVals;
	// console.log(mapVals+'\n');
}

module.exports = Table;





//--------------------Testing-----------------------------------
for(var i = 0; i<100; i++) {
	var table = new Table();
	table.deck.shuffle();
	table.createPlayers(9,40);
	// console.log(table.players);
	table.dealToPlayers();
	// console.log("Position: "+table.myPosition);
	console.log(table.myHand);
	table.evalStarHand();
	console.log("\n");
	// table.StarHandMap();
}


