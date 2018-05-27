function Computer(id){
    Player.call(this, id);

    this.randColor = function(){
        var num = Math.floor(Math.random() * Math.floor(4)) + 1;
        return this.ColorEnum[num];
    }
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype.play = function(topCard){
    var color = topCard.color;
    var card = null;
    var arrayresult = [];
    if (topCard.name == '2plus' && topCard.isActive){
        card = this.getCardFromPackByName('2plus')
        if (card != null){
            this.removeCard(card);
            return card;
        } else {
            return 'takeCard';
        }
    }
    card = this.getCardFromPackByNameAndColor('2plus', topCard.color)
    if (card != null){
        this.removeCard(card);
        return card;
    }
    card = this.getCardFromPackByName('changecolor')
    if (card != null){
        this.removeCard(card);
        var color = this.randColor();
        arrayresult.push(color);
        arrayresult.push(card);
        return arrayresult;
    }
    card = this.getCardFromPackByNameAndColor('stop', topCard.color)
    if (card != null){
        this.removeCard(card);
        return card;
    }
    card = this.getCardFromPackByNameAndColor('plus', topCard.color)
    if (card != null){
        this.removeCard(card);
        return card;
    }
    card = this.getCardFromPackByNameAndColor('taki', 'colorful')
    if (card != null){
        this.removeCard(card);
        var cards = this.getAllCardsByColor(color);
        for (var i = 0; i < cards.length; i++){
            arrayresult.push(cards[i]);
        }
        this.removeCards(cards);
        arrayresult.push(card);
        return arrayresult;
    }
    card = this.getCardFromPackByNameAndColor('taki', topCard.color)
    if (card != null){
        this.removeCard(card);
        var cards = this.getAllCardsByColor(card.color);
        for (var i = 0; i < cards.length; i++){
            arrayresult.push(cards[i]);
        }
        this.removeCards(cards);
        arrayresult.push(card);
        return arrayresult;
    }
    card = this.getCardFromPackByColor(topCard.color)
    if (card != null){
        this.removeCard(card);
        return card;
    }
    card = this.getCardFromPackByName(topCard.name)
    if (card != null){
        this.removeCard(card);
        return card;
    }

    return 'takeCard';
}

