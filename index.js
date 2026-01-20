const colorNames = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Purple",
  "Cyan",
  "Magenta",
  "Orange",
  "Pink",
  "Brown",
  "Lime",
  "Olive",
  "Teal",
  "Navy",
  "Maroon",
  "Silver",
];

let winingScore = 7;
let targetColor = "";
let score = 0;
let timer = 120;
let gameInterval,timerInterval;

let setRendomColor = ()=>{
let cells = document.querySelectorAll('.cell');
cells.forEach(cell =>{
  const randomIndex = Math.floor(Math.random()*colorNames.length);
 const randomColor = colorNames[randomIndex]
 cell.style.backgroundColor = randomColor;
 cell.setAttribute('data-color',randomColor);
});
};
setRendomColor();

let setTargetColor = ()=>{
  let newColor;
  do{
    newColor = colorNames[Math.floor(Math.random()*colorNames.length)];
  }while(newColor === targetColor);
  targetColor = newColor;
  document.getElementById('targetColor').textContent = targetColor;
};

let formateTime = (seconds)=>{
const minutes = Math.floor(seconds / 60);
const secs = seconds % 60;
return `${minutes}:${secs < 10 ? '0' : ""}${secs}`;
};

let updateTimer = ()=>{
  timer--;
  document.getElementById('timer').textContent = formateTime(timer);
  if(timer <=0){
    endGame(false);
  }
};

let initializeGame = ()=>{
  score = 0;
  timer = 120;
document.getElementById('score').textContent = score;
document.getElementById('timer').textContent = formateTime(timer);
document.getElementById('congratsOverlay').style.display = 'none';
document.getElementById('loseoverlay').style.display = 'none';

let bgm = document.getElementById('backgroundMusic');
bgm.currentTime = 0;
  bgm.play();
  
  let loseMusic = document.getElementById('loseMusic');
  loseMusic.load();
  
 setRendomColor();
setTargetColor();

gameInterval = setInterval(setRendomColor,1000);
timerInterval = setInterval(updateTimer,1000);
};

let endGame = (isWin)=>{
   clearInterval(gameInterval);
   clearInterval(timerInterval);
document.getElementById('backgroundMusic').pause();
let overlay = isWin ? document.getElementById('congratsOverlay') : document.getElementById('loseoverlay');
overlay.style.display = 'block';
if(isWin){
  document.getElementById('winMusic').play();
}else{
document.getElementById('loseMusic').play();
}
};

let handleClick = (e)=>{
  const clickedColor = e.target.getAttribute('data-color');
  if(clickedColor === targetColor){
    score++;
document.getElementById('score').textContent = score;
if(score === winingScore){
  endGame(true);
}
setRendomColor();
setTargetColor();
document.getElementById('correctMusic').play();
  }else{
document.getElementById('incorrectMusic').play();
  }
};

document.querySelectorAll('.cell').forEach(cell =>{ 
cell.addEventListener('click',handleClick);
});

document.getElementById('restartGemoverlay').addEventListener('click',initializeGame);

document.getElementById('restartGemoverlayLose').addEventListener('click',initializeGame);

initializeGame();