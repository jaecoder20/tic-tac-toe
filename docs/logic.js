let newGameScreen = document.getElementById("new-game-container");
let gameBoard = document.getElementById("game-board");
let popUpScreen = document.getElementById("pop-screen")
let difficultyScreen = document.getElementById("difficulty-screen");
let popUpScreenRestart = document.getElementById("pop-screen-r");
let playerSelector_X = document.getElementById("x-selector")
let playerSelector_O = document.getElementById("o-selector")
// COLORS
const semi_dark_navy = getComputedStyle(document.documentElement).getPropertyValue('--semi-dark-navy');
const lightYellow = getComputedStyle(document.documentElement).getPropertyValue('--light-yellow');
const lightYellowHover = getComputedStyle(document.documentElement).getPropertyValue('--light-yellow-hover');
const lightBlue = getComputedStyle(document.documentElement).getPropertyValue('--light-blue');
const lightBlueHover = getComputedStyle(document.documentElement).getPropertyValue('--light-blue-hover');
const darkNavy = getComputedStyle(document.documentElement).getPropertyValue('--dark-navy');
const semiDarkNavy = getComputedStyle(document.documentElement).getPropertyValue('--semi-dark-navy');
const silver = getComputedStyle(document.documentElement).getPropertyValue('--silver');
const silverHover = getComputedStyle(document.documentElement).getPropertyValue('--silver-hover');
const button1Shadow = getComputedStyle(document.documentElement).getPropertyValue('--button-1-shadow');
const button2Shadow = getComputedStyle(document.documentElement).getPropertyValue('--button-2-shadow');
const playerSelector = getComputedStyle(document.documentElement).getPropertyValue('--player-selector');
const playboxShadow = getComputedStyle(document.documentElement).getPropertyValue('--playbox-shadow');
const greyShadow = getComputedStyle(document.documentElement).getPropertyValue('--grey-shadow');


let gameState;
let playCells;
let playCellss;
let winner;
let currentPlayer;
let playArea;
let vs_cpu;
let gameEnded;
let vsCPU_scores;
let PVP_scores;
let gameMode;
let available;
let cpu_turn;


let player_1,player_2,player_cpu;
window.addEventListener('DOMContentLoaded', () => {
    playArea = gameBoard.querySelector("#grid-portion");
    playCellss = playArea.getElementsByTagName('div');
    playCells = Array.from(playArea.getElementsByTagName('div'));
    currentPlayer = { value : "X"};
    player_1 = 'X';
    player_2 = 'O';
    player_cpu = 'O';
    gameState = {
        //Couting from top for rows and from left for columns
        "1": [], //row 1 
        "2": [], //row 2
        "3": [], //row 3
        "4": [], //column 1
        "5": [], //column 2 
        "6": [],  //column 3
        "7": [], //diagonal 1
        "8": [], //diagonal 2
        "isFull": 0,
    };
    available = [1,2,3,4,5,6,7,8,9];
    vsCPU_scores = [0,0,0];
    PVP_scores = [0,0,0];

    // hideGameBoard();
    // hidePopUpScreen();
    // hideDifficultyScreen();
    // hidePopUpScreenRestart();
    showNewGameScreen();
    // showGameBoard();
    newRound();
    cellsHover();
    

});

//SHOW DIFFERENT SCREENS
function showNewGameScreen(){
    newGameScreen.style.display = 'flex';
    hoverPlayerEvent();
    switchFirstPlayerEvent();
    newGame_CPU();
    newGame_PVP();
    gameDifficulty();
}
function showGameBoard(){
    gameBoard.style.display = 'block';
    gameBoard.style.zIndex = "0";
}
function showPopUpScreen(winner){
    showGameBoard();
    modifyPopScreen(winner);
    gameBoard.style.zIndex = "-1";
    popUpScreen.style.display = 'flex';
}
function showDifficultyScreen(){
    difficultyScreen.style.display = 'flex';
}
function showPopUpScreenRestart(){
    popUpScreenRestart.style.display = 'flex';
}

