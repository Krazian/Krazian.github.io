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
var dealt=[["Joker",0]];
var getCard = function(number){
	var drawCard = [];
	var cardSuit = "";
	var cardValue = deck[number][card()];
	var cardFace = card();

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
 	};
 		switch (cardFace){
		case 11:
			cardFace = "J"
			break;
		case 12:
			cardFace = "Q"
			break;
		case 13:
			cardFace = "K"
			break;
		case 1:
			cardFace = "A"
			break;
		default:
			break;
	};
 //Only need to push one if all interation = true
 //Solution? create function, if return true, push?	
 // for (var i=0; i<dealt.length; i++){
 // 	if (cardSuit!==dealt[i][0]&&cardValue!==dealt[i][1]){
 // 		drawCard.push(cardSuit);
	// 	drawCard.push(cardValue);
 // 	} else {
 // 		console.log("Dealt alrdy")
 // 	}
 // }
return drawCard
 };

var firstCard = getCard(suit())
var secondCard = getCard(suit())
dealt.push(firstCard)
dealt.push(secondCard)
 


