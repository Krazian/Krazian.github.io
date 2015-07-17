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

$(".deal").on("click",function(){
	dealCards();
	$("#player-status")[0].textContent = "You've got: "+total(playerHand);
	$("#dealer-status")[0].textContent = "Dealer is showing a "+dealerHand[1][1]+" of "+dealerHand[1][0]+".";
	if (blackJackCheck(playerHand)===true){
	alert("You Win!");
	} else if (blackJackCheck(playerHand)===true && blackJackCheck(dealerHand)===true){
		alert("It's a push");
		} else if (blackJackCheck(dealerHand)===true){
			alert("You Lose!");
			}
	$(".hit").prop("disabled",false)
	debugger
	for (var i = 0; i < newCard; i++){
		$("#new-card").remove()
	};
});
debugger
$(".hit").on("click",function(){
	playerHand.push(getACard());
	newCard+=1; //newCard becomes NaN on click
	debugger
	$("#player-status")[0].textContent = "You've got: "+total(playerHand)+".";
	var newCard = $("<div>").attr({"id":"new-card","class":"four column"});
	$("#player").append(newCard);
	if (total(playerHand) > 21){
		$("#player-status")[0].textContent = total(playerHand)+ "! BUSTED!";
		$(".hit").prop("disabled",true);
	}
	else if (total(playerHand) === 21){
		$("#player-status")[0].textContent = total(playerHand)+ "! You Win!";
		$(".hit").prop("disabled",true);
	}
});

$(".stay").on("click")



// //Dealer checks first
// if (total(dealerHand)===21){
// 	//dealerWin === true
// }

//Split option & Double Down option


// //'Hit' button click
//$('').on('click',function(){
// 	playerHand.push(getACard());
// 	if (total(playerHand)<21){
// 		//Display total
// 	}
// 	else if (total(playerHand)>21){
// 		//Player loses
// 	}
// 	else {
// 		//Player at 21, disable button and move to dealer
// 	}
// }

//Dealer reveal on 'stay button click'
//$('').on('click',function){}
// if (total(dealerHand)<=16){
// 	dealerHand.push(getACard());
// }
// else if (total(dealerHand)>=17&&total(dealerHand)<=21){
// 	//Dealer stays
// }
// else {
// 	//Dealer busts
// }
$('#close').on('click',function(){
	$('#modal').toggle();
});






