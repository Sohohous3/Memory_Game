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
  const startButton = document.createElement("button");
  scoreElement = document.createElement("div");
  let isgameStarted = false;

  startButton.textContent = "Start Game !";
  scoreElement.textContent = "Score : " + score.toString();

  startButton.addEventListener("click", () => {
    gameContainer.innerHTML = "";
    isgameStarted = true;
    countClick = 0;
    clickedCards = [];
    score = 0;
    updateScoreDisplay();
    shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    if (isgameStarted === true)
      startButton.textContent = "Restart Game !";
  })
  document.body.appendChild(startButton);
  document.body.appendChild(scoreElement);
}

initGame();