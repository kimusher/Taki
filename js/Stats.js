function Stats(){
    this.numOfLastCard = 0;
    this.numOfTurnsPlayed = 0;
    this.avgTurnTime = {min:0,sec:0,ms:0};
    this.totalTurnsTime = {min:0,sec:0,ms:0};
    this.time = 0;

    this.calcTotalTurnsTime = function(){
        this.totalTurnsTime.min = Math.floor(this.time/60000);
        this.totalTurnsTime.sec = Math.floor(this.time/1000);
        this.totalTurnsTime.ms = this.time-(this.totalTurnsTime.sec*1000);
    }
    this.calcAvgTurnTime = function(){
        this.avgTurnTime.min = Math.floor(this.time/this.numOfTurnsPlayed/60000);
        this.avgTurnTime.sec = Math.floor(this.time/this.numOfTurnsPlayed/1000);
        this.avgTurnTime.ms = this.time-(this.avgTurnTime.sec*1000);
    }
}

Stats.prototype.increaseTurns = function(){
    this.numOfTurnsPlayed++;
}

Stats.prototype.increaseLastCardTurns = function(){
    this.numOfLastCard++;
}

Stats.prototype.addTimetoTotalTime = function(time){
    this.time += time;
    this.calcTotalTurnsTime();
    this.calcAvgTurnTime();
}