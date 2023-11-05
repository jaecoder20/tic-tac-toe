//DOM ELEMENTS
let newGameScreen = document.getElementById("new-game-container");
let gameBoard = document.getElementById("game-board");
let popUpScreen = document.getElementById("pop-screen")
let difficultyScreen = document.getElementById("difficulty-screen");
let popUpScreenRestart = document.getElementById("pop-screen-r");
let playerSelector_X = document.getElementById("x-selector")
let playerSelector_O = document.getElementById("o-selector")

// Imported CSS COLORS
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

//GLOBAL VARIABLES
let gameState;
let playCells;
let winner;
let currentPlayer;
let playArea;
let vs_cpu;
let gameEnded;
let vsCPU_scores;
let PVP_scores;
let gameMode;
let cpu_turn;
let player_1,player_2,player_cpu;

//EVENT LISTENERS
function startGame(){
    window.addEventListener('DOMContentLoaded', () => {
        playArea = gameBoard.querySelector("#grid-portion");
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
        vsCPU_scores = [0,0,0];
        PVP_scores = [0,0,0];
        hideAllScreens();
        showNewGameScreen();
        newRound();
        gameReset();
        preplayHover();
    });
}

function gameDifficulty(){
    let easy = document.querySelector("#easy-button");
    let medium = document.querySelector("#medium-button");
    let impossible = document.querySelector("#impossible-button");

    easy.addEventListener('click', function(){

        showGameBoard();
        hideDifficultyScreen();
        gameMode = "E";
        playingCPU(gameMode);
    })
    medium.addEventListener('click', function(){
        gameMode = 'M';
        showGameBoard();
        hideDifficultyScreen();
        playingCPU(gameMode);
    })
    impossible.addEventListener('click', function(){
        gameMode = 'I';
        showGameBoard();
        hideDifficultyScreen();
    })
    
}
function nextGameListener(){
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
    preplayHover();
    playCells.forEach(div => {
        div.style.backgroundImage = "url()"
        if(!div.classList.contains("non-played")){
            div.classList.add("non-played");
        }
    });
    hidePopUpScreen();
    showGameBoard();
    gameEnded = false;
    playCells.forEach(div => {
        div.querySelector("img").src = "";
    });
    popUpScreen.querySelector("#win-or-lose-msg").textContent = "OH NO, YOU LOST"
    // currentPlayer.value = "X";
    toggleTurnIndicator("X");

    (vs_cpu)? playingCPU(): "";
}
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
        changeScores();
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
        changeScores();
    });
}
function newRound(){
    let nextButton = document.getElementById("next-button");
    let quitButton = document.getElementById("quit-button");
    nextButton.addEventListener('click', function(){
        nextGameListener();
        console.log(currentPlayer.value)
        currentPlayer.value = (currentPlayer.value==="O")? "O": "X";
    })    
    quitButton.addEventListener('click', function(){
        resetScores();
        hideAllScreens();
        nextGameListener();
        hideGameBoard();
        showNewGameScreen();
    })    
}
function resetScores(){
    for(let i=0;i<3;i++){
        PVP_scores[i] = 0;
        vsCPU_scores[i] = 0;
    }
}


function gameReset(){
    let reset = document.getElementById("reset-container");
    reset.addEventListener('click', function(){
        showPopUpScreenRestart();
        restartorCancelBtnListener();
    })    
}

function restartorCancelBtnListener(){
    let restartBtn = document.getElementById("restart-button");
    restartBtn.addEventListener('click', function(){
        nextGameListener();
        hidePopUpScreenRestart();
    })  
    let cancelBtn = document.getElementById("cancel-button");
    cancelBtn.addEventListener('click', function(){
        hidePopUpScreenRestart();
        showGameBoard();
    })  
}

//SHOW SCREEN FUNCTIONS
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
    gameBoard.style.zIndex = "-1";
    popUpScreenRestart.style.display = 'flex';
}

// HIDE SCREEN FUNCTIONS
function hideNewGameScreen(){
    newGameScreen.style.display = 'none';
}
function hideGameBoard(){
    gameBoard.style.display = 'none';
}
function hidePopUpScreen(){
    popUpScreen.style.display = 'none';
}
function hideDifficultyScreen(){
    difficultyScreen.style.display = 'none';
}
function hidePopUpScreenRestart(){
    popUpScreenRestart.style.display = 'none';
}

