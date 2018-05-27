function Logic() {
    this.isMoveValid = function(topCard, playCard){
        if (topCard.color == playCard.color){
            return true;
        }else if (topCard.name == playCard.name){
            return true
        } else if (topCard.name == 'changecolor'  ){
            var pileColor = document.querySelector("#pileOfCards").style.background;
            if (pileColor == playCard.color){
                return true;
            }

        }else if (playCard.name =='changecolor' || (playCard.name == 'taki' && playCard.color == 'colorul')){
            return true;
        } else {
            return false;
        }
    }
    this.canPlayerPlay = function(topCard, cards){
        var result = false;
        for (var i = 0; i < cards.length; i++) {
            result = this.isMoveValid(topCard, cards[i])
            if (result == true){
                break;
            }
        }
        return result;
    }
    this.canPlayerPlayTaki = function(cards, takiColor){
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].color == takiColor){
                return true;
            }
        }
        return false;
    }
    this.cardPlayed = function(card){ 
        //this function is binded by the gameManger on init.
        switch (card.name){
            case '2plus':
                if (this.cardsToTake == 1)
                    this.cardsToTake++;
                else
                    this.cardsToTake += 2;
                this.needReset = false;
                break;
            case 'stop':
                if (this.turnsToMove == 1){ // in Multiplayer (this.turnsToMove != 0)
                    this.turnsToMove++;
                }
                this.needReset = false;

                break;
            case 'plus':
                this.turnsToMove = 0;
                this.needReset = false;
                break;
            case 'changecolor':
				this.gamePaused = true;
                this.UI.popUpShow(this.colorButtonClick.bind(this));
                break;
            case 'taki':
                if (card.color == 'colorful'){
                    var topCard = this.pileOfCards.pop();
                    card.color = topCard.color;
                    this.pileOfCards.push(topCard);
                }
                this.setTakiMode(true, card.color);
                break;
            default:
                if (!this.takiMode)
                    this.needReset = true;
                break;
        }
    }
}
