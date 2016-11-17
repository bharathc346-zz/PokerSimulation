//----------------------------------DECK--------------------------------------------------------
var shuffle = require('shuffle-array');
function Deck(){
	this.suits = ["H","D","S","C"];
	this.ranks = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];
	this.deckSize = this.suits.length * this.ranks.length;
	this.deck = [];
	this.createDeck = function(){
		for(i =0; i<this.suits.length;i++){
			for(j =0; j<this.ranks.length;j++){
				this.deck.push(this.ranks[j]+this.suits[i]);
			}
		}
	}
}

//-----------------------------------------------------------------------------------------------
//----------------------------------PlAYER--------------------------------------------------------

// var playerName;
// var playerAssignment;
// var playerMoney;
// var playerAction; 
// var betAmount;

// function setPlayerName(name){
// 	this.playerName = name;
// }

// function getPlayerName(){
// 	return this.playerName;
// }

// function setPlayerAssignment(){
// 	//big blind, check, call, 
// }
function Player(playerName, playerMoney, betAmount) {
    this.playerName = playerName;
    this.playerAssignment = ['Dealer','Big Blind','Small Blind','Normal'];
    this.playerMoney = playerMoney;
    this.playerAction = ['Raise', 'Call', 'Check', 'Fold'];
    this.betAmount = betAmount;
    this.setBetAmount = function(amount){
    	this.setAmount = betAmount;
    }
    this.getBetAmount = function(){
    	return this.betAmount;
    }
    this.setPlayerName = function(playerName){
    	this.playerName = playerName;
    }
    this.getPlayerName = function(){
    	return this.playerName
    }
}
var draulz = new Player("Rahul", 10.00, 5.00);
draulz.setPlayerName("Sharath");
console.log(draulz.getPlayerName());


//-----------------------------------------------------------------------------------------------
//----------------------------------TABLE--------------------------------------------------------
// function dealTwo(){
// 	var deal = []
// 	for(i = 0; i<=1;i++){
// 		deal.push(deck[i]);
// 	}
// 	deck.splice(0,2);
// 	return deal;
// }


