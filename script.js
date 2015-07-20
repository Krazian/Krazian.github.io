console.log("Doc ready");
////////////////////////////////////        BOARD PRE-SETUP       //////////////////////////////////////////
	$("#player-split").hide();
	$(".player1").hide()
	$(".player2").hide()
	$(".dealer1").hide()
	$(".dealer2").hide()
	$("#dealer-status").hide()
	$("#player-status").hide()

/////////////////////////////////////   FUNCTION AND VARIABLE DECLARATIONS   ///////////////////////////////////
var playerWin = false;
var splitWin = false;
var dealerWin = false;
var insurance = false
var newCard = 0;
var bankroll = 1000;
$("#You")[0].textContent+=bankroll

//Every time dealCards is envoked, used deck is replaced with new deck.
var dealCards = function(){
	deck = [
	[["Spades","King",10,"url('Playing Cards/king_of_spades2.png')"],["Spades","Queen",10,"url('Playing Cards/queen_of_spades2.png')"],["Spades","Jack",10,"url('Playing Cards/jack_of_spades2.png')"],["Spades","10",10,"url('Playing Cards/10_of_spades.png')"],["Spades","9",9,"url('Playing Cards/9_of_spades.png')"],["Spades","8",8,"url('Playing Cards/8_of_spades.png')"],["Spades","7",7,"url('Playing Cards/7_of_spades.png')"],["Spades","6",6,"url('Playing Cards/6_of_spades.png')"],["Spades","5",5,"url('Playing Cards/5_of_spades.png')"],["Spades","4",4,"url('Playing Cards/4_of_spades.png')"],["Spades","3",3,"url('Playing Cards/3_of_spades.png')"],["Spades","2",2,"url('Playing Cards/2_of_spades.png')"],["Spades","Ace",11,"url('Playing Cards/ace_of_spades2.png')"]],
	[["Hearts","King",10,"url('Playing Cards/king_of_hearts2.png')"],["Hearts","Queen",10,"url('Playing Cards/queen_of_hearts2.png')"],["Hearts","Jack",10,"url('Playing Cards/jack_of_hearts2.png')"],["Hearts","10",10,"url('Playing Cards/10_of_hearts.png')"],["Hearts","9",9,"url('Playing Cards/9_of_hearts.png')"],["Hearts","8",8,"url('Playing Cards/8_of_hearts.png')"],["Hearts","7",7,"url('Playing Cards/7_of_hearts.png')"],["Hearts","6",6,"url('Playing Cards/6_of_hearts.png')"],["Hearts","5",5,"url('Playing Cards/5_of_hearts.png')"],["Hearts","4",4,"url('Playing Cards/4_of_hearts.png')"],["Hearts","3",3,"url('Playing Cards/3_of_hearts.png')"],["Hearts","2",2,"url('Playing Cards/2_of_hearts.png')"],["Hearts","Ace",11,"url('Playing Cards/ace_of_hearts.png')"]],
	[["Clubs","King",10,"url('Playing Cards/king_of_clubs2.png')"],["Clubs","Queen",10,"url('Playing Cards/queen_of_clubs2.png')"],["Clubs","Jack",10,"url('Playing Cards/jack_of_clubs2.png')"],["Clubs","10",10,"url('Playing Cards/10_of_clubs.png')"],["Clubs","9",9,"url('Playing Cards/9_of_clubs.png')"],["Clubs","8",8,"url('Playing Cards/8_of_clubs.png')"],["Clubs","7",7,"url('Playing Cards/7_of_clubs.png')"],["Clubs","6",6,"url('Playing Cards/6_of_clubs.png')"],["Clubs","5",5,"url('Playing Cards/5_of_clubs.png')"],["Clubs","4",4,"url('Playing Cards/4_of_clubs.png')"],["Clubs","3",3,"url('Playing Cards/3_of_clubs.png')"],["Clubs","2",2,"url('Playing Cards/2_of_clubs.png')"],["Clubs","Ace",11,"url('Playing Cards/ace_of_clubs.png')"]],
	[["Diamonds","King",10,"url('Playing Cards/king_of_diamonds2.png')"],["Diamonds","Queen",10,"url('Playing Cards/queen_of_diamonds2.png')"],["Diamonds","Jack",10,"url('Playing Cards/jack_of_diamonds2.png')"],["Diamonds","10",10,"url('Playing Cards/10_of_diamonds.png')"],["Diamonds","9",9,"url('Playing Cards/9_of_diamonds.png')"],["Diamonds","8",8,"url('Playing Cards/8_of_diamonds.png')"],["Diamonds","7",7,"url('Playing Cards/7_of_diamonds.png')"],["Diamonds","6",6,"url('Playing Cards/6_of_diamonds.png')"],["Diamonds","5",5,"url('Playing Cards/5_of_diamonds.png')"],["Diamonds","4",4,"url('Playing Cards/4_of_diamonds.png')"],["Diamonds","3",3,"url('Playing Cards/3_of_diamonds.png')"],["Diamonds","2",2,"url('Playing Cards/2_of_diamonds.png')"],["Diamonds","Ace",11,"url('Playing Cards/ace_of_diamonds.png')"]]
	];
	playerHand = [];
	splitHand =[];
	dealerHand = [];
	playerHand.push(getACard());
	dealerHand.push(getACard());
	playerHand.push(getACard());
	dealerHand.push(getACard());
};

