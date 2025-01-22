document.addEventListener("DOMContentLoaded", () => {
  
  const singlePlayerBtn = document.getElementById("singleplayer-btn");
  const multiplayerBtn = document.getElementById("multiplayer-btn");
  const singlePlayerMode = document.getElementById("single-player-mode");
  const multiplayerMode = document.getElementById("multiplayer-mode");
  const resultText = document.getElementById("result-text");
  const resetButton = document.getElementById("reset");
  const rulesButton = document.getElementById("rules");
  const modal = document.getElementById("rules-modal");
  const closeModal = document.querySelector(".close");

  const playerScoreSpan = document.getElementById("player-score");
  const computerScoreSpan = document.getElementById("computer-score");
  const p1ScoreSpan = document.getElementById("p1-score");
  const p2ScoreSpan = document.getElementById("p2-score");
  const playerTurn = document.getElementById("player-turn");

  let gameMode = "single";
  let playerScore = 0;
  let computerScore = 0;
  let p1Score = 0;
  let p2Score = 0;
  let currentPlayer = 1;
  let p1Choice = "";

  singlePlayerBtn.addEventListener("click", () => {
    gameMode = "single";
    singlePlayerBtn.classList.add("active");
    multiplayerBtn.classList.remove("active");
    singlePlayerMode.classList.add("active");
    multiplayerMode.classList.remove("active");
    resetGame();
  });

  multiplayerBtn.addEventListener("click", () => {
    gameMode = "multi";
    multiplayerBtn.classList.add("active");
    singlePlayerBtn.classList.remove("active");
    multiplayerMode.classList.add("active");
    singlePlayerMode.classList.remove("active");
    resetGame();
  });
  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
  }
  function getWinner(choice1, choice2) {
    if (choice1 === choice2) return "draw";

    if (
      (choice1 === "rock" && choice2 === "scissors") ||
      (choice1 === "paper" && choice2 === "rock") ||
      (choice1 === "scissors" && choice2 === "paper")
    ) {
      return "player1";
    }
    return "player2";
  }
  document.querySelectorAll(".choice").forEach((choice) => {
    choice.addEventListener("click", () => {
      const playerChoice = choice.dataset.choice;

      if (gameMode === "single") {
        playSinglePlayer(playerChoice);
      } else {
        playMultiPlayer(playerChoice);
      }
    });
  });

  function playSinglePlayer(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    if (winner === "player1") {
      playerScore++;
      playerScoreSpan.textContent = playerScore;
      resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
    } else if (winner === "player2") {
      computerScore++;
      computerScoreSpan.textContent = computerScore;
      resultText.textContent = `Computer wins! ${computerChoice} beats ${playerChoice}`;
    } else {
      resultText.textContent = "It's a draw!";
    }

    checkGameEnd("single");
  }

  function playMultiPlayer(playerChoice) {
    if (currentPlayer === 1) {
      p1Choice = playerChoice;
      currentPlayer = 2;
      playerTurn.textContent = "Player 2's Turn";
      resultText.textContent = "Player 2, make your choice!";
    } else {
      const winner = getWinner(p1Choice, playerChoice);

      if (winner === "player1") {
        p1Score++;
        p1ScoreSpan.textContent = p1Score;
        resultText.textContent = `Player 1 wins! ${p1Choice} beats ${playerChoice}`;
      } else if (winner === "player2") {
        p2Score++;
        p2ScoreSpan.textContent = p2Score;
        resultText.textContent = `Player 2 wins! ${playerChoice} beats ${p1Choice}`;
      } else {
        resultText.textContent = "It's a draw!";
      }

      currentPlayer = 1;
      playerTurn.textContent = "Player 1's Turn";
      checkGameEnd("multi");
    }
  }

  function checkGameEnd(mode) {
    const winningScore = 5;
    if (mode === "single") {
      if (playerScore >= winningScore) {
        resultText.textContent = "Congratulations! You've won the game!";
        disableChoices();
      } else if (computerScore >= winningScore) {
        resultText.textContent = "Game Over! Computer wins the game!";
        disableChoices();
      }
    } else {
      if (p1Score >= winningScore) {
        resultText.textContent = "Player 1 wins the game!";
        disableChoices();
      } else if (p2Score >= winningScore) {
        resultText.textContent = "Player 2 wins the game!";
        disableChoices();
      }
    }
  }

  function disableChoices() {
    document.querySelectorAll(".choice").forEach((choice) => {
      choice.disabled = true;
    });
  }

  function enableChoices() {
    document.querySelectorAll(".choice").forEach((choice) => {
      choice.disabled = false;
    });
  }

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    p1Score = 0;
    p2Score = 0;
    currentPlayer = 1;
    p1Choice = "";

    playerScoreSpan.textContent = "0";
    computerScoreSpan.textContent = "0";
    p1ScoreSpan.textContent = "0";
    p2ScoreSpan.textContent = "0";
    resultText.textContent = "Choose your weapon!";
    playerTurn.textContent = "Player 1's Turn";

    enableChoices();
  }

  resetButton.addEventListener("click", resetGame);

  rulesButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
