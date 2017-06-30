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
	this.myHand = [];
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
Table.prototype.evalStarHand = function() {
	var posType = this.evalPos();
	var nums = [];
	var suits = [];
	var play = true;
	var suited = false; 
	var paired = false;
	var temp = this.StarHandMap();
	var mapVals = [temp[0],temp[1]];
	var mapValsSum = temp[2];

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
		if(includes(mapVals,13) && mapValsSum>=19) {
			if(mapValsSum>=23) {
				console.log("You can play this hand in any position ");
				play = true;
			}
			else if(mapValsSum>= 19 && posType == 1) {
				console.log("You can only play this hand in a late position");
				play = true;
			}
			else {
				play = false; 
			}
			
		}
		else if(includes(mapVals,12) && mapValsSum>=20) {
			if(mapValsSum>=22) {
				console.log("You can play this hand in any position");
				play = true; 
			}
			else if(mapValsSum>=21 && posType>=0) {
				console.log("You can only play this hand in a mid or late positon");
				play = true;
			}
			else if(mapValsSum >= 20 && posType ==1) {
				console.log("You can only play this hand in a late position");
				play = true; 
			}
			else {
				play = false; 
			}
		}
		else if(includes(mapVals,11)&& mapValsSum>=19) {
			if(mapValsSum>=20 && posType>= 0) {
				console.log("You can only play this in a mid or late position");
				play = true;
			}
			else if(mapValsSum>=19 && posType==1) {
				console.log("You can play this in a late position");
				play = true; 
			}
			else {
				return false;
			}
		}
		else if(includes(mapVals,10)&& mapValsSum>=17) {
			if(mapValsSum>=19 && posType>=0) {
				console.log("You can only play this hand in a mid or late position");
				play = true; 
			}
			else if(mapValsSum>=17 && posType==1) {
				console.log("You can only play this hand in a late position");
				play = true; 
			}
			else {
				play = false; 
			}
		}
		else if(includes(mapVals,9)&& mapValsSum>=16) {
			if(posType==1) {
				console.log("You can only play this hand in a mid or late position");
				play = true;
			}
			else {
				play = false; 
			}
		}
		else if(includes(mapVals,8)&& mapValsSum>=14) {
			if(posType == 1) {
				console.log("You can only play this hand in a mid or late position");
				play = true;
			}
		}
		else if(includes(mapVals,7)&& mapValsSum>=13) {
			if(posType == 1) {
				console.log("You can only play this hand in a mid or late position");
				play = true;
			}
			else {
				play = false;
			}
		}
		else {
			play = false;
		}

	}
	//suited or paired hand
	else {
		//paired
		if(paired) {
			if(mapValsSum>=12) {
				console.log("You can play this hand in any position");
				play = true; 
			}
			else if(mapValsSum>=8 && posType>=0) {
				console.log("You can only play this hand in a mid or late position");
				play = true; 
			}
			else if(mapValsSum>=2&& posType == 1) {
				console.log("You can only play this hand in a late position");
				play = true; 
			}
			else {
				play = false; 
			}
		}
		//suited
		else {
			if(includes(mapVals,13)) {
				if(mapValsSum>=22) {
					console.log("You can play this hand in any position");
					play = true; 
				}
				else if(mapValsSum>=18 && posType>=0) {
					console.log("You can only play this hand in a mid or late position ");
					play = true;
				}
				else if(posType==1) {
					console.log("You can only play this hand in a late position");
					play = true; 
				}
			}

			else if(includes(mapVals,12)) {
				if(mapValsSum>= 21) {
					console.log("You can play this hand in any position");
					play = true;
				}
				else if(mapValsSum>=20 && posType>=0) {
					console.log("You can only play this hand in a mid or late position ");
					play = true; 
				}
				else if(posType==1) {
					console.log("You can only play this hand in a late position");
					play = true; 
				}
				else {
					play = false; 
				}
			}
			else if(includes(mapVals,11)) {
				if(mapValsSum>=20) {
					console.log("You can play this hand in any position");
					play = true;
				}
				else if(mapValsSum>=18 && posType>=0) {
					console.log("You can only play this hand in a mid or late position ");
					play = true; 
				}
				else {
					play = false; 
				}
			}
			else if(includes(mapVals,10)) {
				if(mapValsSum>=18) {
					console.log("You can play this hand in any position");
					play = true;
				}
				else if(mapValsSum>=17 && posType>=0) {
					console.log("You can only play this hand in a mid or late position ");
					play = true; 
				}
				else if(mapValsSum>=16 && posType==1) {
					console.log("You can only play this hand in a late position");
					play = true; 
				}
				else {
					play = false; 
				}
			}
			else if(includes(mapVals,9)) {
				if(mapValsSum>=17) {
					console.log("You can play this hand in any position");
					play = true;
				}
				else if(mapValsSum>=16 && posType>=0) {
					console.log("You can only play this hand in a mid or late position ");
					play = true;
				}
				else if(mapValsSum>=15 && posType==1){
					console.log("You can only play this hand in a late position");
					play = true; 
				}
				else {
					play = false; 
				}
			}
			else if(includes(mapVals,8)) {
				if(mapValsSum>=15 && posType>=0) {
					console.log("You can only play this hand in a mid or late position ");
					play = true;
				}
				else if(mapValsSum>=13 && posType==1) {
					console.log("You can only play this hand in a late position");
					play = true;
				}
				else {
					play = false;
				}
			}
			else if(includes(mapVals,7)) {
				if(mapValsSum>=13 && posType ==1) {
					console.log("You can only play this hand in a late position");
					play = true;
				}
				else {
					play = false; 
				}
			}
			else if(includes(mapVals,6)) {
				if(mapValsSum>= 11 && posType == 1) {
					console.log("You can only play this hand in a late position");
					play = true;
				}
				else {
					play = false; 
				}
			}
			else if(includes(mapVals,5)) {
				if(mapValsSum>=9 && posType == 1) {
					console.log("You can only play this hand in a late position");
					play = true;
				}
				else {
					play = false; 
				}
			}
			else if(includes(mapVals,4)) {
				if(mapValsSum>=7 && posType ==1) {
					console.log("You can only play this hand in a late position");
					play = true;
				}
				else {
					play = false; 
				}
			}
			
			else {
				play = false; 
			}

		}
	}
	console.log("Playable: "+play);
	return play;
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

Table.prototype.nextPos = function() {
	if(this.myPosition!=9) {
		this.myPosition++;
	}
	else {
		this.myPosition = 1;
	}
}

module.exports = Table;





//--------------------Testing-----------------------------------
var countPlayableHands = 0; 
var totalTrials = 10000;
var table = new Table();
table.createPlayers(9,40);
for(var i = 0; i<totalTrials; i++) {	
	// console.log(table.players);
	table.deck.reset();
	table.deck.shuffle();
	table.dealToPlayers();
	table.nextPos();
	// console.log("Position: "+table.myPosition);
	console.log(table.myHand+"									Position: "+table.myPosition);
	if(table.evalStarHand()) {
		countPlayableHands++;
	}
	console.log("\n");
	// table.StarHandMap();
}
console.log("Playable hands: "+countPlayableHands);
console.log("Percentage of Playable Hands: "+(countPlayableHands/totalTrials)*100 +"%");

