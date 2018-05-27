function Deck(){
    this.getAllCardsBack
    this.cards = [];
    this.setCardsRetrive = function(callback){
        this.getAllCardsBack = callback;
    }
}

Deck.prototype.createDeck = function() {
    var names = ['1', '3', '4', '5', '6', '7', '8', '9', 'plus', 'stop', 'taki'];
    var colors = ['blue','green','yellow','red'];
    for(var s = 0; s < colors.length; s++ ) {
        for( var n = 0; n < names.length; n++ ) {
            if (names[n] == 'taki' || names[n] == 'stop' || names[n] == 'plus' || names[n] == '2plus') {
                this.cards.push( new Card(names[n], colors[s], true) );
                this.cards.push( new Card(names[n], colors[s], true) );
                } else {
                    this.cards.push( new Card(names[n], colors[s], false) );
                    this.cards.push( new Card(names[n], colors[s], false) );
            }
        }
    }
    //for (var i = 0; i < 2; i++)
    //        this.cards.push(new Card('taki', 'colorful', true));
    for (var i = 0; i < 4; i++)
        this.cards.push(new Card('changecolor', 'colorful', true));
}

Deck.prototype.getStartingCards = function(numOfCards){
    var cards = [];        
    for(var i = 0; i < numOfCards; i++){
        cards.push(this.getCard());
    }
    return cards;
}

Deck.prototype.getCard = function(){
    var card = this.cards.pop();
    if(this.cards.length <= 0){
        this.cards = this.getAllCardsBack();
    }
    return card;
}
Deck.prototype.returnCard = function(card){
    this.cards.push(card);
}
Deck.prototype.fillEmptyDeck = function(cards){
    this.cards = cards;
}

Deck.prototype.shuffle = function(){
    var i = this.cards.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this.cards[j];
        this.cards[j] = this.cards[i];
        this.cards[i] = temp;
    }
}