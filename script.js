const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const gameArea = document.getElementById('gameArea');

canvas.width = 400;
canvas.height = 400;
gameArea.appendChild(canvas);

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let apple = {};
let direction = 'right';
let isGameOver = false;

function init() {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    spawnApple();
    document.addEventListener('keydown', changeDirection);
    gameLoop();
}

function gameLoop() {
    if (isGameOver) return;

    setTimeout(() => {
        clearCanvas();
        moveSnake();
        checkCollision();
        drawSnake();
        drawApple();
        gameLoop();
    }, 100);
}

function clearCanvas() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    context.fillStyle = 'lime';
    for (let segment of snake) {
        context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }
}

function moveSnake() {
    let head = { ...snake[0] };

    switch (direction) {
        case 'right':
            head.x += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
    }

    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        spawnApple();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    switch (event.code) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

function spawnApple() {
    apple = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
    };
}

function drawApple() {
    context.fillStyle = 'red';
    context.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    isGameOver = true;
    alert('Game Over');
    init();
}

init();
