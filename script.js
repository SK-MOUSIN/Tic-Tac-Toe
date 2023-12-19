//Variable Selection:
var box = document.querySelectorAll(".box");
var gameBoxContainer = document.querySelector(".boxes");
var gameBox = document.querySelector("#game");
var headingContainer = document.querySelector(".game-heading");
var userNameOne = document.getElementById("userNameFirst");
var userNameTwo = document.getElementById("userNameSecond");
var infoContainer = document.querySelector("#info");
var infoHeading = document.querySelector(".info-heading");
var playerContainer = document.querySelector(".playerContainer");
var btnOne = document.querySelector(".switchOne");
var btnTwo = document.querySelector(".switchTwo");
var btnThree = document.querySelector(".switchThree");
var winnerNamePrint = document.querySelector(".winner");
var drawDiv = document.querySelector(".draw");
var showResult = document.querySelector("#result");
var gameheading = document.querySelector(".headline");
var mainPage = document.querySelector("#main")
var playerNameX;
var playerNameO;
var count = 0;

// //At the starting all buttons are diabled 
function disabledButton(){
    btnTwo.disabled = true;
    btnThree.disabled = true;
    btnOne.disabled = true;
}
disabledButton();

// Game Winning Patterns:
var winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

// print X and O
function printingValues() {
    var isPlayerOne = true
    box.forEach(function(box){
        box.addEventListener("click", function(){
            if(isPlayerOne){
                box.innerHTML = "X";
                box.style.color = "red";
                box.style.backgroundColor = "#000";
                isPlayerOne = false;
                box.disabled = true;
            }else {
                box.innerHTML = "O";
                box.style.color = "red";
                box.style.backgroundColor = "#000";
                isPlayerOne = true;
                box.disabled = true;
            }
            let iswinner = checkWinner();
            count++;
            if(count===9 && !iswinner){
                gameDraw();
            }
        })
    })
}
printingValues();

//After ending game all boxes are disabled
function disableAllBox(){
    for(let bx of box){
        bx.disabled = true;
    }
}

//Check Winner:
function checkWinner() {
    for(let pattern of winningPatterns){
        var posOne = box[pattern[0]].innerText;
        var posTwo = box[pattern[1]].innerText;
        var posThird = box[pattern[2]].innerText;

        if(posOne != "" && posTwo != "" && posThird != ""){
            if(posOne === posTwo && posTwo === posThird){
                var winnerName = (posOne === "X") ? playerNameX : playerNameO;
                
                winnerNamePrint.innerText = `Congratulations!! ${winnerName} win The Match!!`;
                winnerNamePrint.style.display = "block";
                resultAnnounce();
                disableAllBox();
            }
        }
    }
}

//After finishing game those task will perform
function resultAnnounce(){
    gameheading.style.display = "none";
    mainPage.style.backgroundColor = "#1B4242";
    gameBox.style.backgroundColor = "#1B4242";
    headingContainer.style.backgroundColor = "#000";
    headingContainer.style.border = "2px solid #1B4242";
    infoContainer.style.backgroundColor = "#1B4242";
    btnOne.style.backgroundColor = "rgba(85, 204, 137, 0.262)";
    btnTwo.style.backgroundColor = "rgba(85, 204, 137, 0.262)";
    btnThree.style.backgroundColor = "rgba(85, 204, 137, 0.262)";
    infoHeading.style.backgroundColor = "rgba(85, 204, 137, 0.262)";
    playerContainer.style.backgroundColor = "rgba(85, 204, 137, 0.262)";
    btnTwo.disabled = true;
    btnThree.disabled = false;
}

// Start Button
function startButton (){
    btnOne.addEventListener("click", function(){
        gameBox.style.scale = 1;
        gameBoxContainer.style.scale = 1;
        btnOne.disabled = true;
        btnTwo.disabled = false;
        userNameOne.disabled = true;
        userNameTwo.disabled = true;
        playerNameX = userNameOne.value;
        playerNameO = userNameTwo.value;
    })
}
startButton();

//Reset Button
function resetButton(){
    btnTwo.addEventListener("click", function(){
        box.forEach(function(box){
            box.innerText = "";
            box.style.backgroundColor = "transparent";
            box.disabled = false;
        })
        // Clear the content of the "winner" div
        winnerNamePrint.innerHTML = "";
        // Re-enable the start button
        btnOne.disabled = true;
    })
}
resetButton()

//New Game button
btnThree.addEventListener("click", function(){
    box.forEach(function(box){
        location.reload();
    })
})

//Input take then the start button will work
function startBtnWorkAfterTakeInput(){
    userNameOne.addEventListener("input", checkInput);
    userNameTwo.addEventListener("input", checkInput);

    function checkInput(){
        var userNameFirstValue = userNameOne.value.trim();
        var userNameSecondValue = userNameTwo.value.trim();

        btnOne.disabled = !(userNameFirstValue && userNameSecondValue);
    }
}
startBtnWorkAfterTakeInput();

// Function to check for a draw
function gameDraw(){
    drawDiv.style.display = "block";
    resultAnnounce();
}