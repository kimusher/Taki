function Card(name, color, isSpecial){
	this.name = name;
    this.color = color;
    this.isSpecial = isSpecial;
    this.isActive = true;
    this.backImageURL = "url(images\\cards\\card_back.png)";
    this.frontImageURL = "url(images\\cards\\"+name+"_"+color+".png)";
}

Card.prototype.equals = function(i_name, i_color){
    if (this.name == i_name && this.color == i_color)
        return true;
    else
        return false;
}
