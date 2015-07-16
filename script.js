console.log("Doc ready");

var playerWin = false;
var dealerWin = false;

var deck = [
[["Spades","K",10],["Spades","Q",10],["Spades","J",10],["Spades","10",10],["Spades","9",9],["Spades","8",8],["Spades","7",7],["Spades","6",6],["Spades","5",5],["Spades","4",4],["Spades","3",3],["Spades","2",2],["Spades","A",11]],
[["Hearts","K",10],["Hearts","Q",10],["Hearts","J",10],["Hearts","10",10],["Hearts","9",9],["Hearts","8",8],["Hearts","7",7],["Hearts","6",6],["Hearts","5",5],["Hearts","4",4],["Hearts","3",3],["Hearts","2",2],["Hearts","A",11]],
[["Clubs","K",10],["Clubs","Q",10],["Clubs","J",10],["Clubs","10",10],["Clubs","9",9],["Clubs","8",8],["Clubs","7",7],["Clubs","6",6],["Clubs","5",5],["Clubs","4",4],["Clubs","3",3],["Clubs","2",2],["Clubs","A",11]],
[["Diamonds","K",10],["Diamonds","Q",10],["Diamonds","J",10],["Diamonds","10",10],["Diamonds","9",9],["Diamonds","8",8],["Diamonds","7",7],["Diamonds","6",6],["Diamonds","5",5],["Diamonds","4",4],["Diamonds","3",3],["Diamonds","2",2],["Diamonds","A",11]]] 


var getACard = function(){
	var randomSuit=function(){
		var chooseSuit = Math.floor(Math.random() * deck.length);
		return chooseSuit
	}
		var suit = randomSuit();

	var randomCard = function(){
		var chooseCard = Math.floor(Math.random() * deck[suit].length);
		return chooseCard
	}
	var card = randomCard();
	var fullCard = deck[suit][card]
	deck[suit].splice(card,1) // removes card from the deck
	return fullCard
}

var playerHand = [];
var dealerHand = [];
playerHand.push(getACard());
dealerHand.push(getACard());
playerHand.push(getACard());
dealerHand.push(getACard());

var total = function(hand){
	var total = 0;
	for (var i = 0; i < hand.length; i++){
		total += hand[i][2]
	}
	return total
};

//Player black
if (total(playerHand)===21){
	//playerWin === true
} 


//Dealer checks first
if (total(dealerHand)===21){
	//dealerWin === true
}

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
if (total(dealerHand)<=16){
	dealerHand.push(getACard());
}
else if (total(dealerHand)>=17&&total(dealerHand)<=21){
	//Dealer stays
}
else {
	//Dealer busts
}