// HIDE DIFFERENT SCREENS
function hideNewGameScreen(){
    newGameScreen.style.display = 'none';
}
function hideGameBoard(){
    gameBoard.style.display = 'none';
}
function hidePopUpScreen(){
    popUpScreen.style.display = 'none';
    // hideGameBoard();
}
function hideDifficultyScreen(){
    difficultyScreen.style.display = 'none';
}
function hidePopUpScreenRestart(){
    popUpScreenRestart.style.display = 'none';
}


// New Game Screen Event Listener Functions 

function hoverPlayerEvent(){
    playerSelector_O.addEventListener("mouseenter",function(){
        if (player_1 === "X"){
            playerSelector_O.style.backgroundColor = semiDarkNavy;
            playerSelector_O.style.cursor = "pointer";
        }
    });
    playerSelector_O.addEventListener("mouseleave",function(){
        if (player_1 === "X"){
            playerSelector_O.style.backgroundColor = darkNavy;
        }
    });
    playerSelector_X.addEventListener("mouseenter",function(){
        if (player_1 === "O"){
            playerSelector_X.style.backgroundColor = semiDarkNavy;
            playerSelector_X.style.cursor = "pointer";
        }
    });
    playerSelector_X.addEventListener("mouseleave",function(){
        if (player_1 === "O"){
            playerSelector_X.style.backgroundColor = darkNavy;
        }
    });
}

function switchFirstPlayerEvent(){
    playerSelector_O.addEventListener('click', function(){
        player_1 = 'O';
        player_2 = 'X';
        player_cpu = 'X';
        playerSelector_O.style.backgroundColor = playerSelector;
        playerSelector_X.style.backgroundColor = darkNavy;
        let svgs = document.querySelectorAll(".svg-selectors");
        svgs[0].src = "assets/icon-x-silver.svg";
        svgs[1].src = "assets/icon-o-dark.svg";

        console.log(currentPlayer)
        console.log(player_1)
        console.log(player_2)
        console.log(player_cpu)

        
    })
    playerSelector_X.addEventListener('click', function(){
        player_1 = 'X';
        player_2 = 'O';
        player_cpu = 'O';
        playerSelector_O.style.backgroundColor = darkNavy;
        playerSelector_X.style.backgroundColor = playerSelector;
        let svgs = document.querySelectorAll(".svg-selectors");
        svgs[0].src = "assets/icon-x-dark.svg";
        svgs[1].src = "assets/icon-o-silver.svg";

        console.log(currentPlayer)
        console.log(player_1)
        console.log(player_2)
        console.log(player_cpu)

        
    })
}



function newGame_CPU(){
    let button1 = newGameScreen.querySelector(".button-1");
    button1.addEventListener('click', function(){
        hideNewGameScreen();
        // showGameBoard();
        allowPlaying();
        showDifficultyScreen();
        modifyScoreBoard_CPU();
        vs_cpu = true;
    });
}
function newGame_PVP(){
    let button1 = newGameScreen.querySelector(".button-2");
    button1.addEventListener('click', function(){
        hideNewGameScreen();
        showGameBoard();
        modifyScoreBoard_PVP();
        allowPlaying();
        vs_cpu = false;
        // console.log(player_1)
    });
}


function modifyScoreBoard_CPU(){
    let board = gameBoard;
    let blueScoreBoard = board.querySelector("#player-wins").querySelector(".score-heading");
    let yellowScoreBoard = board.querySelector("#cpu-wins").querySelector(".score-heading");
    if (player_1==="X"){
        blueScoreBoard.textContent = "X (YOU)";
        yellowScoreBoard.textContent = "O (CPU)"
    }else{
        blueScoreBoard.textContent = "X (CPU)";
        yellowScoreBoard.textContent = "O (YOU)"
    }

}
function modifyScoreBoard_PVP(){
    let board = gameBoard;
    let blueScoreBoard = board.querySelector("#player-wins").querySelector(".score-heading");
    let yellowScoreBoard = board.querySelector("#cpu-wins").querySelector(".score-heading");
    if (player_1==="X"){
        blueScoreBoard.textContent = "X (P1)";
        yellowScoreBoard.textContent = "O (P2)"
    }else{
        blueScoreBoard.textContent = "X (P2)";
        yellowScoreBoard.textContent = "O (P1)"
    }

}

