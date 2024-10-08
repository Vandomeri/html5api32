const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min
}


let ballRadius = 10
let x = getRandomNumber(0, canvas.width - ballRadius)
let y = getRandomNumber(canvas.height / 2, canvas.height - 30)
let ballColor = '#0095DD'


let paddleWidth = 75
let paddleHeight = 10
let paddleX = (canvas.width - paddleWidth) / 2


let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bonusAvaible = false
let bonusX = 0
let bonusY = 0

let lives = 3
let score = 0

let bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        const chanse = getRandomNumber(0, 100)
        bricks[c][r] = { x: 0, y: 0, status: 1, chanse: chanse };
        console.table(bricks)
    }
}


let leftPressed = false
let rightPressed = false

let dx = 2
let dy = -2

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        leftPressed = true
    } else if (e.key === 'ArrowRight') {
        rightPressed = true
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        leftPressed = false
    } else if (e.key === 'ArrowRight') {
        rightPressed = false
    }
})

document.addEventListener('mousemove', (e) => {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
})


function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = ballColor
    ctx.fill()
    ctx.closePath()
}

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath()
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}


function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawBonus() {
    if (bonusAvaible) {
        ctx.beginPath()
        ctx.rect(bonusX, bonusY, 20, 20)
        ctx.fillStyle = 'orange'
        ctx.fill()
        ctx.closePath()

        bonusY++

        if (bonusAvaible && bonusY > canvas.height - paddleHeight && bonusX > paddleX && bonusX < paddleX + paddleWidth) {
            bonusAvaible = false
            paddleWidth += 50
            setTimeout(() => {
                paddleWidth -= 50
            }, 2000)
        }
    }

}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status === 1 && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                b.status = 0
                ballColor = randomColor()
                score += 1

                if (b.chanse > 50 && bonusAvaible === false) {
                    bonusAvaible = true
                    bonusX = b.x + (brickWidth / 2)
                    bonusY = b.y + brickHeight
                }

                if (score == brickRowCount * brickColumnCount) {
                    alert(`YOU WIN, CONGRATULATIONS! YOUR SCORE ${score}`);
                    document.location.reload();
                }
            }
        }
    }
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawBricks()
    collisionDetection()
    drawScore()
    drawLives()
    drawBonus()
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }
    if (y + dy < ballRadius) {
        dy = -dy
    }
    if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }

        }
    }

    if (leftPressed && paddleX > 0) {
        paddleX += -7
    } else if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7
    }

    x += dx
    y += dy


    requestAnimationFrame(draw);

}


draw()