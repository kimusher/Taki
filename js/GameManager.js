function GameManger(ui){
    var numOfPlayers = 1;
    var numOfBots = 1;
    var numOfPlayerCards = 8;
    var startTurnTime;
    var gameRules;
    this.cardsToTake = 1;
    this.turnsToMove = 1;
    this.takiMode = false;
    this.activeFilter = false;
    this.needReset = false;
    this.gamePaused = false;
    this.cardColorFilter;
    this.Players = [];
    this.pileOfCards = [];
    this.currentPlayerIDTurn = 1;
    this.deck = new Deck()
    this.logic = new Logic();
    this.UI = ui;
    this.deck.createDeck();
    this.deck.shuffle();
    this.startGame = function (){
        this.drawFirstCard();
    }

    this.setPlayersId = function (){
        for (var i = 0; i < numOfPlayers; i++){
            this.Players.push( new Player(i+1) );
        }
    }
	this.checkIfGameWasPaused = function(event){
        if (this.gamePaused){
            return true;
        } else if (event){
            if (event.currentTarget){
                if (event.currentTarget.id == 'colorPopup'){
                    return true;
                }
            } else{
                return false;
            }
        } else {
            return false;
        }
    }
    this.onTakeCard = function(event){
        if (this.checkIfGameWasPaused(event)){
            return;
        }
        playerId = this.currentPlayerIDTurn;
        if(this.isPlayerTurn(playerId)){
            var topCard = this.pileOfCards.pop();
            this.pileOfCards.push(topCard);
            var playerCards = this.Players[this.currentPlayerIDTurn-1].getAllCards();
            if (!this.logic.canPlayerPlay(topCard, playerCards)){
                //loop for taking cards (2plus)
                var card = this.deck.getCard();
                this.Players[this.currentPlayerIDTurn-1].addCard(card);
                this.UI.addCardToPlayer(this.currentPlayerIDTurn, card, this.onClickCard.bind(this));
                this.needReset = true;
                if (!(this.Players[playerId-1] instanceof Computer)){
                    this.switchTurns();
                }
            } else {
                alert("You Can Play !");
                //TODO :: tell player he can play !
            }
        } else {
            alert("Not your turn...");
        }
    }

    this.onClickCard = function(event) {
        var color = event.currentTarget.getAttribute("data-cardColor");
        var name = event.currentTarget.getAttribute("data-cardName");
        var playerId = event.currentTarget.getAttribute("data-ownerID");
        var card = this.Players[playerId-1].getCardFromPackByNameAndColor(name, color);
        var cards;

        if(this.isPlayerTurn(playerId)){
            var topCard = this.pileOfCards.pop();
            this.pileOfCards.push(topCard);
            if (this.logic.isMoveValid(topCard, card)) {
                gameRules(card);
                if (card.name == 'changecolor'){
                    return; //once color will be picked game will continue
                }
                this.moveCardFromPlayerToPile(playerId, card);
                if (this.takiMode){
                    cards = this.Players[playerId-1].getAllCards();
                    topCard = this.pileOfCards.pop();
                    this.pileOfCards.push(topCard);
                    if (this.logic.canPlayerPlayTaki(cards,topCard.color)){
                        return; //let player continue taki...
                    } else {
                        this.setTakiMode(false);
                        this.UI.hideEndTurnButton();
                    }
                }
                this.switchTurns();
            } else {
                alert("Cant use that card...");
                //TODO :: show that you cant use that card.
            }
        } else {
            alert("Not your turn...");
        }
    }
        
    
    /*
    this.onDragCard = function (element) {
        
       // element.dataTransfer.setData("id", element.target.id);
        //element.dataTransfer.setData("ownerID", element.target.getAttribute('data-ownerID'));
    }
    this.onDropCard = function (element) {
        element.preventDefault();
        var cardId = element.dataTransfer.getData("id");
        var playerId = element.dataTransfer.getData("ownerID");
        
        //var color = event.currentTarget.id.slice(0, -1);
        //var name = event.currentTarget.id.slice(-1);
       // var playerId = event.currentTarget.getAttribute("data-ownerID");
        if (playerId == this.currentPlayerIDTurn) {
            var div = this.UI.getCardFromPlayer(cardId, playerId);
            this.moveCardToPile(div);
            this.endTurn();
        }
    }
    this.allowDrop = function (element) {
        element.preventDefault();
    }*/
    this.setBotsPlayers = function (){
        for (var i = numOfPlayers; i < numOfPlayers+numOfBots; i++){
            this.Players.push( new Computer(i+1) );
        }
    }

    this.dealFirstCards = function(){
       
        for (var i = 0; i < numOfPlayers+numOfBots; i++){
            var cards = this.deck.getStartingCards(numOfPlayerCards);
            var player = this.Players[i];
            for (var j = 0; j < numOfPlayerCards; j++){
                player.addCard(cards[j]);
                this.UI.addCardToPlayer(i + 1, cards[j], this.onClickCard.bind(this));
            }
        }
       
    }

    this.playerFinishedTurn = function(){
        this.Players[this.currentPlayerIDTurn-1].updateStats(Date.now() - startTurnTime)
        if (this.Players[this.currentPlayerIDTurn-1].isLastCard())
            this.Players[this.currentPlayerIDTurn-1].increaseLastCardCounter();
    }

    this.drawFirstCard = function(){
        card = this.deck.getCard();
        card.isActive = false;
        while (card.color == 'colorful'){ // we dont start with a colorful card
            this.deck.returnCard(card);
            this.deck.shuffle();
            card = this.deck.getCard();
        } 
        this.pileOfCards.push(card);
        this.UI.addCardToPile(card);
        startTurnTime = Date.now();
    }

    this.moveCardFromPlayerToPile = function(playerID, card){
        this.UI.addCardToPile(card, playerID);
        if(this.activeFilter)
        {
            this.UI.filtterTopCard(this.cardColorFilter);
            this.activeFilter=false;
        }
        if (!(this.Players[playerID-1] instanceof Computer)){ //computer remove cards on its own
            this.Players[this.currentPlayerIDTurn-1].removeCard(card);
        }
        this.pileOfCards.push(card);
    }

    this.isPlayerTurn = function(playerID){
        return this.currentPlayerIDTurn == playerID;
    }
    this.newTurn = function(){
        var card = this.pileOfCards.pop();
        card.isActive = false;
        this.pileOfCards.push(card);
        this.playerFinishedTurn();
        //this.setTakiMode(false);
        this.startTurnTime = Date.now();
        this.UI.updateStats(this.Players[0].getStat());
    }
    this.resetTurn = function(){
        this.cardsToTake = 1;
        this.turnsToMove = 1;
    }
    this.switchTurns = function(){
        var winnerId = this.checkIfAnyWinners();
        if (winnerId != 0){ 
            this.UI.updateScoreBoard(this.Players[0].getStat(),this.Players[1].getStat());
            this.UI.showScoreBoard(winnerId);
            this.gamePaused = true;
            return;
        } else {
            this.newTurn();
            if (this.needReset){
                this.resetTurn();
            }
            this.currentPlayerIDTurn = ((this.currentPlayerIDTurn - 1 + this.turnsToMove) % (numOfPlayers+numOfBots)) + 1;
            var playerID = this.currentPlayerIDTurn;
            this.UI.currentPlayerIDTurn = playerID;
            this.UI.changePlayerImg(playerID);
            if (this.Players[playerID-1] instanceof Computer){
                setTimeout(this.makeBotPlay.bind(this), 850);
            }
        }
    }
    this.makeBotPlay = function(){
        var card = this.pileOfCards.pop();
        var color = card.color;
        this.pileOfCards.push(card);
        var resultArray = this.Players[this.currentPlayerIDTurn-1].play(card);
        if (resultArray == 'takeCard'){
            this.onTakeCard(this.currentPlayerIDTurn);
        } else {
            //process cards into pile
            if (Array.isArray(resultArray)){
                card = resultArray.pop()
                if (card.name == 'changecolor'){
                    this.moveCardFromPlayerToPile(this.currentPlayerIDTurn, card);
                    card = this.pileOfCards.pop();
                    card.color = resultArray.pop();
                    this.pileOfCards.push(card);
                    this.UI.filtterTopCard(card.color);
                    //TODO :: FILTER CARD IN COLOR
                } else {
                    //card is taki
                    this.moveCardFromPlayerToPile(this.currentPlayerIDTurn, card);
                    for (var i = 0; i < resultArray.length; i++){
                        card = resultArray.pop();
                        this.moveCardFromPlayerToPile(this.currentPlayerIDTurn, card);
                    }
                    //make last card count
                    card = this.pileOfCards.pop();
                    if (card.name != 'taki'){
                        gameRules(card);
                    }
                    this.pileOfCards.push(card);
                }
            } else if (resultArray instanceof Card){
                //only one card
                card = resultArray;
                gameRules(card);
                this.moveCardFromPlayerToPile(this.currentPlayerIDTurn, card);
            }
        }
        this.switchTurns();
    }
    this.checkIfAnyWinners = function(){
        for (var i = 0;i < this.Players.length; i++){
            if (this.Players[i].isFinishedCards()){
                return i+1;
            }
        }
        return 0;
    }
    this.setDeckCallBack = function(){
        this.deck.setCardsRetrive(this.emptyPileResetAndReturnToDeck.bind(this));
    }
    this.emptyPileResetAndReturnToDeck = function(){
        var newPile = [];
        var card = this.pileOfCards.pop();
        newPile.push(card);
        var cards = this.pileOfCards;
        this.pileOfCards = newPile;
        this.resetPileCards(cards);
        this.UI.emptyPile();
        return cards;
    }
    this.resetPileCards = function(cards){
        //var numOfSuperTakis = 2
        for (var i = 0; i < cards.length; i++){
            if (cards[i].name == 'changecolor'){
                cards[i].color = 'colorful';
            }
			cards[i].isActive = true;
            /*if (cards[i].name == 'taki' && numOfSuperTakis > 0){
                cards[i].color == 'colorful';
                numOfSuperTakis--;
            }*/
        }
    }
    this.setGameRules = function(){
        gameRules = this.logic.cardPlayed.bind(this)
    }
    this.setTakiMode = function(value, color){
        this.takiMode = value;
        this.UI.setTakiMode(this.endTurnButtonClick.bind(this),value, color, );
        
    }
    this.colorButtonClick = function (event) {
        var color = event.currentTarget.id.slice(0,-7);
        var card = this.Players[this.currentPlayerIDTurn-1].getCardFromPackByNameAndColor('changecolor','colorful');
        card.color = color;
        this.cardColorFilter = color;
        this.activeFilter=true;
        this.UI.hideColorButton();
        this.moveCardFromPlayerToPile(this.currentPlayerIDTurn, card);
        this.gamePaused = false;
        this.switchTurns();
    }
    this.endTurnButtonClick= function(){
        this.setTakiMode(false);
        this.UI.hideEndTurnButton();
        this.switchTurns();
    },
    this.parent_disable = function() {
        if (popupWindow && popupWindow.closed)
            popupWindow.focus();
    }
}

GameManger.prototype.init = function(){
    this.UI.currentPlayerIDTurn = this.currentPlayerIDTurn;
   // this.UI.endTurn = this.resetTurn.bind(this);
    this.setDeckCallBack();
    this.setGameRules();
    this.setPlayersId();
    this.setBotsPlayers();
    this.dealFirstCards();
	this.UI.resetTimer();
    this.UI.startTimer();
    this.UI.hideEndTurnButton();
    this.UI.setUIDeck(this.onTakeCard.bind(this));
    this.UI.hideScoreBoard();
    //this.UI.setPileDrop(this.onDropCard.bind(this), this.allowDrop.bind(this));
}