function modifyPopScreen(winner){
    // console.log(vs_cpu)
    if(vs_cpu){
        if (winner === player_1){
            if(player_1==='O'){
                popUpScreen.querySelector("img").style.display = "block";
                popUpScreen.querySelector("#who-won").textContent = "TAKES THE ROUND";
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "YOU WON!"
                popUpScreen.querySelector("#result-msg").style.color = lightYellow;
                popUpScreen.querySelector("img").src = "assets/icon-o.svg";
                
            }else{
                popUpScreen.querySelector("img").style.display = "block";
                popUpScreen.querySelector("#who-won").textContent = "TAKES THE ROUND";
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "YOU WON!"
                popUpScreen.querySelector("#result-msg").style.color = lightBlue;
                popUpScreen.querySelector("img").src = "assets/icon-x.svg";
            }
            
        }else if(winner===player_cpu){
            if(player_cpu==='O'){
                popUpScreen.querySelector("#who-won").textContent = "TAKES THE ROUND";
                popUpScreen.querySelector("img").style.display = "block";
                popUpScreen.querySelector("#result-msg").style.color = lightYellow;
                popUpScreen.querySelector("img").src = "assets/icon-o.svg";
                console.log(winner)
            }else{
                popUpScreen.querySelector("img").style.display = "block";
                popUpScreen.querySelector("#who-won").textContent = "TAKES THE ROUND";
                popUpScreen.querySelector("#result-msg").style.color = lightBlue;
                popUpScreen.querySelector("img").src = "assets/icon-x.svg";
            }
        }else{
            popUpScreen.querySelector("#who-won").textContent = "ROUND TIED";
            popUpScreen.querySelector("#win-or-lose-msg").textContent = ""
            popUpScreen.querySelector("#result-msg").style.color = silver;
            popUpScreen.querySelector("img").style.display = "none";
        }
    }else{
        if (winner === player_1){
            if(player_1==='O'){
                popUpScreen.querySelector("#who-won").textContent = "TAKES THE ROUND";
                popUpScreen.querySelector("img").style.display = "block";
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "PLAYER 1 WINS"
                popUpScreen.querySelector("#result-msg").style.color = lightYellow;
                popUpScreen.querySelector("img").src = "assets/icon-o.svg";
            }else{
                popUpScreen.querySelector("#who-won").textContent = "TAKES THE ROUND";
                popUpScreen.querySelector("img").style.display = "block";
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "PLAYER 1 WINS!"
                popUpScreen.querySelector("#result-msg").style.color = lightBlue;
                popUpScreen.querySelector("img").src = "assets/icon-x.svg";
            }
            
        }else if(winner===player_2){
            if(player_2==='O'){
                popUpScreen.querySelector("#who-won").textContent = "TAKES THE ROUND";
                popUpScreen.querySelector("img").style.display = "block";
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "PLAYER 2 WINS"
                popUpScreen.querySelector("#result-msg").style.color = lightYellow;
                popUpScreen.querySelector("img").src = "assets/icon-o.svg";
            }else{
                popUpScreen.querySelector("#who-won").textContent = "TAKES THE ROUND";
                popUpScreen.querySelector("img").style.display = "block";
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "PLAYER 2 WINS"
                popUpScreen.querySelector("#result-msg").style.color = lightBlue;
                popUpScreen.querySelector("img").src = "assets/icon-x.svg";
            }
        }else{
            popUpScreen.querySelector("#who-won").textContent = "ROUND TIED";
            popUpScreen.querySelector("#win-or-lose-msg").textContent = ""
            popUpScreen.querySelector("#result-msg").style.color = silver;
            popUpScreen.querySelector("img").style.display = "none";
        }

    }
}


// FUNCTIONS FOR GRID AND PLAYING
function allowPlaying(){
    // console.log(playCells)
    playCells.forEach(div => {
        div.addEventListener('click', hitBoxHandler);
    });
}



function hitBoxHandler(event){
    place_X_or_O(event, playCells, currentPlayer, gameState); 
}

function toggleTurnIndicator(P){
    gameBoard.querySelector("#turn-indicator").querySelector("#turn-svg").src = `assets/icon-${P}-silver.svg`;
}

