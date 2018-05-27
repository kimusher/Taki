function UI() {
    this.endTurn;
    //document.getElementById('deck').addEventListener('click',this.takeCa());
    this.init = function () {

    },
        //display update

        this.createStartButton = function () {
         
        },
        this.popUpShow = function(callback) {
            document.getElementById('popupContainer').style.display = 'block';
            document.getElementById('colorPopup').style.display = "flex";
            document.getElementById('red-button').addEventListener('click', callback);
            document.getElementById('blue-button').addEventListener('click', callback);
            document.getElementById('yellow-button').addEventListener('click', callback);
            document.getElementById('green-button').addEventListener('click', callback);
        },
        this.hideColorButton = function() {
            document.getElementById('popupContainer').style.display = 'none';
            document.getElementById('colorPopup').style.display = "none";
        },
        this.showEndTurnButton = function(callback){
            document.getElementById('endTurn-button').style.display = "flex";
            document.getElementById('endTurn-button').addEventListener('click',callback);
        },
        this.hideEndTurnButton = function () {
            document.getElementById('endTurn-button').style.display = "none";

        },
        this.showScoreBoard = function (winnerId) {
        var img = document.getElementById('scorePopupImg');
            document.getElementById('popupContainer').style.display = 'block';
        img.src = "images/winner.svg";
            var scoreBoard = document.getElementById('scorePopup');
            if(winnerId != 1){
                document.getElementById('winning-popup-text').innerHTML="YOU LOST!"
                img.src = "images/loser.svg";
                document.querySelector(".grid-container").style.backgroundColor = 'red';
            }
            scoreBoard.style.display = "inline-block";
            //document.getElementById('scorePopup').addEventListener('click', callback);
        },
        this.updateScoreBoard = function (statP1 , statP2) {
            var scoreBoard = document.getElementById('scorePopup');
            if (isWinner == 0) {
                document.getElementById('winning-popup-text').innerHTML = "YOU LOST!"
                scoreBoard.style.backgroundColor = red;
            }
            scoreBoard.style.display = "inline-block";
            //document.getElementById('scorePopup').addEventListener('click', callback);
        },
        this.hideScoreBoard = function () {
        document.getElementById('scorePopup').style.display = "none";

        },
        this.setUIDeck = function(callback){
            var deck = document.getElementById('colorPopup')
            deck.addEventListener('click',callback);
        },
        this.startTimer = function () {
            startTimer();
        },
        this.resetTimer = function () {
        second = 0;
        minute = 0;
        hour = 0;
        var timer = document.querySelector("#timer");
        timer.innerHTML = "0 mins 0 secs";
        clearInterval(interval);
        },
        this.filtterTopCard = function (color) {
        var cardLi = document.getElementById("pileOfCards").querySelector(":first-child").lastChild;
        cardLi.style.border = "4px solid transparent";
        cardLi.style.borderColor =color;
    
        },
        this.addCard = function (playerId, card, callBack) {
        },
        this.addCardToPlayer = function (playerId, card, callBack) {
            var targetId = document.querySelector('#playerContainer'+playerId + " .players-cards");
            var li = this.createCardLIElem(playerId, card, callBack);
            targetId.appendChild(li);
        },
        this.addCardToPile = function(card, playerId){
            var div = document.createElement("div");
            //using the old li
            if (playerId != undefined){ 
                var color = (card.name == 'changecolor') ? 'colorful':card.color;
                div = this.getCardFromPlayer(color+card.name, playerId);
            }
            //creating a new div
            else { 
                div.className = "card";
                div.setAttribute("data-ownerID",playerId);
                var url = "url(images/cards/"+card.name+"_"+card.color+".png)";
                div.style.backgroundImage = url;
                div.setAttribute("id",card.color+card.name);
            }
            this.moveCardToPile(div);
        },
        this.emptyPile = function(){
            var targetId = document.querySelector("#pileOfCards .pile-cards");
            var topCard = targetId.lastChild;
            while (targetId.firstChild) {
                targetId.removeChild(targetId.firstChild);
            }
            targetId.appendChild(topCard);
        },
        this.moveCardToPile = function(cardDiv){
            var targetId = document.querySelector("#pileOfCards .pile-cards");
            var rotateNum = Math.floor(Math.random() * Math.floor(360));
            var randomLeft = Math.floor(Math.random() * Math.floor(25)) + 20;
            var randomTop = Math.floor(Math.random() * Math.floor(25)) + 2;
            cardDiv.style.transform = 'rotate('+rotateNum+'deg)';
            cardDiv.style.position = 'absolute';
            cardDiv.style.top = randomTop+'px';
            cardDiv.style.left = randomLeft+'%';
            targetId.appendChild(cardDiv);
        },
        this.getCardFromPlayer = function(cardId, playerId){
            var div;
            var queryText = '#playerContainer'+playerId + ' .players-cards';
            var list = document.querySelector(queryText);
            queryText = '#'+cardId;
            var cardLI = list.querySelector(queryText);
            var index = this.getCardIndexFromUL(list.childNodes, cardId);
            if (index != null){
                div = this.createCardDIVElemFromLI(playerId, cardLI)
                list.removeChild(list.childNodes[index]);
            }
            else {
                //throw new exception...
            }
            return div;
        },
        this.discardCard = function (card) {
            var targetId = document.querySelector('#pileImg');
            targetId.url= "images/cards/"+card.name+"_"+card.color+".png";
        },
       // this.setPileDrop = function (callbackDrop, callbackAllowDrop ) {
       //     var targetId = document.querySelector(".pile-cards"); 
        //    targetId.setAttribute('ondrop', callbackDrop);
        //    targetId.setAttribute('ondragover', callbackAllowDrop);
        //}
        this.changePlayerImg = function (playerId) {
            var targetId = document.getElementById("currentPlayerImgNew"); 
            var url = "images/player"+playerId+".png";
            targetId.setAttribute("src",url);
        },
        this.updateStats = function (stat) {
        
            var avgMoveTime = document.getElementById("avgMoveTime"); 
            var reachedLastCard = document.getElementById("reachedLastCard");
            var numOfMoves = document.getElementById("Moves");
            reachedLastCard.innerHTML = stat.numOfLastCard;
            avgMoveTime.innerHTML = stat.avgTurnTime.min + ":" + stat.avgTurnTime.sec + ":" + stat.avgTurnTime.ms;
            numOfMoves.innerHTML = stat.numOfTurnsPlayed;
            
        },
        this.updateStatsMoves = function (numTotalMoves) {
            
            var moves = document.querySelector("Moves"); 
            moves.innerHTML = numTotalMoves;
        },
        //events:

        this.onClickDeck = function (element) {
   
        },
        this.onClickStart = function (element) {
   
        },
        this.onClickQuit= function (element) {
   
        },
        this.setTakiMode = function(callback ,value, color){
            var div = document.querySelector("#pileOfCards");
            if (value){
                div.style.background = color;
                this.showEndTurnButton(callback);
            } else {
                div.style.background = "";
            }
        },
        this.getCardIndexFromUL = function(childNodes, cardID){
            for (var i = 1; i< childNodes.length; i++){
            if (childNodes[i].getAttribute("id") == cardID)
                return i;
            }
            return null
        },
        this.createCardLIElem = function(playerId, card, callBack ){
            var computerID = 2;
            var li = document.createElement("li");
            li.className = "card";
            li.setAttribute("data-ownerID", playerId);
            li.setAttribute("data-cardIsSpecial", card.isSpecial);
            li.setAttribute("data-cardName", card.name);
            li.setAttribute("data-cardColor", card.color);
            //var span = document.createElement("span");
            if (playerId == computerID){
                var url = "url(images/cards/card_back.png)";
            } else{
                var url = "url(images/cards/"+card.name+"_"+card.color+".png)";
            }
            li.style.backgroundImage = url;
            li.setAttribute("id",card.color+card.name);
            li.setAttribute("draggable", true);
        //li.setAttribute("click", callBack);
            li.style.cursor = 'pointer';
            li.addEventListener('click',callBack);
            //li.appendChild(span);
            return li;
        },
        this.createCardDIVElemFromLI= function(playerId, cardLI){
            var isSpecial, name, color;
            isSpecial = cardLI.getAttribute("data-cardIsSpecial");
            name = cardLI.getAttribute("data-cardName");
            color = cardLI.getAttribute("data-cardColor");
            var div = document.createElement("div");
            div.className = "card";
            div.setAttribute("data-ownerID",playerId);
            div.setAttribute("data-cardIsSpecial",isSpecial);
            //var span = document.createElement("span");
            var url = "url(images/cards/"+name+"_"+color+".png)";
            div.style.backgroundImage = url;
            div.setAttribute("id",color+name);
            //li.appendChild(span);
            return div;
        },
        this.colorButtonClick = function (event) {
            var color = event.currentTarget.id.slice(0,-7);
            this.setTakiMode(1, color);
            this.hideColorButton();
        },
        this.updateScoreBoard = function (statP1 , statP2) {
            document.getElementById('player1AvgMove').innerHTML = statP1.avgTurnTime.min + ":" + statP1.avgTurnTime.sec + ":" + statP1.avgTurnTime.ms; 
            document.getElementById('player1Move').innerHTML = statP1.numOfTurnsPlayed; 
            document.getElementById('player1astCard').innerHTML = statP1.numOfLastCard;
            document.getElementById('player2AvgMove').innerHTML = statP2.avgTurnTime.min + ":" + statP2.avgTurnTime.sec + ":" + statP2.avgTurnTime.ms;
            document.getElementById('player2Move').innerHTML = statP2.numOfTurnsPlayed;
            document.getElementById('player2astCard').innerHTML = statP2.numOfLastCard;
        }
}

var second = 0, minute = 0; hour = 0, ms = 0;
var timer = document.querySelector("#timer");
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        if (ms == 100){
            ms = 0;
            if (second == 60) {
                minute++;
                second = 0;
            } else {
                second++;
            }
            if (minute == 60) {
                hour++;
                minute = 0;
            }
        } else {
            ms++;
        }
    }, 10);
}

//modal

//congratulations when all cards match, show modal and moves, time and rating
function congratulations() {

}