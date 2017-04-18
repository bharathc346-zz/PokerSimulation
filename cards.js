function Cards() {
	//cards making up deck 
	this.deck = ['A♠', 'A♦', 'A♥', 'A♣', '2♠', '2♦', '2♥', '2♣', '3♠', '3♦', '3♥', '3♣', 
				'4♠', '4♦', '4♥', '4♣', '5♠', '5♦', '5♥', '5♣', '6♠', '6♦', '6♥', '6♣',
				'7♠', '7♦', '7♥', '7♣', '8♠', '8♦', '8♥', '8♣', '9♠', '9♦', '9♥', '9♣',
				'T♠', 'T♦', 'T♥', 'T♣', 'J♠', 'J♦', 'J♥', 'J♣', 'Q♠', 'Q♦', 'Q♥', 'Q♣',	
				'K♠', 'K♦', 'K♥', 'K♣'];
};

//function to shuffle cards
Cards.prototype.shuffle = function() {
	//index 0-51
	for(var i = 0; i < this.deck.length; i++) {
		var randIndex = Math.floor(Math.random() * (52 - 0)) + 0;
		var temp = this.deck[i];
		this.deck[i] = this.deck[randIndex];
		this.deck[randIndex] = temp;
	}
}

//toString method to print deck of cards
Cards.prototype.toString = function() {
	var res = "[";
	for (var i = 0; i < this.deck.length; i++ ) {
		if(i !=this.deck.length-1) {
			res+=this.deck[i]+", ";
		}
	}
	res+= this.deck[this.deck.length-1]+"]";
	return res;
}

//deal one card at a time
Cards.prototype.deal = function() {
	var res = this.deck.splice(0,1);
	return res[0];
}

//reset cards to all 52
Cards.prototype.reset = function() {
	this.deck = ['A♠', 'A♦', 'A♥', 'A♣', '2♠', '2♦', '2♥', '2♣', '3♠', '3♦', '3♥', '3♣', 
				'4♠', '4♦', '4♥', '4♣', '5♠', '5♦', '5♥', '5♣', '6♠', '6♦', '6♥', '6♣',
				'7♠', '7♦', '7♥', '7♣', '8♠', '8♦', '8♥', '8♣', '9♠', '9♦', '9♥', '9♣',
				'T♠', 'T♦', 'T♥', 'T♣', 'J♠', 'J♦', 'J♥', 'J♣', 'Q♠', 'Q♦', 'Q♥', 'Q♣',	
				'K♠', 'K♦', 'K♥', 'K♣'];
}

module.exports = Cards;

//--------------------Testing-----------------------------------

// var deck = new Cards();
// deck.shuffle();
// console.log('\n');
// console.log(deck.toString());
// console.log('\n');
// console.log(deck.deal());
// console.log(deck.deal());
// console.log(deck.reset());
// console.log('\n');
// console.log(deck.toString());





