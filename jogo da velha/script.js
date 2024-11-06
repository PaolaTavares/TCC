const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

let positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function init() {
    selected = Array(9).fill(null); // Inicializa com um array de 9 nulls

    currentPlayer.innerHTML = `Jogador da vez: ${player}`;

    document.querySelectorAll(".game button").forEach((item, index) => {
        item.innerHTML = "";
        item.removeEventListener("click", newMove); // Remove o listener anterior se existir
        item.addEventListener("click", newMove);
        item.setAttribute("data-i", index); // Define o atributo data-i
    });
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    if (selected[index] !== null) return; // Verifica se a posição já está selecionada

    e.target.innerHTML = player;
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(() => {
        if (check()) {
            alert(`O JOGADOR '${player}' Ganhou!`);
            init(); // Reinicia o jogo após a vitória
        } else if (selected.every(item => item !== null)) {
            alert("Empate");
            init(); // Reinicia o jogo após empate
        } else {
            player = player === "X" ? "O" : "X";
            currentPlayer.innerHTML = `Jogador da vez: ${player}`;
        }
    }, 100);
}

function check() {
    for (let pos of positions) {
        if (pos.every((index) => selected[index] === player)) {
            return true;
        }
    }
    return false;
}