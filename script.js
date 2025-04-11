let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");
let grid = document.getElementById("grid");
let submit = document.getElementById("submit");
let message = document.getElementById("message");

let currentPlayer = "x";
let currentName = "";

submit.addEventListener("click", function (event) {
    event.preventDefault();

    if (!player1.value || !player2.value) {
        alert('Enter both names first!');
        return;
    }

    // Reset board: remove Xs, Os, and winner classes
    const cells = grid.getElementsByTagName("td");
    for (let cell of cells) {
        cell.textContent = "";
        cell.classList.remove("winner");
        cell.removeEventListener("click", handleCellClick); // clean old listeners
    }

    // Reset game state
    currentPlayer = "x";
    currentName = player1.value;
    message.innerHTML = `${currentName}, you're up`;

    // Start fresh game
    startGame();
});

function startGame() {
    const cells = grid.getElementsByTagName("td");

    for (let cell of cells) {
        cell.addEventListener("click", handleCellClick, { once: true });
    }
}

function handleCellClick(event) {
    if (event.target.textContent !== "") return;

    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        message.innerHTML = `${currentName} wins!! 🎉`;
        disableBoard();
        return;
    }

    if (isDraw()) {
        message.innerHTML = "It's a draw! 🤝";
        return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    currentName = currentPlayer === "x" ? player1.value : player2.value;
    message.innerHTML = `${currentName}, you're up`;
}

function disableBoard() {
    const cells = grid.getElementsByTagName("td");

    for (let cell of cells) {
        cell.removeEventListener("click", handleCellClick);
    }
}

function checkWinner() {
    const cells = grid.getElementsByTagName("td");
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combo of winCombos) {
        let [a, b, c] = combo;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            // Highlight the winning cells
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            return true;
        }
    }

    return false;
}

function isDraw() {
    const cells = grid.getElementsByTagName("td");
    return [...cells].every(cell => cell.textContent !== "");
}
