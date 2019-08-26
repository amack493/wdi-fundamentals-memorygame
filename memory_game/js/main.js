console.log("Up and Running!");



var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

var cardsInPlay = [];
var score = 0;
var result = document.getElementById("match-or-not");	// for changing the message after you match or not
var clickedCards = document.getElementsByClassName("clicked"); // for keeping track of which cards have been clicked, so we can turn them over

//flips back cards after theyve been flipped
var flipBack = function (){
	for (var i = 0; i < clickedCards.length; i+=1){
		clickedCards[i].setAttribute("src","images/back.png");
	}
};

//slightly slower so players can see where the cards that didn't match were
var delayedFlipBack = function(){
	var timeoutID = window.setTimeout(flipBack, 700);
}

//function checks if a match is present, if not resets cardsInPlay
var checkForMatch = function(){
	if (cardsInPlay[0] === cardsInPlay[1]){
		result.textContent = "You found a match!";
		score += 1;
		document.getElementById("score").textContent = score;
	} else {
		result.textContent = "Sorry, try again.";
		delayedFlipBack(); 
	}
	cardsInPlay = [];
};

//whenever we click on a card to flip it over, display card and holds result
var flipCard = function() {
	var cardId = this.getAttribute("data-id");
	var card = cards[cardId];
	this.setAttribute("src", card.cardImage);
	this.setAttribute("class", "clicked");
	console.log(this);
	cardsInPlay.push(card.rank);
	if (cardsInPlay.length === 2) {
		checkForMatch();
	}
};

//initial function to create game board
var createBoard = function(){
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", i)
		cardElement.addEventListener("click", flipCard);
		var board = document.getElementById("game-board");
		board.appendChild(cardElement);
	}
};

//starts game over
var resetGame = function(){
	score = 0;
	document.getElementById("score").textContent = score;
	result.textContent = "Ready for a new game??";
	flipBack();
};

//begins program by creating board and waiting for reset 
createBoard();
document.querySelector("button").addEventListener("click", resetGame);
