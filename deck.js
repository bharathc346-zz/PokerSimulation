var cards = require('cards');
 
// Create a new 52 card poker deck 
var deck = new cards.PokerDeck();
 
// Shuffle the deck 
deck.shuffleAll();
 
// Draw a card 
var card = deck.draw();

console.log(card.unicodeString(); )