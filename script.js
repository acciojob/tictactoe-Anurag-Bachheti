document.addEventListener("DOMContentLoaded", () => {
  const player1 = document.getElementById("player-1");
  const player2 = document.getElementById("player-2");
  const submitBtn = document.getElementById("submit");
  const grid = document.getElementById("grid");
  const messageDiv = document.getElementById("message");
  const gameSection = document.getElementById("game-section");

  let currentPlayer = "x";
  let currentName = "";

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (!player1.value.trim() || !player2.value.trim()) {
      alert("Enter both names first!");
      return;
    }

    document.querySelector(".first").style.display = "none";
    gameSection.style.display = "block";

    startGame();
  });

  function startGame() {
    const cells = grid.getElementsByTagName("td");
    for (let cell of cells) {
      cell.textContent = "";
      cell.classList.remove("winner");
      cell.addEventListener("click", handleCellClick, { once: true });
    }
    currentPlayer = "x";
    currentName = player1.value.trim();
    messageDiv.innerHTML = `${currentName}, you're up`;
  }

  function handleCellClick(e) {
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
      messageDiv.innerHTML = `${currentName} congratulations you won! 🎉`;
      disableBoard();
      return;
    }

    if (isDraw()) {
      messageDiv.innerHTML = `It's a draw! 🤝`;
      return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    currentName = currentPlayer === "x" ? player1.value.trim() : player2.value.trim();
    messageDiv.innerHTML = `${currentName}, you're up`;
  }

  function checkWinner() {
    const cells = grid.getElementsByTagName("td");
    const combos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (let combo of combos) {
      const [a,b,c] = combo;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
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

  function disableBoard() {
    const cells = grid.getElementsByTagName("td");
    for (let cell of cells) {
      cell.removeEventListener("click", handleCellClick);
    }
  }
});