function hideAllScreens(){
    hideNewGameScreen();
    hideGameBoard();
    hidePopUpScreen();
    hideDifficultyScreen();
    hidePopUpScreenRestart();
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
    playCells.forEach(div => {
        div.addEventListener('click', hitBoxHandler);
    });
}

function hitBoxHandler(event){
    place_X_or_O(event, playCells, currentPlayer, gameState); 
}

function toggleTurnIndicator(P){
    P = (P==="X") ? "x": "o";
    gameBoard.querySelector("#turn-indicator").querySelector("#turn-svg").src = `assets/icon-${P}-silver.svg`;
}

let place_X_or_O = function(event, playCells, currentPlayer, gameState){
    let clickedCell = event.target;
    let index = clickedCell.id; 
    let clickedCellImg = clickedCell.querySelector("img");
    

    if (clickedCell.classList.contains("non-played")) {
        console.log("clicked")
        clickedCell.classList.remove("non-played")
        clickedCell.removeEventListener("mouseleave", hoverOut);
        clickedCell.removeEventListener("mouseenter", hoverIn);
        updateaGameState(index,currentPlayer.value); 
        let imgSrc = (currentPlayer.value === 'X') ? "assets/icon-x.svg" : "assets/icon-o.svg";
        clickedCellImg.src = imgSrc; 
        currentPlayer.value = (currentPlayer.value === 'X') ? 'O' : 'X';
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
}
let checkOutcome = function(gameState,divs){
    for (let key in gameState) {
        let value = gameState[key]; 
        if (value[0] === "O" && value[1] === "O" && value[2] === "O") {
            showPopUpScreen('O');
            updateScoreBoard_CPU("O");
            return true;
            
        } else if (value[0] === "X" && value[1] === "X" && value[2] === "X") {
            showPopUpScreen('X');
            updateScoreBoard_CPU("X");
            return true;
            
        }
    }
    if (gameState.isFull==9){
        showPopUpScreen('T');
        updateScoreBoard_CPU("T");
        return true;
    }
    return false;
}
function updateScoreBoard_CPU(winner){
    let scores_display = gameBoard.querySelector("#scores-portion");
    if(vs_cpu){
        if(winner==="X"){
            vsCPU_scores[0]+=1;
            scores_display.querySelector("#player-wins").querySelector(".score").textContent = vsCPU_scores[0]+"";
        }else if(winner==="O"){
            vsCPU_scores[2]+=1;
            scores_display.querySelector("#cpu-wins").querySelector(".score").textContent = vsCPU_scores[2]+"";
        }else if (winner==="T"){
            vsCPU_scores[1]+=1;
            scores_display.querySelector("#player-ties").querySelector(".score").textContent = vsCPU_scores[1]+"";
        }
    }else if(!vs_cpu){
        if(winner==="X"){
            PVP_scores[0]+=1;
            scores_display.querySelector("#player-wins").querySelector(".score").textContent = PVP_scores[0]+"";
        }else if(winner==="O"){
            PVP_scores[2]+=1;
            scores_display.querySelector("#cpu-wins").querySelector(".score").textContent = PVP_scores[2]+"";
        }else if (winner==="T"){
            PVP_scores[1]+=1;
            scores_display.querySelector("#player-ties").querySelector(".score").textContent = PVP_scores[1]+"";
        }
    }

}
function changeScores(){
    let scores_display = gameBoard.querySelector("#scores-portion");
    if (vs_cpu){
        scores_display.querySelector("#player-wins").querySelector(".score").textContent = vsCPU_scores[0]+"";
        scores_display.querySelector("#cpu-wins").querySelector(".score").textContent = vsCPU_scores[2]+"";
        scores_display.querySelector("#player-ties").querySelector(".score").textContent = vsCPU_scores[1]+"";
    }else{
        scores_display.querySelector("#player-wins").querySelector(".score").textContent = PVP_scores[0]+"";
        scores_display.querySelector("#cpu-wins").querySelector(".score").textContent = PVP_scores[2]+"";
        scores_display.querySelector("#player-ties").querySelector(".score").textContent = PVP_scores[1]+"";
    }
}




//FUNCTIONS FOR CPU PLAYING
function playingCPU(){
    cpu_turn = (currentPlayer.value===player_cpu)? true: false;
    if (cpu_turn){//create variable
        let index = cpuPlay();//create function
        cpu_turn = false;
        cpuMakesMoves(index);
        updateaGameState(index,currentPlayer.value);
        currentPlayer.value = (currentPlayer.value === 'X') ? 'O' : 'X';
        checkOutcome(gameState,playCells);
        
    }
}

function cpuPlay(){
    if (gameMode==="E"){
        return easyAlgorithm();
    }else if (gameMode==="M"){
        return mediumAlgorithm();
    }
}

function cpuMakesMoves(num){
    let I = (currentPlayer.value==="X")? "x": "o";
    let playedCell = document.getElementById(num);
    playedCell.querySelector("img").src = `assets/icon-${I}.svg`;
    playedCell.classList.remove("non-played");
    playedCell.removeEventListener("mouseleave", hoverOut);
    playedCell.removeEventListener("mouseenter", hoverIn);

}

function easyAlgorithm(){
    return randomMove();
}
function randomMove(){
    console.log("random")
    while (true){
        let randomDecimal = Math.random()*9;
        let randomIntegerBetween1And9 = Math.floor(randomDecimal)+1;
        if (document.getElementById(randomIntegerBetween1And9).classList.contains("non-played")){
            (checkOutcome(gameState, playCells)==false) ? toggleTurnIndicator(currentPlayer.value):console.log();
            return randomIntegerBetween1And9;
        }
    }
}

function mediumAlgorithm(){
    // Immediate winning move
    for (let i=1;i<8;i++){
        if(gameState[i].length<3){
            for (let j=0;j<3;j++){
                if (gameState[i][j]===undefined){
                    let gameCopy = gameState[i]+[player_cpu];
                    let tileNumberW = findMapping(i,j);
                    if (checkWin(gameCopy,player_cpu) && document.getElementById(tileNumberW).classList.contains("non-played")){
                        console.log("true")
                        return tileNumberW;
                }
                }
            }
        }
    }
    //Immediate blocking move
    for (let i=1;i<8;i++){
        if(gameState[i].length<3){
            for (let j=0;j<3;j++){
                if (gameState[i][j]===undefined){
                    let gameCopy = gameState[i]+[player_1];
                    let tileNumberB = findMapping(i,j);
                    if (checkWin(gameCopy,player_1) && document.getElementById(tileNumberB).classList.contains("non-played")){
                        return tileNumberB;
                }
                }
            }
        }
    }

    return randomMove();
}

function findMapping(array, seq) {
    switch (array) {
        case 1:
            return 1 + seq;
        case 2:
            return 4 + seq;
        case 3:
            return 7 + seq;
        case 4:
            return 3 * (seq + 1) - 2;
        case 5:
            return 3 * (seq + 1) - 1;
        case 6:
            return 3 * (seq + 1);
        case 7:
            return 4 * (seq + 1) - 3;
        case 8:
            return 2 * (seq + 1) + 1;
        default:
            return null; 
    }
}

let checkWin = function(gameState1,player){
        let value = gameState1; 
        if (value[0] === player && value[1] === player && value[2] === player) {
            return true;
        } 
    return false;

}

function preplayHover(){
    playCells.forEach(div => {
        div.addEventListener('mouseenter', hoverIn);
    });
    playCells.forEach(div => {
        div.addEventListener('mouseleave', hoverOut);
    });

}

function hoverIn(event){
    let hoverCell = event.target;
    if (currentPlayer.value==="X"){
        hoverCell.style.backgroundImage = "url(assets/icon-x-outline.svg)";
    }else{
        hoverCell.style.backgroundImage = "url(assets/icon-o-outline.svg)";
    }
}
function hoverOut(event){
    let hoverCell = event.target;
    hoverCell.style.backgroundImage = "url()";
}

startGame();