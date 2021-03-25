// Our initial state
let gameState = {
  canvas: [
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  ],
};

let snake = {
  body: [
    [10, 5],
    [10, 6],
    [10, 7],
    [10, 8],
  ],
  nextDirection: [-1, 0],
};

let food = ["", ""];
let game;

function generateRandomNumber() {
  return Math.round(Math.random() * (19 - 0) + 0);
}

function setRandomFoodCoordinates() {
  // (".segment").removeClass('food')
  let coordinateX = generateRandomNumber();
  let coordinateY = generateRandomNumber();
  food = [`${coordinateX}`, `${coordinateY}`];
}

function renderFood() {
  $(".segment").removeClass("food");
  setRandomFoodCoordinates()
  let foodX = food[0];
  let foodY = food[1];

  let foodElement = $(`[data-x="${foodX}"][data-y="${foodY}"]`);
  while (foodElement.hasClass("snake")) {
    setRandomFoodCoordinates()

    foodX = food[0];
    foodY = food[1];
    foodElement = $(`[data-x="${foodX}"][data-y="${foodY}"]`)
  }
  foodElement.addClass("food");
}

function buildSnake() {
  $(".segment").removeClass("snake");

  const snakeHead = snake.body[0];
  const snakeHeadX = snakeHead[0];
  const snakeHeadY = snakeHead[1];

  let snakeHeadElement = $(
    `[data-x="${snakeHeadX}"][data-y="${snakeHeadY}"]`
  );

  const newSnakeHeadX = snakeHeadX + snake.nextDirection[0];
  const newSnakeHeadY = snakeHeadY + snake.nextDirection[1];
  const newSnakeHead = [newSnakeHeadX, newSnakeHeadY];

  let segmentElement;
  
  snake.body.forEach(function (coordinates) {
    const coordinateX = coordinates[0];
    const coordinateY = coordinates[1];

    segmentElement = $(
      `[data-x="${coordinateX}"][data-y="${coordinateY}"]`
    );
    if (segmentElement.hasClass("snake")) { // you will lose if snake runs into itself
      clearInterval(game)
    }

    segmentElement.addClass("snake");
    if ( // you will lost if snake runs into wall
      newSnakeHeadX > 19 ||
      newSnakeHeadX < 0 ||
      newSnakeHeadY > 19 ||
      newSnakeHeadY < 0
    ) {
      clearInterval(game);
    }
  })

  if (snakeHeadElement.hasClass("food")) {
    segmentElement.removeClass("food")
    snake.body.unshift(newSnakeHead);
    renderFood()
  } else { 
    snake.body.unshift(newSnakeHead);
    snake.body.pop();
  }
  
}

function buildInitialState() {
  renderState();
  buildSnake();
  renderFood();
}

buildInitialState();

// render the state
function renderState() {
  const canvas = $("#canvas");
  canvas.empty();

  gameState.canvas.forEach(function (row, rowIndex) {
    row.forEach(function (segment, segmentIndex) {
      const segmentElement = $(
        `<div class="segment" data-x="${rowIndex}" data-y="${segmentIndex}"></div>`
      );
      canvas.append(segmentElement);
    });
  });
}

// listeners
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState(); // show the user the new state
}

$(".board").on("click", onBoardClick); // etc

// Refresh the screen in an interval
function tick() {
  console.log("tick");
  buildSnake();
}

game = setInterval(tick, 1000 / 5);

$(window).on("keydown", function (event) {
  if (event.keyCode === 37 && snake.nextDirection[1] !== 1) {
    snake.nextDirection = [0, -1];
  }
  if (event.keyCode === 38 && snake.nextDirection[0] !== 1) {
    snake.nextDirection = [-1, 0];
  }
  if (event.keyCode === 39 && snake.nextDirection[1] !== -1) {
    snake.nextDirection = [0, 1];
  }
  if (event.keyCode === 40 && snake.nextDirection[0] !== -1) {
    snake.nextDirection = [1, 0];
  }
});


