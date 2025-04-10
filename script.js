let submit = document.getElementById("submit");
let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");
let message = document.getElementById("message");
let grid = document.getElementById("grid");

grid.addEventListener("click", function(event){
	if (event.target.tagName === "TD") {
    event.target.textContent = "X"; // Put an "X" in the clicked cell
  }
})