//Randomly selects suit and value then removes from master deck
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

//Calculate total
var total = function(hand){
	var total = 0;
	for (var i = 0; i < hand.length; i++){
		total += hand[i][2];
	}
	return total
};

//Used in instances were both displays show same message
var twoDisplay = function(string){
	$("#player-status")[0].textContent+=string;
	$("#dealer-status")[0].textContent+=string;
};

//Calculates and determines win/lose/push AND handles bankroll calculations
var winner = function(){
	//If there is a split hand
	if (splitHand.length !==0){
			if((aceCheck(splitHand)>aceCheck(dealerHand))&&(aceCheck(splitHand)<=21)){
		twoDisplay("--You've got: "+aceCheck(splitHand)+" and the dealer has: "+aceCheck(dealerHand)+". SPLIT WINS!");
		bankroll += 2*parseInt($(".bet")[0].value);
		$("#You")[0].textContent = "You - $"+(bankroll)
		splitWin = true;
		dealerWin = false;
		//Player has lower hand, but dealer busts
	} else if((aceCheck(splitHand)<aceCheck(dealerHand))&&(aceCheck(dealerHand)>21)){
			twoDisplay("--You've got: "+aceCheck(splitHand)+" and the dealer has: "+aceCheck(dealerHand)+". SPLIT WINS!");
			bankroll += 2*parseInt($(".bet")[0].value);
			$("#You")[0].textContent = "You - $"+(bankroll)
			splitWin = true;
			dealerWin = false;
		//No bust and dealer has higher hand
		} else if ((aceCheck(dealerHand)>aceCheck(splitHand))&&(aceCheck(dealerHand)<=21)){
				twoDisplay("--You've got: "+aceCheck(splitHand)+" and the dealer has: "+aceCheck(dealerHand)+". Split loses...");
				dealerWin = true;
				splitWin = false;
			//Dealer has lower hand, but player busts
			} else if ((aceCheck(dealerHand)<aceCheck(splitHand))&&(aceCheck(splitHand)>21)){
					twoDisplay("--You've got: "+aceCheck(splitHand)+" and the dealer has: "+aceCheck(dealerHand)+". Split loses...");
					dealerWin = true;
					splitWin = false;
				//No busts, both players value equal
				} else if (aceCheck(splitHand)===aceCheck(dealerHand)){
						twoDisplay("--You've got: "+aceCheck(splitHand)+" and the dealer has: "+aceCheck(dealerHand)+". Split is a push.");
						bankroll += parseInt($(".bet")[0].value);
						$("#You")[0].textContent = "You - $"+(bankroll)
						dealerWin = false;
						splitWin = false;
						}}
	//If no split, lines 74 - 104 doesn't run and goes straight to here
	//No bust and player has higher hand
	if((aceCheck(playerHand)>aceCheck(dealerHand))&&(aceCheck(playerHand)<=21)){
		twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". YOU WIN!");
		bankroll += 2*parseInt($(".bet")[0].value);
		$("#You")[0].textContent = "You - $"+(bankroll)
		playerWin = true;
		dealerWin = false;
		//Player has lower hand, but dealer busts
	} else if((aceCheck(playerHand)<aceCheck(dealerHand))&&(aceCheck(dealerHand)>21)){
			twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". YOU WIN!");
			bankroll += 2*parseInt($(".bet")[0].value);
			$("#You")[0].textContent = "You - $"+(bankroll)
			playerWin = true;
			dealerWin = false;
		//No bust and dealer has higher hand
		} else if ((aceCheck(dealerHand)>aceCheck(playerHand))&&(aceCheck(dealerHand)<=21)){
				twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". You lose...");
				dealerWin = true;
				playerWin = false;
			//Dealer has lower hand, but player busts
			} else if ((aceCheck(dealerHand)<aceCheck(playerHand))&&(aceCheck(playerHand)>21)){
					twoDisplay("--You've got: "+aceCheck(playerHand)+" and the dealer has: "+aceCheck(dealerHand)+". You lose...");
					dealerWin = true;
					playerWin = false;
				//No busts, both players value equal
				} else if (aceCheck(playerHand)===aceCheck(dealerHand)){
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
	$(".insurance").prop("disabled",true);
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
	grandTotal = total(hand);
	switch (aceSearch(hand)){
	case 1:
		if (total(hand)>21){
			return grandTotal -= 10;
			}else{
			return grandTotal;}
		break;
	case 2:
		if (total(hand)>=32){
			return grandTotal -= 20;
			}else {
			return grandTotal -= 10;}
		break;
	case 3:
		if (total(Hand)>=42){
			return grandTotal -= 30;
			}else {
			return grandTotal -= 20;}
		break;
	case 4:
		if (total(hand)>=52){
			return grandTotal -= 40;
			}else {
			return grandTotal -= 30;}
		break;
	case 0:
		return grandTotal;
		break;	
	}
}
//Check for amount, if unable to meet minimum bet, GAME OVER
var moneyManage = function(){
	$("#You")[0].textContent="You - $" + bankroll
	if (bankroll < 10){
		$('#modal').toggle();
		//Creates blank space in modal
		$(".modal-content")[0].textContent="";
		$('#close').remove();
		//Creates a 'try again' button that refreshes the page
		var refresh = $("<button>").attr("id","refresh")
		$(".modal-body").append(refresh);
		$("#refresh").text("Click to Try Again!");
		$('#refresh').on('click',function(){
    location.reload(true);
		});
		$(".modal-content").addClass("game-over")
		$(".modal-content")[0].textContent="You don't have enough money to play.. GAME OVER!";
	}
}

