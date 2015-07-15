console.log("Doc ready");

var suit=function(){
	return Math.floor(Math.random() * 4)+1;
}

var card = function(){
	return Math.floor(Math.random() * 13)+1;
}

var deck = {
	1:{"1":11,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":10,"12":10,"13":10},
	2:{"1":11,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":10,"12":10,"13":10},
	3:{"1":11,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":10,"12":10,"13":10},
	4:{"1":11,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":10,"12":10,"13":10}
};
var dealt=[]
var getSuit = function(number){
	var drawCard = [];
	var cardSuit = "";
	var cardValue = deck[number][card()];
 switch (number){
 	case 1:
		cardSuit = "Spades";
 		console.log("Spades")
 		break;
  case 2:
		cardSuit = "Hearts";
 		console.log("Hearts")
 		break;
 	case 3:
		cardSuit = "Clubs";
 		console.log("Clubs")
 		break;
 	case 4:
		cardSuit = "Diamonds";
 		console.log("Diamonds")
 		break;
 	}
//need way to not allow dealt cards
drawCard.push(cardSuit);
drawCard.push(cardValue);
return drawCard
 };

var firstCard = getSuit(suit())
var secondCard = getSuit(suit())
dealt.push(firstCard)
dealt.push(secondCard)
 


