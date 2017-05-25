var Cards = require(__dirname+'/Cards.js');
var Player = require(__dirname+'/Player.js')
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
	var play = false;
	var suited = false; 
	var paired = false;

	//go through 2 elements
	for(var i = 0; i<this.myHand.length;i++) {
		nums.push(this.myHand[i][0]);
		suits.push(this.myHand[i][1]);
	}
	console.log('Nums: '+nums);

	
	if(nums[0] == nums[1]) {
		paired = true; 
	}

	if(suits[0] == suits[1]) {
		suited = true; 
	}
	
	//starting hand is unsuited
	if(!suited) {
		//if late
		if(posType == 1) {
			//if has 8 then second card must be 9-J
			if(nums.indexOf('8') > -1) {
				if(nums.indexOf('7')> -1) {
					play = true;
				}
				if(nums.indexOf('9')>-1) {
					play = true; 
				}
				if(nums.indexOf('10')> -1) {
					play = true;
				}
				if(nums.indexOf('J')> -1) {
					play = true; 
				}
				if(nums.indexOf('A')> -1) {
					play = true; 
				}
			}
			if(nums.indexOf('9') > -1) {
				if(nums.indexOf('7')> -1) {
					play = true;
				}
				if(nums.indexOf('8')>-1) {
					play = true; 
				}
				if(nums.indexOf('10')> -1) {
					play = true;
				}
				if(nums.indexOf('J')> -1) {
					play = true; 
				}
				if(nums.indexOf('A')> -1) {
					play = true; 
				}
			}
		}
	}
	return play;
}


module.exports = Table;





//--------------------Testing-----------------------------------

var table = new Table();
table.deck.shuffle();
table.createPlayers(9,40);
console.log(table.players);
table.dealToPlayers();
table.myHand = ['8♥', 'A♦'];
console.log(table.myHandToString());
console.log("Position: "+table.myPosition);
console.log(table.evalStarHand());

