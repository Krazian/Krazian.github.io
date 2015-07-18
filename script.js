console.log("Doc ready");

/////////////////////////////////////   FUNCTION AND VARIABLE DECLARATIONS   ///////////////////////////////////
var playerWin = false;//necessary?
var dealerWin = false;//necessary?
var newCard = 0;
var bankroll = 1000;

//Every time dealCards is envoked, used deck is replaced with new deck.
var dealCards = function(){
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

//randomly selects suit and value then removes from master deck
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

//calculate total
var total = function(hand){
	var total = 0;
	for (var i = 0; i < hand.length; i++){
		total += hand[i][2];
	}
	return total
};

//used in instances were both displays show same message
var twoDisplay = function(string){
	$("#player-status")[0].textContent+=string;
	$("#dealer-status")[0].textContent+=string;
};

//calculates and determines win/lose/push
var winner = function(){
	if(aceCheck(playerHand)>aceCheck(dealerHand)){
		twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". YOU WIN!");
		bankroll += 2*parseInt($(".bet")[0].value);
		}else if (aceCheck(dealerHand)>aceCheck(playerHand)){
			twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". You lose...");
			}else if (aceCheck(playerHand)===aceCheck(dealerHand)){
				twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". It's a push.");
				bankroll += parseInt($(".bet")[0].value);
				}
	}

//turns of all button from accepting user interaction
var disableButtons = function(){
	$(".hit").prop("disabled",true);
	$(".stay").prop("disabled",true);
	$(".split").prop("disabled",true);
	$(".double").prop("disabled",true);

};

//turns on all buttons
var enableButtons = function(){
	$(".hit").prop("disabled",false);
	$(".stay").prop("disabled",false);
	$(".split").prop("disabled",false);
	$(".double").prop("disabled",false);
}

//search for all instance of an ace
var aceSearch = function(cards){ 		
	var aceCounter = 0;
	for(var i = 0;i<cards.length;i++)
		if (cards[i][1]==="Ace"){
			aceCounter++;}
			return aceCounter;
		}
//change ace value from 11 to 1 if necessary
var aceCheck = function(hand){
if(total(hand)===21){					//___________If blackjack, just return #
	return total(hand)
} else if (total(hand)>=12){  //___________Min value of hand w/ ace is 12 (A A)
		if (aceSearch(hand)===0){ //___________If NO aces, return value
			return total(hand)
		} else if (aceSearch(hand)<2&&total(hand)<21){     //________If 0 or 1 ace, return value
			return total(hand)
			} else if (aceSearch(hand)<=2&&total(hand)>21){  //________If 1 or 2 aces, BUT total is more that 21, reduce by 10
			return total(hand) - 10  
			} else if (aceSearch(hand)>2){						//_______________If multiple aces, reduce by 10 per one less total ace.
				return total(hand) - (10 * (aceSearch(hand)[1]-1));
				}
	} else{					//____________all other numbers before 12
	return total(hand)
	}
}
var moneyManage = function(){
	if (bankroll < 10){
		$('#modal').toggle();
		$(".modal-content").empty();
		$('#close').remove();
		var refresh = $("<button>").attr("id","refresh")
		$(".modal-body").append(refresh);
		$("#refresh").text("Click to Try Again!");
		$(".modal-content")[0].textContent="You don't have enough money to play.. GAME OVER!";
	}
}

