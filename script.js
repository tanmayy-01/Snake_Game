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

    function moveFood() {
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize)) * cellSize;
            newY = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize)) * cellSize;
        }while (
            snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY)
        )
        
        food = {x: newX, y: newY}
    }

    function updateSnake() {
        // calculate new co-ordinates the snake head will goto
        const newHead = {x:snake[0].x + dx , y: snake[0].y + dy};
        snake.unshift(newHead)  //add the new head
        if(newHead.x === food.x && newHead.y === food.y){
            // collision
            score += 5;
            moveFood();
            // don't pop the tail
        } else {
            snake.pop();    // remove the last cell
        }
    }

    function isGameOver() {
        // check snake body hit

        for( i = 1 ; i < snake.length ;i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true; // game over
        }

        // check for wall hit conidition

        const isHittingLeftWall = snake[0].x < 0;
        const isHittingTopWall = snake[0].y < 0;
        const isHittingRightWall = snake[0].x >= arenaSize;
        const isHittingDownWall = snake[0].y >= arenaSize;

        return isHittingDownWall || isHittingLeftWall || isHittingRightWall || isHittingTopWall //game over
    }

    function gameLoop() {
        setInterval(() => {
            if(!gameStarted) return;
            // check for game over
            if(isGameOver()) {
                gameStarted = false;
                alert(`Game Over, Score = ${score}`);
                window.location.reload();
                return ;
            }
            updateSnake()
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

