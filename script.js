console.log("Doc ready");

/////////////////////////////////////   FUNCTION AND VARIABLE DECLARATIONS   ///////////////////////////////////
var playerWin = false;//necessary?
var dealerWin = false;//necessary?
var newCard = 0;
var bankroll = 1000;
$("#You")[0].textContent+=bankroll

//Every time dealCards is envoked, used deck is replaced with new deck.
var dealCards = function(){
deck = [
[["Spades","King",10],["Spades","Queen",10],["Spades","Jack",10],["Spades","10",10],["Spades","9",9],["Spades","8",8],["Spades","7",7],["Spades","6",6],["Spades","5",5],["Spades","4",4],["Spades","3",3],["Spades","2",2],["Spades","Ace",11]],
[["Hearts","King",10],["Hearts","Queen",10],["Hearts","Jack",10],["Hearts","10",10],["Hearts","9",9],["Hearts","8",8],["Hearts","7",7],["Hearts","6",6],["Hearts","5",5],["Hearts","4",4],["Hearts","3",3],["Hearts","2",2],["Hearts","Ace",11]],
[["Clubs","King",10],["Clubs","Queen",10],["Clubs","Jack",10],["Clubs","10",10],["Clubs","9",9],["Clubs","8",8],["Clubs","7",7],["Clubs","6",6],["Clubs","5",5],["Clubs","4",4],["Clubs","3",3],["Clubs","2",2],["Clubs","Ace",11]],
[["Diamonds","King",10],["Diamonds","Queen",10],["Diamonds","Jack",10],["Diamonds","10",10],["Diamonds","9",9],["Diamonds","8",8],["Diamonds","7",7],["Diamonds","6",6],["Diamonds","5",5],["Diamonds","4",4],["Diamonds","3",3],["Diamonds","2",2],["Diamonds","Ace",11]]] ;
playerHand = [];
playerSplitHand =[]
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

//Calculates and determines win/lose/push AND handles bankroll calculations
var winner = function(){
	//No bust and player has higher hand
	if((aceCheck(playerHand)>aceCheck(dealerHand)&&(aceCheck(playerHand)<=21))){
		twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". YOU WIN!");
		bankroll += 2*parseInt($(".bet")[0].value);
		$("#You")[0].textContent = "You - $"+(bankroll)
		playerWin = true;
		dealerWin = false;
		//Player has lower hand, but dealer busts
	} else if((aceCheck(playerHand)<aceCheck(dealerHand)&&(aceCheck(dealerHand)>21))){
		twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". YOU WIN!");
		bankroll += 2*parseInt($(".bet")[0].value);
		$("#You")[0].textContent = "You - $"+(bankroll)
		playerWin = true;
		dealerWin = false;
		//No bust and dealer has higher hand
		}else if ((aceCheck(dealerHand)>aceCheck(playerHand)&&(aceCheck(dealerHand)<=21))){
			twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". You lose...");
			dealerWin = true;
			playerWin = false;

			//Dealer has lower hand, but player busts
			}else if ((aceCheck(dealerHand)<aceCheck(playerHand)&&(aceCheck(playerHand)>21))){
			twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". You lose...");
			dealerWin = true;
			playerWin = false;

			//No busts, both players value equal
			}else if (aceCheck(playerHand)===aceCheck(dealerHand)){
				twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". It's a push.");
				bankroll += parseInt($(".bet")[0].value);
				$("#You")[0].textContent = "You - $"+(bankroll)
				dealerWin = false;
				playerWin = false;
				}
	}

//Turns OFF all button from accepting user interaction
var disableButtons = function(){
	$(".hit").prop("disabled",true);
	$(".stay").prop("disabled",true);
	$(".split").prop("disabled",true);
	$(".double").prop("disabled",true);

};

//Turns ON all buttons
var enableButtons = function(){
	$(".hit").prop("disabled",false);
	$(".stay").prop("disabled",false);
	$(".split").prop("disabled",false);
	$(".double").prop("disabled",false);
}

//Search for all instance of an ace
var aceSearch = function(cards){ 		
	var aceCounter = 0;
	for(var i = 0;i<cards.length;i++)
		if (cards[i][1]==="Ace"){
			aceCounter++;}
			return aceCounter;
		}
