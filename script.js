document.addEventListener('DOMContentLoaded', () => {
    const gameArena = document.getElementById('game-arena');
    const arenaSize = 700;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = {x:300, y:200};  // co-ordinates
    let snake = [{x:160, y:200}, {x:140,y:200}, {x:120,y:200}];
    let dx = cellSize;  // displacement on x-axis
    let dy = 0;     // displacement on y-axis

    function drawScoreBoard() {
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score: ${score}`;
    }

    function drawDiv(x, y, className) {
        const div = document.createElement('div');
        div.classList.add(className);
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        return div;
    }

    function drawFoodAndSnake() { 
        gameArena.innerHTML = '';       // if previous something is drawn remove it
        // wipe out everything and redraw with new co ordinates when snake moves

        snake.forEach((snakeCell) => {
            const element = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(element)
        })

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement); 

    }

    function gameLoop() {
        setInterval(() => {
            drawScoreBoard();
            drawFoodAndSnake();
        },1000)
    }

    function runGame() {
        gameStarted = true;
        gameLoop()
    }


    function initiateGame() {
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        document.body.insertBefore(scoreBoard,gameArena);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start';
        startButton.classList.add('start-btn');
        document.body.appendChild(startButton);

        startButton.addEventListener('click',() => {
            startButton.style.display = 'none';
            runGame()
        })
    }

    initiateGame();
})

