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

function Player(playerName, playerMoney, betAmount, playerCards) {
    this.playerName = playerName;
    this.playerAssignment = ['Dealer','Big Blind','Small Blind','Normal'];
    this.playerMoney = playerMoney;
    this.playerAction = ['Raise', 'Call', 'Check', 'Fold'];
    this.betAmount = betAmount;
    this.playerCards = playerCards;
    this.setPlayerCards = function(cards){
        this.playerCards=cards;
    }
    this.getPlayerCards = function(){
        return this.playerCards;
    }
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

//-----------------------------------------------------------------------------------------------
//----------------------------------TABLE--------------------------------------------------------
var Deck = new Deck();
Deck.createDeck();//create new deck
shuffle(Deck.deck);//shuffle deck
function Table(){
    this.dealTwo = function(){
        var deal = [];
        for(i = 0; i<=1;i++){
            deal.push(Deck.deck[i]);
        }
        Deck.deck.splice(0,2);
        return deal;
    }
    this.dealFlop = function(){
        var deal = [];
        Deck.deck.splice(0,1);
        for(i=0;i<=2;i++){
            deal.push(Deck.deck[i]);
        }
        Deck.deck.splice(0,3);
        return deal;
    }
    this.dealTurn = function(){
        var deal = [];
        Deck.deck.splice(0,1);
        deal.push(Deck.deck[0]);
        Deck.deck.splice(0,1);
        return deal;     
    }
    this.dealRiver = function(){
        var deal = [];
        Deck.deck.splice(0,1);
        deal.push(Deck.deck[0]);
        Deck.deck.splice(0,1);
        return deal;
    }
}
var Table = new Table();
console.log('\n\n'+Deck.deck);
var BharathCards = Table.dealTwo();
var RahulCards = Table.dealTwo();
var KaushikCards = Table.dealTwo();
var flop = Table.dealFlop();
var turn = Table.dealTurn();
var river = Table.dealRiver();
var Player1 = new Player("Bharath",100,0,BharathCards);
var Player2 = new Player("Rahul",100,0,RahulCards);
var Player3 = new Player("Kaushik",100,0,KaushikCards);

console.log('\n\nBharath Cards:        '+Player1.getPlayerCards());
console.log('Rahul Cards:          '+Player2.getPlayerCards());
console.log('Kaushik Cards:        '+Player3.getPlayerCards());
console.log('Flop:                 '+flop);
console.log('Turn:                 '+flop+','+turn);
console.log('River                 '+flop+','+turn+','+river+'\n\n');
//----------------------------------WIN--------------------------------------------------------

function playerHand(){
    var fullBharathHand = [];
    fullBharathHand = BharathCards; 
    fullBharathHand.push(flop[0],flop[1],flop[2],turn[0],river[0]);
    return fullBharathHand;
}

console.log(playerHand());



