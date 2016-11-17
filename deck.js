var shuffle = require('shuffle-array');

var SUITS =["H","D","S","C"];
var RANKS =["A","K","Q","J","10","9","8","7","6","5","4","3","2"];
var deckSize = SUITS.length * RANKS.length;
var deck = [];

function createDeck(){
	for(i =0; i<SUITS.length;i++){
		for(j =0; j<RANKS.length;j++){
			deck.push(RANKS[j]+SUITS[i]);
		}
	}
}

createDeck();
shuffle(deck); 



function dealTwo(){
	var deal = []
	for(i = 0; i<=1;i++){
		deal.push(deck[i]);
	}
	deck.splice(0,2);
	return deal;
}

console.log(deck);
console.log(dealTwo());
console.log(deck);