/////////////////////////////////////   EVENT LISTENERS AND GAME LOGIC   ///////////////////////////////////
//Event for deal button
$(".deal").on("click",function(){
//parameters for betting
if((parseInt($(".bet")[0].value)<10)&&(parseInt($(".bet")[0].value))<bankroll){
	$("#player-status")[0].textContent="You need to make a bet of at least $10"
	} else if ((parseInt($(".bet")[0].value))>bankroll){
		$("#player-status")[0].textContent="You don't have that much in your bankroll"
		} else{
	bankroll -= parseInt($(".bet")[0].value);//remove bet from bank roll
	$("#dealer-card").addClass("hidden");
	$(".deal").prop("disabled",true);
	dealCards();
	enableButtons();
	$("#player-status")[0].textContent="You've got the "+playerHand[0][1]+" of "+playerHand[0][0]+" and the "+playerHand[1][1]+" of "+playerHand[1][0]+ " for a total of "+aceCheck(playerHand)+".";
	$("#dealer-status")[0].textContent="Dealer is showing a "+dealerHand[1][1]+" of "+dealerHand[1][0]+".";
	if (aceCheck(playerHand)===21){
	twoDisplay("--Blackjack! You Win!");
	disableButtons();
	bankroll += 2*parseInt($(".bet")[0].value);
	$(".deal").prop("disabled",false)
	} else if (aceCheck(playerHand)===21 && aceCheck(dealerHand)===21){
		twoDisplay("--Dealer reveals "+dealerHand[0][1]+" of "+dealerHand[0][0]+"."+" Blackjack! It's a push.");
		disableButtons();
		moneyManage();
		bankroll += parseInt($(".bet")[0].value);
		$(".deal").prop("disabled",false)
		} else if (aceCheck(dealerHand)===21){
			twoDisplay("--Dealer reveals "+dealerHand[0][1]+" of "+dealerHand[0][0]+"."+" Blackjack! You Lose...");
			disableButtons();
			moneyManage();
			$(".deal").prop("disabled",false)
			}
	for (var i = 0; i < newCard; i++){
		$("#new-card").remove(); //clears the screen of previously added divs
		};
}});
//Event for hit button
$(".hit").on("click",function(){
	playerHand.push(getACard());
	newCard+=1;
	$("#player-status")[0].textContent+="--You drew the " +playerHand[playerHand.length-1][1]+" of "+playerHand[playerHand.length-1][0]+". You've got a "+aceCheck(playerHand)+".";
	var nextCard = $("<div>").attr({"id":"new-card-player","class":"four columns"});
//Space to write code to cards suits and #





	$("#player").append(nextCard);
	if (aceCheck(playerHand) > 21){
		$("#player-status")[0].textContent+= "--BUSTED!";
		disableButtons();
		moneyManage();
		$(".deal").prop("disabled",false)
	}
	else if (aceCheck(playerHand) === 21){
		$("#player-status")[0].textContent+="!";
		disableButtons();
		$(".deal").prop("disabled",false)
	}
});
//Event for stay button
$(".stay").on("click",function(){
	disableButtons();
	$(".deal").prop("disabled",false)
	$("#dealer-card").toggleClass("hidden"); //Show face down card
	//set intervals?
	$("#dealer-status")[0].textContent+="--Dealer reveals a "+dealerHand[0][1]+" of "+dealerHand[0][0];

	if(aceCheck(dealerHand)<=16){
		do {
			dealerHand.push(getACard());
			newCard+=1;
			var nextCard = $("<div>").attr({"id":"new-card-dealer","class":"four columns"});
//Space to write code to cards suits and #






			$("#dealer").append(nextCard);
			$("#dealer-status")[0].textContent+="--Dealer drew the " +dealerHand[dealerHand.length-1][1]+" of "+dealerHand[dealerHand.length-1][0]+". Dealer has: "+aceCheck(dealerHand)+".";
			if (aceCheck(dealerHand)>17&&aceCheck(dealerHand)<=21){
				winner();
				moneyManage();
				$(".deal").prop("disabled",false);
				} else if (aceCheck(dealerHand)>21){
					twoDisplay("--Dealer BUSTS! You Win!");
					bankroll += 2*parseInt($(".bet")[0].value);
				} else{
					winner();
					moneyManage();
					$(".deal").prop("disabled",false);
				}}	
			while (aceCheck(dealerHand)<17);
		} else if (aceCheck(dealerHand)>16&&aceCheck(dealerHand)<=21){
				winner();
				moneyManage();
				$(".deal").prop("disabled",false);
			}
});

//Game Over refresh event
$('#refresh').click(function() {
    location.reload();
});
//Split option & Double Down option

$('#close').on('click',function(){
	$('#modal').toggle();
	enableButtons();
});






