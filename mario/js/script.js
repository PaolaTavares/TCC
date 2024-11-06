const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

// Criação das divs para exibir a pontuação
const scoreDisplay = document.createElement('div');
const bestScoreDisplay = document.createElement('div');

scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '10px';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.color = '#000';

bestScoreDisplay.style.position = 'absolute';
bestScoreDisplay.style.top = '40px';
bestScoreDisplay.style.left = '10px';
bestScoreDisplay.style.fontSize = '24px';
bestScoreDisplay.style.color = '#000';

document.querySelector('.game-board').appendChild(scoreDisplay);
document.querySelector('.game-board').appendChild(bestScoreDisplay);

let loop;
let score = 0; // Inicializa a pontuação
let bestScore = 0; // Inicializa a melhor pontuação

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const checkCollision = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
        endGame(pipePosition, marioPosition);
    } else if (pipePosition < 100) {
        score++; // Aumenta a pontuação
        scoreDisplay.textContent = `Pontos: ${score}`; // Atualiza a exibição da pontuação
    }
};

const endGame = (pipePosition, marioPosition) => {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;
    mario.src = 'imgs/game-over.png';
    mario.style.width = '130px';
    mario.style.marginLeft = '35px';
    cloud.style.animation = 'cloud 20s infinite linear';
    gameOver.style.visibility = 'visible';

    // Atualiza a melhor pontuação
    if (score > bestScore) {
        bestScore = score;
        bestScoreDisplay.textContent = `Melhor Pontuação: ${bestScore}`;
    }

    clearInterval(loop);
};

const startGame = () => {
    score = 0; // Reinicia a pontuação
    scoreDisplay.textContent = `Pontos: ${score}`; // Exibe a pontuação inicial
    bestScoreDisplay.textContent = `Melhor Pontuação: ${bestScore}`; // Exibe a melhor pontuação
    loop = setInterval(checkCollision, 10);
};

const restart = () => {
    gameOver.style.visibility = 'hidden';
    pipe.style.animation = 'pipe-animations 1.5s infinite linear';
    pipe.style.left = '';

    mario.src = 'imgs/mario.gif';
    mario.style.width = '130px';
    mario.style.bottom = '0px';
    mario.style.marginLeft = '';
    mario.style.animation = '';

    cloud.style.left = '';

    startGame();
};

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
restartButton.addEventListener('click', restart);

startGame();