//Change ace value from 11 to 1 if necessary
var aceCheck = function(hand){
	var grandTotal = total(hand);
	//If blackjack, just return #
if(total(hand)===21){
	return grandTotal
	  //Min value of hand w/ ace is 12 (A A)
} else if (total(hand)>=12){
	 	//If NO aces, return value
		if (aceSearch(hand)===0){
			return grandTotal
			//If 0 or 1 ace, return value
		} else if (aceSearch(hand)<2&&total(hand)<21){
			return grandTotal
			//If 1 or 2 aces, BUT total is more that 21, reduce by 10
			} else if (aceSearch(hand)<=2&&total(hand)>21){  
			return grandTotal -= 10  
			//If multiple aces, reduce by 10 per one less total ace.
			} else if (aceSearch(hand)>2&&total(hand)>21){
				return grandTotal -= (10 * (aceSearch(hand)-1));
				}
		//All other hands less 12
	} else{
	return total(hand)
	}
}
var moneyManage = function(){
	$("#You")[0].textContent="You - $" + bankroll
	if (bankroll < 10){
		$('#modal').toggle();
		//Creates blank space in modal
		$(".modal-content").empty();
		$('#close').remove();
		//Creates a 'try again' button that refreshes the page
		var refresh = $("<button>").attr("id","refresh")
		$(".modal-body").append(refresh);
		$("#refresh").text("Click to Try Again!");
		$('#refresh').on('click',function(){
    location.reload(true);
		});
		$(".modal-content")[0].textContent="You don't have enough money to play.. GAME OVER!";
	}
}

var doDealerThings = function(){
	disableButtons();
	$(".deal").prop("disabled",false)
	$("#dealer-card").toggleClass("hidden"); //Show face down card
	//set intervals?
	$("#dealer-status")[0].textContent+="--Dealer reveals a "+dealerHand[0][1]+" of "+dealerHand[0][0]+".";
	//Dealer must hit on 16 or below or 'soft' 17
	if((aceCheck(dealerHand)<=16)||((aceCheck(dealerHand)===17)&&(dealerHand[0][1]==="Ace"||dealerHand[1][1]==="Ace"))){
		do {
			dealerHand.push(getACard());
			newCard+=1;
			var nextCard = $("<div>").attr({"id":"new-card-dealer","class":"four columns"});
//Space to write code to cards suits and #
			





			$("#dealer").append(nextCard);
			$("#dealer-status")[0].textContent+="--Dealer drew the " +dealerHand[dealerHand.length-1][1]+" of "+dealerHand[dealerHand.length-1][0]+". Dealer has: "+aceCheck(dealerHand)+".";
			//If hand is between 17 and 21, dealer stops drawing cards and evaluates
			if (aceCheck(dealerHand)>=17&&aceCheck(dealerHand)<=21){
				winner();
				moneyManage();
				$(".deal").prop("disabled",false);
				//Dealer busts over 21, evaluate
				} else if (aceCheck(dealerHand)>21){
					twoDisplay("--Dealer BUSTS!");
					winner();
				//If still under 16, draw again	
				} else{
					$(".deal").prop("disabled",false);
				}}
			//Repeat 'do' and if/else if while hand is less than 17
			while (aceCheck(dealerHand)<17);
		//If starting hand over 17, do nothing and evaluate
		}else if (aceCheck(dealerHand)>16&&aceCheck(dealerHand)<=21){
				winner();
				moneyManage();
				$(".deal").prop("disabled",false);
			}
};

/*var suitImage = function(suit) {
	switch (suit){
		case "Spades":
			var pic = $("<div>").attr("class","suit-pic")
			$(".suit-pic").css("background-image","url('http://www.imageno.com/thumbs/20150718/r10svtl1ozd5.jpg')");
			break;
			//
		case "Hearts":
			var pic = $("<div>").attr("class","suit-pic")
			$(".suit-pic").css("background-image","url('http://www.imageno.com/thumbs/20150718/2beuexri99km.jpg')");
			break;
		case "Clubs":
			var pic = $("<div>").attr("class","suit-pic")
			$(".suit-pic").css("background-image","url('http://www.imageno.com/thumbs/20150718/dmnyqck6oq6o.jpg')");
			break;
		case "Diamonds":
			var pic = $("<div>").attr("class","suit-pic")
			$(".suit-pic").css("background-image","url('http://www.imageno.com/thumbs/20150718/ts36l7tbj6wi.jpg')");
			break;
	}
	return pic
}*/