var doDealerThings = function(){
	disableButtons();
	$(".deal").prop("disabled",false)
	$("#dealer-card").toggleClass("hidden");
	$(".dealer1").css("background-image",dealerHand[0][3]);
	 //Show face down card
	$("#dealer-status")[0].textContent+="--Dealer reveals a "+dealerHand[0][1]+" of "+dealerHand[0][0]+". for a total of: "+aceCheck(dealerHand)+".";
	//Dealer must hit on 16 or below or 'soft' 17
	if((aceCheck(dealerHand)<=16)||((aceCheck(dealerHand)===17)&&(dealerHand[0][1]==="Ace"||dealerHand[1][1]==="Ace"))){
		do {
			dealerHand.push(getACard());
			newCard+=1;
			var nextCard = $("<div>").attr({"id":"new-card-dealer","class":"four columns animated fadeInDown"});
			nextCard.css("background-image",dealerHand[dealerHand.length-1][3]);
			$("#dealer").append(nextCard);
			$("#dealer-status")[0].textContent+="--Dealer drew the " +dealerHand[dealerHand.length-1][1]+" of "+dealerHand[dealerHand.length-1][0]+". Dealer has: "+aceCheck(dealerHand)+".";
			//If hand is between 17 and 21, dealer stops drawing cards and evaluates
			if (aceCheck(dealerHand)>=17&&aceCheck(dealerHand)<=21){
				winner();
				moneyManage();
				$(".bet").prop("disabled",false);
				$(".deal").prop("disabled",false);
				//Dealer busts over 21, evaluate
				} else if (aceCheck(dealerHand)>21){
					twoDisplay("--Dealer BUSTS!");
					winner();
					$(".bet").prop("disabled",false);
					$(".deal").prop("disabled",false);
				//If still under 16, draw again	
				} else{
					$(".bet").prop("disabled",false);
					$(".deal").prop("disabled",false);}
				}
			//Repeat 'do' and if/else if while hand is less than 17
			while (aceCheck(dealerHand)<17);
		//If starting hand over 17, do nothing and evaluate
		}else if (aceCheck(dealerHand)>16&&aceCheck(dealerHand)<=21){
				winner();
				moneyManage();
				$(".bet").prop("disabled",false);
				$(".deal").prop("disabled",false);
			}			
};
/////////////////////////////////////   EVENT LISTENERS AND GAME LOGIC   ///////////////////////////////////
//Event for Deal button
$(".deal").on("click",function(){
	$("#player-split").hide();
	$(".player1").hide();
	$(".player2").hide();
	$(".dealer1").hide();
	$(".dealer2").hide();
//Clears the screen of previously added divs
for (var i = 0; i <= 11; i++){
	$("#new-card-player").remove();
	$("#new-card-dealer").remove();
	$("#new-split-card").remove();
	};
//Parameters for betting
//Checks for letters in the input field
var isNum = function(){
	var num = ["1","2","3","4","5","6","7","8","9","0"];
	for (var x = 0;x<($(".bet").val().length);x++){
		if (num.indexOf($(".bet").val()[x])===-1){
			return false}}};
//Mandatory bet of at least 10
if((parseInt($(".bet")[0].value)<10)||($(".bet")[0].value.length===0)||(isNum()===false)){ 
	$("#player-status")[0].textContent="You need to make a bet of at least $10"
 } else if ((parseInt($(".bet")[0].value))>bankroll){ //Prevent over bet
		 $("#player-status")[0].textContent="You don't have that much in your bankroll"
		//Run program as normal
		} else{ 
			//Simulate dealing cards
			$(".player1").show();
			$(".player2").show();
			$(".dealer1").show();
			$(".dealer2").show();
			$("#dealer-status").show();
			$("#player-status").show();
			//Temporaryily remove bet from bank roll until hand is resolved
			$("#You")[0].textContent = "You - $"+(bankroll -= parseInt($(".bet")[0].value));
			//Hide dealers hole card
			$("#dealer-card").toggleClass("hidden")
			$(".deal").prop("disabled",true);
			$(".bet").prop("disabled",true);
			dealCards();
			enableButtons();
			//Display starting hand
			$("#player-status")[0].textContent="You've got the "+playerHand[0][1]+" of "+playerHand[0][0]+" and the "+playerHand[1][1]+" of "+playerHand[1][0]+ " for a total of "+aceCheck(playerHand)+".";
			$("#dealer-status")[0].textContent="Dealer is showing a "+dealerHand[1][1]+" of "+dealerHand[1][0]+".";
			//Give cards images
			$(".player1").css("background-image",playerHand[0][3]);
			$(".player2").css("background-image",playerHand[1][3]);
			$(".dealer2").css("background-image",dealerHand[1][3]);
			//Blackjack for both
			if (aceCheck(playerHand)===21 && aceCheck(dealerHand)===21){
				twoDisplay("--Dealer reveals "+dealerHand[0][1]+" of "+dealerHand[0][0]+"."+" Blackjack!");
				$("#dealer-card").toggleClass("hidden");
				$(".dealer1").css("background-image",dealerHand[0][3]);
				disableButtons();
				moneyManage();
				winner();
				$(".bet").prop("disabled",false);
				$(".deal").prop("disabled",false);
				//Blackjack for dealer
				} else if (aceCheck(dealerHand)===21){
							twoDisplay("--Dealer reveals "+dealerHand[0][1]+" of "+dealerHand[0][0]+"."+" Blackjack!");
							$("#dealer-card").toggleClass("hidden");
							$(".dealer1").css("background-image",dealerHand[0][3]);
							disableButtons();
							moneyManage();
							winner();
							$(".bet").prop("disabled",false);
							$(".deal").prop("disabled",false);
					//Blackjack for player
					} else if (aceCheck(playerHand)===21){
							bankroll += (parseInt($(".bet")[0].value)/2)
							twoDisplay("--Blackjack!");
							$("#dealer-card").toggleClass("hidden"); 
							$(".dealer1").css("background-image",dealerHand[0][3]);
							disableButtons();
							moneyManage();
							winner();
							$(".bet").prop("disabled",false);
							$(".deal").prop("disabled",false);}
							}});
