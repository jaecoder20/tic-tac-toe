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
let winner;
let currentPlayer;
let playArea;
let vs_cpu;
let gameEnded;

let player_1,player_2,player_cpu;
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


    // hideGameBoard();
    // hidePopUpScreen();
    // hideDifficultyScreen();
    // hidePopUpScreenRestart();
    showNewGameScreen();
    // showGameBoard();
    newRound();
    

});

//SHOW DIFFERENT SCREENS
function showNewGameScreen(){
    newGameScreen.style.display = 'flex';
    hoverPlayerEvent();
    switchFirstPlayerEvent();
    newGame_CPU();
    newGame_PVP();
}
function showGameBoard(){
    gameBoard.style.display = 'block';
    gameBoard.style.zIndex = "0";
    allowPlaying();
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
        if (currentPlayer.value === "X"){
            playerSelector_O.style.backgroundColor = semiDarkNavy;
            playerSelector_O.style.cursor = "pointer";
        }
    });
    playerSelector_O.addEventListener("mouseleave",function(){
        if (currentPlayer.value === "X"){
            playerSelector_O.style.backgroundColor = darkNavy;
        }
    });
    playerSelector_X.addEventListener("mouseenter",function(){
        if (currentPlayer.value === "O"){
            playerSelector_X.style.backgroundColor = semiDarkNavy;
            playerSelector_X.style.cursor = "pointer";
        }
    });
    playerSelector_X.addEventListener("mouseleave",function(){
        if (currentPlayer.value === "O"){
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

        // console.log(currentPlayer)
        // console.log(player_1)
        // console.log(player_2)
        // console.log(player_cpu)

        
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

        // console.log(currentPlayer)
        // console.log(player_1)
        // console.log(player_2)
        // console.log(player_cpu)

        
    })
}

function newGame_CPU(){
    let button1 = newGameScreen.querySelector(".button-1");
    button1.addEventListener('click', function(){
        hideNewGameScreen();
        showGameBoard();
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
        vs_cpu = false;
        // console.log(player_1)
    });
}


function modifyScoreBoard_CPU(){
    let board = gameBoard;
    let blueScoreBoard = board.querySelector("#player-wins").querySelector(".score-heading");
    let yellowScoreBoard = board.querySelector("#cpu-wins").querySelector(".score-heading");
    if (currentPlayer.value==="X"){
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
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "YOU WON!"
                popUpScreen.querySelector("#result-msg").style.color = lightYellow;
                popUpScreen.querySelector("img").src = "assets/icon-o.svg";
            }else{
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "YOU WON!"
                popUpScreen.querySelector("#result-msg").style.color = lightBlue;
                popUpScreen.querySelector("img").src = "assets/icon-x.svg";
            }
            
        }else if(winner===player_cpu){
            if(player_cpu==='O'){
                popUpScreen.querySelector("#result-msg").style.color = lightYellow;
                popUpScreen.querySelector("img").src = "assets/icon-o.svg";
            }else{
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
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "PLAYER 1 WINS"
                popUpScreen.querySelector("#result-msg").style.color = lightYellow;
                popUpScreen.querySelector("img").src = "assets/icon-o.svg";
            }else{
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "PLAYER 1 WINS!"
                popUpScreen.querySelector("#result-msg").style.color = lightBlue;
                popUpScreen.querySelector("img").src = "assets/icon-x.svg";
            }
            
        }else if(winner===player_2){
            if(player_2==='O'){
                popUpScreen.querySelector("#win-or-lose-msg").textContent = "PLAYER 2 WINS"
                popUpScreen.querySelector("#result-msg").style.color = lightYellow;
                popUpScreen.querySelector("img").src = "assets/icon-o.svg";
            }else{
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

let place_X_or_O = function(event, playCells, currentPlayer, gameState){
    let clickedCell = event.target;
    let index = clickedCell.id; 
    let clickedCellImg = clickedCell.querySelector("img");;

    if (clickedCell.classList.contains("non-played")) {
        clickedCell.classList.remove("non-played")
        updateaGameState(index,currentPlayer.value); 
        let imgSrc = (currentPlayer.value === 'X') ? "assets/icon-x.svg" : "assets/icon-o.svg";
        clickedCellImg.src = imgSrc; // Update the src attribute of the img element
        currentPlayer.value = (currentPlayer.value === 'X') ? 'O' : 'X';
        // console.log(clickedCell.classList);
        checkOutcome(gameState, playCells);
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
            gameEnded = true;
            // disablePlaying(divs);
            
        } else if (value[0] === "X" && value[1] === "X" && value[2] === "X") {
            showPopUpScreen('X');
            gameEnded = true;
            
        }
        else if ((gameState.isFull==9)&&(gameEnded==false)){
            showPopUpScreen('T');
        }
    }
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
    //reset gameState
    // add non-played classes back to divs who lost the class
    // hide pop screen
    // bring gameboard back to z-index 0
    //set game ended back to false
    // set all cell src to ""
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


}