/////////////////////////////////////   EVENT LISTENERS AND GAME LOGIC   ///////////////////////////////////
//Event for Deal button
//Clears the screen of previously added divs
for (var i = 0; i <= 11; i++){
	$("#new-card-player").remove();
	$("#new-card-dealer").remove();
	};
//parameters for betting
if(parseInt($(".bet")[0].value)<10){ //Min 10 dollar bet
	$("#player-status")[0].textContent="You need to make a bet of at least $10"
	} else if ((parseInt($(".bet")[0].value))>bankroll){ //Prevent over bet
		$("#player-status")[0].textContent="You don't have that much in your bankroll"
		} else{ //Run program as normal
				//Temporaryily remove bet from bank roll until hand is resolved
				$("#You")[0].textContent = "You - $"+(bankroll -= parseInt($(".bet")[0].value));
				$("#dealer-card").addClass("hidden");
				$(".deal").prop("disabled",true);
				dealCards();
				enableButtons();
				//Display starting hand
				$("#player-status")[0].textContent="You've got the "+playerHand[0][1]+" of "+playerHand[0][0]+" and the "+playerHand[1][1]+" of "+playerHand[1][0]+ " for a total of "+aceCheck(playerHand)+".";
				$("#dealer-status")[0].textContent="Dealer is showing a "+dealerHand[1][1]+" of "+dealerHand[1][0]+".";
				//Blackjack for both
				if (aceCheck(playerHand)===21 && aceCheck(dealerHand)===21){
					twoDisplay("--Dealer reveals "+dealerHand[0][1]+" of "+dealerHand[0][0]+"."+" Blackjack!");
					$("#dealer-card").toggleClass("hidden"); 
					disableButtons();
					moneyManage();
					winner();
					$(".deal").prop("disabled",false)
					//Blackjack for dealer
					} else if (aceCheck(dealerHand)===21){
								twoDisplay("--Dealer reveals "+dealerHand[0][1]+" of "+dealerHand[0][0]+"."+" Blackjack!");
								$("#dealer-card").toggleClass("hidden"); 
								disableButtons();
								moneyManage();
								winner();
								$(".deal").prop("disabled",false)
						//Blackjack for player
						} else if (aceCheck(playerHand)===21){
						bankroll += (parseInt($(".bet")[0].value)/2)
						twoDisplay("--Blackjack!");
						$("#dealer-card").toggleClass("hidden"); 
						disableButtons();
						moneyManage();
						winner();
						$(".deal").prop("disabled",false)}
				
}});

//Event for Hit button
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
		$(".stay").prop("disabled",false)
	}
});
//Event for Stay button
$(".stay").on("click",function(){
doDealerThings();
});

//Event for Double Down button
$(".double").on("click",function(){
	if (playerHand.length === 2){
			$("#You")[0].textContent = "You - $"+(bankroll -= parseInt($(".bet")[0].value));
			doDealerThings();
			if ((playerWin === true)&&(dealerWin ===false)){
				$("#You")[0].textContent = "You - $"+(bankroll += 2*parseInt($(".bet")[0].value));
			} else if ((playerWin === false)&&(dealerWin===false)){
				$("#You")[0].textContent = "You - $"+(bankroll += parseInt($(".bet")[0].value))
	}else if (playerHand.length > 2){
		$(".split").prop("disabled",true)
		$(".double").prop("disabled",true)}
}});

//Event for Split button
// $(".split").on("click",function(){
// 	if (playerHand.length === 2){
// 		playerSplitHand[0]=playerHand[1];
// 		playerHand.pop();
// 	}

// });

//Game Over refresh event
$('#refresh').on('click',function(){
    location.reload(true);
});
//Split option & Double Down option

$('#close').on('click',function(){
	$('#modal').toggle();
	enableButtons();
});