let place_X_or_O = function(event, playCells, currentPlayer, gameState){
    let clickedCell = event.target;
    let index = clickedCell.id; 
    let clickedCellImg = clickedCell.querySelector("img");
    console.log("click")
    console.log(gameState)

    if (clickedCell.classList.contains("non-played")) {
        clickedCell.classList.remove("non-played")
        updateaGameState(index,currentPlayer.value); 
        let imgSrc = (currentPlayer.value === 'X') ? "assets/icon-x.svg" : "assets/icon-o.svg";
        clickedCellImg.src = imgSrc; // Update the src attribute of the img element
        currentPlayer.value = (currentPlayer.value === 'X') ? 'O' : 'X';
        console.log(currentPlayer.value)
        let endOfGame = checkOutcome(gameState,playCells);
        toggleTurnIndicator(currentPlayer.value);

        (!endOfGame && vs_cpu)? playingCPU():"";
        toggleTurnIndicator(currentPlayer.value);
    }
    
}
let updateaGameState = function(index,currentPlayer){
    if (index==1){
        gameState["1"]+=[currentPlayer];
        gameState["4"]+=[currentPlayer];
        gameState["7"]+=[currentPlayer];
        gameState.isFull+=1;
        
    }
    else if(index==2){
        gameState["1"]+=[currentPlayer];
        gameState["5"]+=[currentPlayer];
        gameState.isFull+=1;
    }
    else if(index==3){
        gameState["1"]+=[currentPlayer];
        gameState["6"]+=[currentPlayer];
        gameState["8"]+=[currentPlayer];
        gameState.isFull+=1;
    }
    else if(index==4){
        gameState["2"]+=[currentPlayer];
        gameState["4"]+=[currentPlayer];
        gameState.isFull+=1;
    }
    else if(index==5){
        gameState["2"]+=[currentPlayer];
        gameState["5"]+=[currentPlayer];
        gameState["7"]+=[currentPlayer];
        gameState["8"]+=[currentPlayer];
        gameState.isFull+=1;
    }
    else if(index==6){
        gameState["2"]+=[currentPlayer];
        gameState["6"]+=[currentPlayer];
        gameState.isFull+=1;
    }
    else if(index==7){
        gameState["3"]+=[currentPlayer];
        gameState["4"]+=[currentPlayer];
        gameState["8"]+=[currentPlayer];
        gameState.isFull+=1;
    }
    else if(index==8){
        gameState["3"]+=[currentPlayer];
        gameState["5"]+=[currentPlayer];
        gameState.isFull+=1;
    }
    else if(index==9){
        gameState["3"]+=[currentPlayer];
        gameState["6"]+=[currentPlayer];
        gameState["7"]+=[currentPlayer];
        gameState.isFull+=1;
    }
    // console.log(gameState)

}

let checkOutcome = function(gameState,divs){
    gameEnded = false;
    // console.log(gameState[1]);
    for (let key in gameState) {
        let value = gameState[key]; 
        if (value[0] === "O" && value[1] === "O" && value[2] === "O") {
            // console.log("here")
            showPopUpScreen('O');
            updateScoreBoard_CPU("O")
            gameEnded = true;
            // disablePlaying(divs);
            
        } else if (value[0] === "X" && value[1] === "X" && value[2] === "X") {
            showPopUpScreen('X');
            updateScoreBoard_CPU("X")
            gameEnded = true;
            
        }
        else if ((gameState.isFull==9)&&(gameEnded==false)){
            showPopUpScreen('T');
            updateScoreBoard_CPU("T")
            gameEnded = true;
        }
    }
    return gameEnded;
}

function newRound(){
    nextButton = document.getElementById("next-button");
    nextButton.addEventListener('click', function(){
        nextGameListener();
        console.log(gameEnded,gameState)
        console.log(gameEnded)
    })
    
}

function gameReset(){

}

function nextGameListener(){
    nextButton = document.getElementById("next-button");
    gameState = {
        //Couting from top for rows and from left for columns
        "1": [], //row 1 
        "2": [], //row 2
        "3": [], //row 3
        "4": [], //column 1
        "5": [], //column 2 
        "6": [],  //column 3
        "7": [], //diagonal 1
        "8": [], //diagonal 2
        "isFull": 0,
    };
    playCells.forEach(div => {
        if(!div.classList.contains("non-played")){
            div.classList.add("non-played")
        }
    });
    hidePopUpScreen();
    showGameBoard();
    gameEnded = false;
    playCells.forEach(div => {
        div.querySelector("img").src = "";
    });
    popUpScreen.querySelector("#win-or-lose-msg").textContent = "OH NO, YOU LOST"
    currentPlayer.value = "X";
    toggleTurnIndicator("X");
    (vs_cpu)? playingCPU(): "";
}

