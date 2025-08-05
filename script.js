let gameObject = [];
let player1 = true;
let pushed = false;
let countChoices = 0;
const startBtn = document.querySelector('.start-btn');
const buttonText = document.querySelectorAll('.btn');
const overlay = document.getElementById('overlay');
const winner = document.querySelector('.who-winner');
const result = document.querySelector('.result');
const newHeading1 = document.createElement('h1');
let tieCount = 0;
let xCount = 0;
let oCount = 0;
let whoWon = 0; //0 === X, 1 === O, 2 === Tie

const rulesForTheWin = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

function startGame(){
    if (startBtn.innerHTML === 'Start'){
        isXAndOInsideArray();
        hideOverlay();
        startBtn.innerHTML = 'Restart';
    }
    else {
        gameObject = [];
        isXAndOInsideArray();
        for (let i = 0; i < buttonText.length; i++){
            buttonText[i].innerHTML = '';
        }
        countChoices = 0;
        player1 = true;
        hideOverlay();
    }
}

function registerChoice(choice){
    if (pushed === false){
        return;
    }

    const value = Number(choice.dataset.number);
    if (buttonText[value].innerHTML === 'X' || buttonText[value].innerHTML === 'O'){
        return;
    }
    else if (player1 === true){
        gameObject[value].xo = 'X';
        buttonText[value].innerHTML = 'X';
        player1 = false;
        countChoices++;
        didThePlayerWin();
    }
    else{
        gameObject[value].xo = 'O';
        buttonText[value].innerHTML = 'O';
        player1 = true;
        countChoices++;
        didThePlayerWin();
    }
    if (countChoices === 9){
        tieCount++;
        whoWon = 2;
        showResults();
        showOverlay();
    }
}

function isXAndOInsideArray(){
    for (let i = 1; i <= 9; i++){
        gameObject.push({xo: ""});
    }
    pushed = true;
}

function didThePlayerWin(){
    for (let i = 0; i < rulesForTheWin.length; i++){
        const [a, b, c] = rulesForTheWin[i];
        if (gameObject[a].xo !== '' && gameObject[a].xo === gameObject[b].xo && gameObject[a].xo === gameObject[c].xo){
            if (gameObject[a].xo === 'X'){
                xCount++;
                whoWon = 0;
                showResults();
                showOverlay();
            }
            else {
                oCount++;
                whoWon = 1;
                showResults();
                showOverlay();
            }
        }
    }
    return null;
}

function hideOverlay(){
    overlay.classList.add('hidden');
}

function showOverlay(){
    overlay.classList.remove('hidden');
}

function showResults(){
    winner.innerHTML = '';
    result.innerHTML = '';
    if (whoWon === 0) newHeading1.innerText = 'X is a winner!';
    else if (whoWon === 1) newHeading1.innerText = 'O is a winner!';
    else newHeading1.innerText = 'Tie!';
    winner.appendChild(newHeading1);
    
    for (let i = 0; i < 3; i++){
        const newHeading3 = document.createElement('h3');
        if (i === 0){
            newHeading3.innerText = 'X: ' + xCount;
        }
        else if (i === 1){
            newHeading3.innerText = 'Tie: ' + tieCount;
        }
        else {
            newHeading3.innerText = 'O: ' + oCount;
        }
        result.appendChild(newHeading3);
    }
}