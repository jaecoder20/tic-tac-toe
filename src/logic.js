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
const darkNavy = getComputedStyle(document.documentElement).getPropertyValue('--dark-navy');
const semiDarkNavy = getComputedStyle(document.documentElement).getPropertyValue('--semi-dark-navy');
const silver = getComputedStyle(document.documentElement).getPropertyValue('--silver');
const silverHover = getComputedStyle(document.documentElement).getPropertyValue('--silver-hover');
const button1Shadow = getComputedStyle(document.documentElement).getPropertyValue('--button-1-shadow');
const button2Shadow = getComputedStyle(document.documentElement).getPropertyValue('--button-2-shadow');
const playerSelector = getComputedStyle(document.documentElement).getPropertyValue('--player-selector');
const playboxShadow = getComputedStyle(document.documentElement).getPropertyValue('--playbox-shadow');
const greyShadow = getComputedStyle(document.documentElement).getPropertyValue('--grey-shadow');


let currentPlayer = "X";

window.addEventListener('DOMContentLoaded', () => {
    showNewGameScreen();
    // showGameBoard();
    // showPopUpScreen();
    // showDifficultyScreen();
    // showPopUpScreenRestart();
});


function showNewGameScreen(){
    newGameScreen.style.display = 'flex';
    hoverPlayerEvent();
    switchFirstPlayerEvent();
}
function showGameBoard(){
    gameBoard.style.display = 'block';
}
function showPopUpScreen(){
    popUpScreen.style.display = 'flex';
    showGameBoard();
}
function showDifficultyScreen(){
    difficultyScreen.style.display = 'flex';
}
function showPopUpScreenRestart(){
    popUpScreenRestart.style.display = 'flex';
}

function hoverPlayerEvent(){
    playerSelector_O.addEventListener("mouseenter",function(){
        if (currentPlayer === "X"){
            playerSelector_O.style.backgroundColor = semiDarkNavy;
            playerSelector_O.style.cursor = "pointer";
        }
    });
    playerSelector_O.addEventListener("mouseleave",function(){
        if (currentPlayer === "X"){
            playerSelector_O.style.backgroundColor = darkNavy;
        }
    });
    playerSelector_X.addEventListener("mouseenter",function(){
        if (currentPlayer === "O"){
            playerSelector_X.style.backgroundColor = semiDarkNavy;
            playerSelector_X.style.cursor = "pointer";
        }
    });
    playerSelector_X.addEventListener("mouseleave",function(){
        if (currentPlayer === "O"){
            playerSelector_X.style.backgroundColor = darkNavy;
        }
    });
}

function switchFirstPlayerEvent(){
    playerSelector_O.addEventListener('click', function(){
        if (currentPlayer==='O'){
            console.log("");
        }else{
            currentPlayer = "O";
            console.log(currentPlayer);
            playerSelector_O.style.backgroundColor = silver;
            playerSelector_X.style.backgroundColor = darkNavy;
            let svgs = document.querySelectorAll(".svg-selectors");
            svgs[0].src = "assets/icon-x-silver.svg";
            svgs[1].src = "assets/icon-o-dark.svg";

        }
    })
    playerSelector_X.addEventListener('click', function(){
        if (currentPlayer==='X'){
        }else{
            currentPlayer = "X";
            console.log(currentPlayer);
            playerSelector_O.style.backgroundColor = darkNavy;
            playerSelector_X.style.backgroundColor = silver;
            let svgs = document.querySelectorAll(".svg-selectors");
            svgs[0].src = "assets/icon-x-dark.svg";
            svgs[1].src = "assets/icon-o-silver.svg";

        }
    })
}