function updateScoreBoard_CPU(winner){
    let CPU_scores_display = gameBoard.querySelector("#scores-portion");
    if(vs_cpu){
        if(winner==="X"){
            console.log("here");
            vsCPU_scores[0]+=1;
            CPU_scores_display.querySelector("#player-wins").querySelector(".score").textContent = vsCPU_scores[0]+"";
        }else if(winner==="O"){
            vsCPU_scores[2]+=1;
            CPU_scores_display.querySelector("#cpu-wins").querySelector(".score").textContent = vsCPU_scores[2]+"";
        }else if (winner==="T"){
            vsCPU_scores[1]+=1;
            CPU_scores_display.querySelector("#player-ties").querySelector(".score").textContent = vsCPU_scores[1]+"";
        }
    }else{
        if(winner==="X"){
            console.log("here");
            vsCPU_scores[0]+=1;
            CPU_scores_display.querySelector("#player-wins").querySelector(".score").textContent = vsCPU_scores[0]+"";
        }else if(winner==="O"){
            vsCPU_scores[2]+=1;
            CPU_scores_display.querySelector("#cpu-wins").querySelector(".score").textContent = vsCPU_scores[2]+"";
        }else if (winner==="T"){
            vsCPU_scores[1]+=1;
            CPU_scores_display.querySelector("#player-ties").querySelector(".score").textContent = vsCPU_scores[1]+"";
        }
    }

}

//Difficulty Button Listeners 

function gameDifficulty(){
    let easy = document.querySelector("#easy-button");
    let medium = document.querySelector("#medium-button");
    let impossible = document.querySelector("#impossible-button");

    easy.addEventListener('click', function(){
        showGameBoard();
        hideDifficultyScreen();
        gameMode = 'E';
        playingCPU();
    })
    medium.addEventListener('click', function(){
        gameMode = 'M';
        showGameBoard();
        hideDifficultyScreen();
    })
    impossible.addEventListener('click', function(){
        gameMode = 'I';
        showGameBoard();
        hideDifficultyScreen();
    })
    
}


function playingCPU(){
    cpu_turn = (currentPlayer.value===player_cpu)? true: false;
    if (cpu_turn){//create variable
        let index = cpuPlay();//create function
        cpu_turn = false;
        updateaGameState(index,currentPlayer.value);
        currentPlayer.value = (currentPlayer.value === 'X') ? 'O' : 'X';
        checkOutcome(gameState,playCells);
        
    }
}

function cpuPlay(){
    while (true){
        let randomDecimal = Math.random()*9;
        let randomIntegerBetween1And9 = Math.floor(randomDecimal)+1;
        console.log(randomIntegerBetween1And9);
        if (document.getElementById(randomIntegerBetween1And9).classList.contains("non-played")){
            console.log("here");
            cpuMakesMoves(randomIntegerBetween1And9);
            (checkOutcome(gameState, playCells)==false) ? toggleTurnIndicator(currentPlayer.value):console.log();
            return randomIntegerBetween1And9;
        }
    }
}

function cpuMakesMoves(num){
    let I = currentPlayer.value;
    document.getElementById(num).querySelector("img").src = `assets/icon-${I}.svg`;
    document.getElementById(num).classList.remove("non-played");

}

// function cellsHover(){
//     playCells.forEach(cell => {
//         cell.addEventListener('mouseenter', function() {
//             if(cell.classList.contains("non-played")){
//                 cell.querySelector("img").src = `assets/icon-${currentPlayer.value}-outline.svg`;
//             }
//         });
//       });
//     playCells.forEach(cell => {
//         cell.addEventListener('mouseleave', function() {
//             if(cell.classList.contains("non-played")){
//                 cell.querySelector("img").src = "";
//             }
//         });
//       });
// }

//approach from the angle of the CPU reacting to players moves, unless cpu goes first
//