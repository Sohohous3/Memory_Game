const gameContainer = document.getElementById("game");
let countClick = 0;
let clickedCards = [];
let scoreElement;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (countClick >= 2)
    return;

  let clickedCard = event.target;

  if (clickedCards.length > 0 && clickedCards[clickedCards.length - 1].element === clickedCard)
    return;

  let cardColor = clickedCard.classList[0];
  clickedCard.style.backgroundColor = cardColor;

  if (clickedCard && countClick < 2) {
    countClick++;
    clickedCards.push({element: clickedCard, color: cardColor, paired: false});
  }
  if (countClick === 2) {
    if (clickedCards[0].color === clickedCards[1].color) {
        clickedCards[0].paired = true;
        clickedCards[1].paired = true;
        countClick = 0;
        clickedCards = [];
        score += 1;
        updateScoreDisplay();
        winCondition();
    } else {
        setTimeout(function() {
          clickedCards[0].element.style.backgroundColor = "";
          clickedCards[1].element.style.backgroundColor = "";
          countClick = 0;
          clickedCards = [];
        }, 1000);
      }
  } 
}

function updateScoreDisplay() {
  console.log("Score = ", score);
  scoreElement.textContent = "Score : " + score.toString();

}

function initGame() { 
  let startRestartButton = document.getElementById("startRestartButton");
  if (!startRestartButton) {
    startRestartButton = document.createElement("button");
    startRestartButton.id = "startRestartButton";
    document.body.insertBefore(startRestartButton, gameContainer);
  }
  startRestartButton.textContent = "Start Game !";

  if (!scoreElement) {
    scoreElement = document.createElement("div");
    document.body.insertBefore(scoreElement, gameContainer.nextSibling);
  }

  startRestartButton.addEventListener("click", () => {
    startGame();
  });
}

function startGame() {
  gameContainer.innerHTML = "";
  countClick = 0;
  clickedCards = [];
  score = 0;
  updateScoreDisplay();
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  document.getElementById("startRestartButton").textContent = "Restart Game !";
}

function winCondition() {
  let totalPairs = COLORS.length / 2;

  if (score === totalPairs) {
    gameContainer.innerHTML = "";
    const winMessage = document.createElement("div");
    winMessage.textContent = "You Win !!! Score = " + score;
    gameContainer.appendChild(winMessage);

    startRestartButton.textContent = "Restart Game!";
    startRestartButton.addEventListener("click", function() {
      startGame();
    });
    gameContainer.appendChild(startRestartButton);
  }
}

initGame();
