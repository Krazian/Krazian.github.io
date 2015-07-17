console.log("Doc ready");


var playerWin = false;
var dealerWin = false;
var newCard = 0;

var dealCards = function(){
//Every time dealCards is envoked, used deck is replaced with new deck.
deck = [
[["Spades","King",10],["Spades","Queen",10],["Spades","Jack",10],["Spades","10",10],["Spades","9",9],["Spades","8",8],["Spades","7",7],["Spades","6",6],["Spades","5",5],["Spades","4",4],["Spades","3",3],["Spades","2",2],["Spades","Ace",11]],
[["Hearts","King",10],["Hearts","Queen",10],["Hearts","Jack",10],["Hearts","10",10],["Hearts","9",9],["Hearts","8",8],["Hearts","7",7],["Hearts","6",6],["Hearts","5",5],["Hearts","4",4],["Hearts","3",3],["Hearts","2",2],["Hearts","Ace",11]],
[["Clubs","King",10],["Clubs","Queen",10],["Clubs","Jack",10],["Clubs","10",10],["Clubs","9",9],["Clubs","8",8],["Clubs","7",7],["Clubs","6",6],["Clubs","5",5],["Clubs","4",4],["Clubs","3",3],["Clubs","2",2],["Clubs","Ace",11]],
[["Diamonds","King",10],["Diamonds","Queen",10],["Diamonds","Jack",10],["Diamonds","10",10],["Diamonds","9",9],["Diamonds","8",8],["Diamonds","7",7],["Diamonds","6",6],["Diamonds","5",5],["Diamonds","4",4],["Diamonds","3",3],["Diamonds","2",2],["Diamonds","Ace",11]]] ;
playerHand = [];
dealerHand = [];
playerHand.push(getACard());
dealerHand.push(getACard());
playerHand.push(getACard());
dealerHand.push(getACard());
console.log(playerHand);
console.log(dealerHand);
};

var getACard = function(){
	var randomSuit=function(){
		var chooseSuit = Math.floor(Math.random() * deck.length);
		return chooseSuit
		};
	var suit = randomSuit();

	var randomCard = function(){
		var chooseCard = Math.floor(Math.random() * deck[suit].length);
		return chooseCard
		};
	var card = randomCard();
	var fullCard = deck[suit][card];
	deck[suit].splice(card,1); // removes card from the deck
	return fullCard
};

var blackJackCheck = function(hand){
if (total(hand)===21){
	 return true
	} 
};

var total = function(hand){
	var total = 0;
	for (var i = 0; i < hand.length; i++){
		total += hand[i][2]
	}
	return total
};

var twoDisplay = function(string){
	$("#player-status").textContent+=string;
	$("#dealer-status").textContent+=string;
};

var winner = function(){
	if(total(playerHand)>total(dealerHand)){
		twoDisplay("You've got: "+total(playerHand)+" and the dealer has: "+total(dealerHand)+". YOU WIN!");
		}else if (total(dealerHand)>total(playerHand)){
			twoDisplay(" You've got: "+total(playerHand)+" and the dealer has: "+total(dealerHand)+". You lose...");
			}else if (total(playerHand)===total(dealerHand)){
				twoDisplay(" You've got: "+total(playerHand)+" and the dealer has: "+total(dealerHand)+". It's a push.");
				}
	}
	var disableButtons = function(){
		$(".hit").prop("disabled",true)
		$(".stay").prop("disabled",true)
		$(".split").prop("disabled",true)
		$(".double").prop("disabled",true)
	};

	var enableButtons = function(){
		$(".hit").prop("disabled",false)
		$(".stay").prop("disabled",false)
		$(".split").prop("disabled",false)
		$(".double").prop("disabled",false)
	}

//Event for deal button
$(".deal").on("click",function(){
	$("#dealer-card").toggleClass("hidden")
	dealCards();
	$("#player-status")[0].textContent=" You've got: "+total(playerHand);
	$("#dealer-status")[0].textContent=" Dealer is showing a "+dealerHand[1][1]+" of "+dealerHand[1][0]+".";
	if (blackJackCheck(playerHand)===true){
	twoDisplay(" Blackjack! You Win!");
	} else if (blackJackCheck(playerHand)===true && blackJackCheck(dealerHand)===true){
		twoDisplay(" Dealer reveals "+dealerHand[0][1]+" of "+dealerHand[0][0]+"."+" Blackjack! It's a push.");
		} else if (blackJackCheck(dealerHand)===true){
			twoDisplay("Dealer reveals "+dealerHand[0][1]+" of "+dealerHand[0][0]+"."+" Blackjack! You Lose...");
			}
	enableButtons();
	for (var i = 0; i < newCard; i++){
		$("#new-card").remove() //clears the screen of previously added divs
	};
});
//Event for hit button
//Account for ace 1 value variant
$(".hit").on("click",function(){
	playerHand.push(getACard());
	newCard+=1;
	$("#player-status")[0].textContent+=" You drew the " +playerHand[playerHand.length-1][1]+" of "+playerHand[playerHand.length-1][0]+". You've got: "+total(playerHand)+".";
	var nextCard = $("<div>").attr({"id":"new-card","class":"four columns"})
	$("#player").append(nextCard);
	if (total(playerHand) > 21){
		$("#player-status")[0].textContent+=" "+total(playerHand)+ "! BUSTED!";
		disableButtons();
	}
	else if (total(playerHand) === 21){
		$("#player-status")[0].textContent+=total(playerHand)+ " 21!";
		disableButtons();
	}
});
//Event for stay button
$(".stay").on("click",function(){
	disableButtons();
	$("#dealer-card").toggleClass("hidden")
	//Show face down card
	//set intervals?
	$("#dealer-status")[0].textContent+=" Dealer has "+total(dealerHand)+".";
	if(total(dealerHand)<=16){
		do {
			dealerHand.push(getACard())
			newCard+=1
			var nextCard = $("<div>").attr({"id":"new-card","class":"four columns"})
			$("#dealer").append(nextCard);
			if (total(dealerHand)>17&&total(dealerHand)<=21){
				winner();
				} else if (total(dealerHand)>21){
					twoDisplay(" Dealer has "+total(dealerHand)+"! BUST! You Win!")
				} else{
					winner()
				}}	
			while (total(dealerHand)<17);
		} else if (total(dealerHand)>16&&total(dealerHand)<=21){
				winner()}
});

//Split option & Double Down option

$('#close').on('click',function(){
	$('#modal').toggle();
	enableButtons();
});






