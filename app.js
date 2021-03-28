// Our initial state
let gameState = {
  player: {
    name: "",
    points: 0
  },
  canvas: [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
  ]
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

// GLOBAL VARIABLES
let food = ["", ""];
let game;
let speed;
let highScore;

function generateRandomNumber() { // get a random number for the food element
  return Math.round(Math.random() * (19 - 0) + 0);
}

function setRandomFoodCoordinates() { // setting coordinates for the food element
  let coordinateX = generateRandomNumber();
  let coordinateY = generateRandomNumber();
  food = [`${coordinateX}`, `${coordinateY}`];
}

function renderFood() { // rendering the food element, and making sure it is not in the snake
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

function buildSnake() { // building the snake
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
      $('.you-lose').css('display', 'inline-block')
      $('.play-again').css('display', 'inline-block')
    }

    segmentElement.addClass("snake");
  })

  if ( // you will lost if snake runs into wall
    newSnakeHeadX > 19 ||
    newSnakeHeadX < 0 ||
    newSnakeHeadY > 19 ||
    newSnakeHeadY < 0
  ) {
    clearInterval(game);
    $('.you-lose').css('display', 'inline-block')
    $('.play-again').css('display', 'inline-block')
  }

  if (snakeHeadElement.hasClass("food")) { // when the snake eats the food
    segmentElement.removeClass("food")
    gameState.player.points++
    $('#score').text (gameState.player.points) // points++ this is where you will add to some number some points
    snake.body.unshift(newSnakeHead);
    storeScore()
    retrieveScore()
    $('#high-score-number').text(highScore)
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

// Refresh the screen in an interval
function tick() {
  buildSnake();
}

// clicking on the speed buttons to change the speed
$('.slow').on('click', function() {
  speed = 1000 / 5
  storeSpeed()
})
$('.medium').on('click', function() {
  speed = 1000 / 10
  storeSpeed()
})
$('.fast').on('click', function() {
  speed = 1000 / 15
  storeSpeed()
})

$(window).on("keydown", function (event) {
  if (event.keyCode === 32) { // press space to start
    buildInitialState()
    retrieveSpeed()
    game = setInterval(tick, speed);
    $('.start').hide()
  }
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

function storeSpeed() {
  localStorage.setItem("Speed", JSON.stringify(speed))
}

function retrieveSpeed() {
  localStorage.getItem("Speed")
    ? (speed = JSON.parse(localStorage.getItem("Speed")))
    : (speed = 1000 / 10);
}

function storeScore() {
  if (gameState.player.points > highScore) {
    localStorage.setItem('Score', JSON.stringify(gameState.player.points))
  }
}

function retrieveScore() {
  localStorage.getItem('Score')
    ? (highScore = Number(JSON.parse(localStorage.getItem('Score'))))
    : (highScore = 0);
}

retrieveScore()
$('#high-score-number').text(highScore)

$('.play-again').on('click', function() { // reload the screen to play again
  location.reload()
})