//Event for Hit button
$(".hit").on("click",function(){
	//In the case of a split possibility
	if (splitHand.length !== 0&&splitDone===false){
		splitHand.push(getACard());
		newCard+=1;
		$("#player-status")[0].textContent+="--You drew the " +splitHand[splitHand.length-1][1]+" of "+splitHand[splitHand.length-1][0]+". You've got a "+aceCheck(splitHand)+".";
		var nextCard = $("<div>").attr({"id":"new-split-card","class":"four columns animated fadeInUp"});
		nextCard.css("background-image",splitHand[splitHand.length-1][3]);
		$("#player-split").append(nextCard);
		if (aceCheck(splitHand) > 21){
			$("#player-status")[0].textContent+= "--BUSTED!";
			splitDone = true;
		  } else if (aceCheck(splitHand) === 21){
					$("#player-status")[0].textContent+="!";
					$(".stay").prop("disabled",false)
					splitDone = true}
		
		//Normal gameplay code
		} else{
				playerHand.push(getACard());
				newCard+=1;
				$("#player-status")[0].textContent+="--You drew the " +playerHand[playerHand.length-1][1]+" of "+playerHand[playerHand.length-1][0]+". You've got a "+aceCheck(playerHand)+".";
				var nextCard = $("<div>").attr({"id":"new-card-player","class":"four columns animated fadeInUp"});
				nextCard.css("background-image",playerHand[playerHand.length-1][3]);
				$("#player").append(nextCard);
				if (aceCheck(playerHand) > 21){
					$("#player-status")[0].textContent+= "--BUSTED!";
					$(".dealer1").css("background-image",dealerHand[0][3]);
					$("#dealer-card").toggleClass("hidden");
					$("#dealer-status")[0].textContent+="--Dealer reveals a "+dealerHand[0][1]+" of "+dealerHand[0][0]+".";
					disableButtons();
					moneyManage();
					$(".bet").prop("disabled",false);
					$(".deal").prop("disabled",false);
				}
				else if (aceCheck(playerHand) === 21){
					$("#player-status")[0].textContent+="!";
					disableButtons();
					$(".stay").prop("disabled",false)
					doDealerThings();
				}
			}});

