const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const score = document.querySelector('.score');

let isJumping = false;
let isDblJumping = false;
let isGameOver = false;
let position = 0;
let pontuacao = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }else{
      if (!isDblJumping){
        dblJump();
      }
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (isDblJumping){
      clearInterval(upInterval);
    }else{
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (isDblJumping){
          clearInterval(upInterval);
        } else {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }}, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }}, 20);
}

function dblJump() {
  isDblJumping = true;
  let endPosition = position + 100;
  // console.log("end: " + endPosition);

  let upDblInterval = setInterval(() => {
    // console.log("Subindo "+ position);
    if (position >= endPosition) {
      // Descendo
      clearInterval(upDblInterval);

      let downDblInterval = setInterval(() => {
        // console.log("Descendo..."); 
        if (position <= 0) {
          clearInterval(downDblInterval);
          isJumping = false;
          isDblJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
      atualizaPontuacao();
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      background.style.animation = "none";
      document.body.innerHTML += '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function atualizaPontuacao(){
  pontuacao++;
  score.innerHTML = pontuacao;
}

createCactus();

document.addEventListener('keyup', handleKeyUp);
