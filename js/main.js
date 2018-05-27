var ui;
var game;
var startbutton = document.getElementById("start-button");
startbutton.addEventListener("click",start);

function start() {
    ui = new UI();
    game = new GameManger(ui);
    game.init();
    document.getElementById('deck').onclick = game.onTakeCard.bind(game);
    startbutton.removeEventListener("click", start);
    game.startGame();
}