//Event for Stay button
$(".stay").on("click",function(){
	if (splitHand.length === 0){
		$(".dealer1").css("background-image",dealerHand[0][3]);
		doDealerThings();
		} else if (splitHand.length !==0 && splitDone===false){
				splitDone=true;
				$("#player-status")[0].textContent+= "--Split total is now" + aceCheck(splitHand)+".";
				} else if (splitHand.length !==0 && splitDone===true){
					$(".dealer1").css("background-image",dealerHand[0][3]);
					doDealerThings();
					}});

//Event for Double Down button
$(".double").on("click",function(){
	if (playerHand.length === 2&&bankroll>=parseInt($(".bet")[0].value)){
			$(".dealer1").css("background-image",dealerHand[0][3]);
			$("#You")[0].textContent = "You - $"+(bankroll -= parseInt($(".bet")[0].value));
			playerHand.push(getACard());
			newCard+=1;
			$("#player-status")[0].textContent+="--You drew the " +playerHand[playerHand.length-1][1]+" of "+playerHand[playerHand.length-1][0]+". You've got a "+aceCheck(playerHand)+".";
			var nextCard = $("<div>").attr({"id":"new-card-player","class":"four columns animated fadeInUp"});
			nextCard.css("background-image",playerHand[playerHand.length-1][3]);
			$("#player").append(nextCard);
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
$(".split").on("click",function(){
	//If both cards are the same and there are enough funds
	if ((playerHand.length === 2&&playerHand[0][1]===playerHand[1][1])&&(bankroll>=parseInt($(".bet")[0].value))){
		$("#You")[0].textContent = "You - $"+(bankroll -= parseInt($(".bet")[0].value))
		splitDone = false;
		$("#player-split").show();
		splitHand[0]=playerHand[1];
		splitHand.push(getACard())
		$(".player1split").css("background-image",splitHand[0][3]);
		$("#player-split").append($(".player1split"))
		$(".player2split").css("background-image",splitHand[1][3]);
		$("#player-split").append($(".player2split"))
		playerHand.pop();
		playerHand.push(getACard());
		$(".player2").css("background-image",playerHand[1][3])
		$("#player-status")[0].textContent="You have the " +splitHand[0][1]+" of "+splitHand[0][0]+" and the "+splitHand[1][1]+" of "+splitHand[1][0]+" in one hand with a total of "+aceCheck(splitHand)+" and another hand with the " +playerHand[0][1]+" of "+playerHand[0][0]+" and the "+playerHand[1][1]+" of "+playerHand[1][0]+" for a total of "+aceCheck(playerHand)+".";
		}});

$('#close').on('click',function(){
	$('#modal').toggle();
	enableButtons();
});




