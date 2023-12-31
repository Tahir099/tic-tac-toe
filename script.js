const gameContainer = document.getElementById("GameContainer");
const createBtn = document.getElementById("createBtn");
const countInput = document.getElementById("countInput");
const displayPlayer = document.getElementById("player");
const winner = document.getElementById("winner");
const resetBtn = document.getElementById("resetBtn");
let a = 0;
let player = "X";
let board = [];
let gameOver = false;

resetBtn.addEventListener("click", function () {
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    board = [];
    gameOver = false;
    player = "X";
    displayPlayer.textContent = "Player " + player;
    winner.textContent = "";

    const boardSize = parseInt(countInput.value, 10);
    if (!isNaN(boardSize) && boardSize > 0) {
        initialGameArea(boardSize);
    } else {
        alert("Geçerli bir board boyutu seçin");
    }
});


displayPlayer.textContent = "player " + player;
function initializeBoard(boardSize) {
    for (let row = 0; row < boardSize; row++) {
        let boardRow = [];
        for (let column = 0; column < boardSize; column++) {
            boardRow.push('-');
        }
        board.push(boardRow);
    }
}

 

createBtn.addEventListener("click", function () {
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }
    
    const boardSize = parseInt(countInput.value, 10);
    if (!isNaN(boardSize) && boardSize > 0) {
        initialGameArea(boardSize);
    } else {
        alert("Düzgün rəqəm seçin");
    }
});

countInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        createBtn.click();
    }
});



function cellClickHandler(row, j, i, size) {
    displayPlayer.textContent = "player " + player;
    if (row.textContent === "" && !gameOver) {
        board[j][i] = (player === "X") ? "X" : "0";
        checkWinner(size, i, j, player);
        row.textContent = board[j][i];
        player = (player === "X") ? "0" : "X";
    }
}

function initialGameArea(size) {
    initializeBoard(size);
    for (let i = 0; i < size; i++) {
        const column = document.createElement("div");
        column.classList.add("column");
        column.style.width = (100 / 3) + "%";
        for (let j = 0; j < size; j++) {
            const row = document.createElement("div");
            row.classList.add("row");
            row.style.height = (100 / 3) + "%";
            row.id = `row_${i}_${j}`;
            row.addEventListener("click", () => cellClickHandler(row, j, i, size));
            column.appendChild(row);
        }
        gameContainer.appendChild(column);
    }
}



function checkWinner(boardSize, positionX, positionY, player) {
    let columnCount = 0;
    let rowCount = 0;
    let diagonalCount1 = 0; 
    let diagonalCount2 = 0;

    for (let index = 0; index < boardSize; index++) {
        if (board[index][positionX] === player) {
            columnCount++;
        }
    }

    for (let index = 0; index < boardSize; index++) {
        if (board[positionY][index] === player) {
            rowCount++;
        }
    }

    if (positionX === positionY) {
        for (let index = 0; index < boardSize; index++) {
            if (board[index][index] === player) {
                diagonalCount1++;
            }
        }
    }

    if (positionX + positionY === boardSize - 1) {
        for (let index = 0; index < boardSize; index++) {
            if (board[index][boardSize - 1 - index] === player) {
                diagonalCount2++;
            }
        }
    }

    if (
        columnCount === boardSize ||
        rowCount === boardSize ||
        diagonalCount1 === boardSize ||
        diagonalCount2 === boardSize
    ) {
        winner.textContent = "winner" + player;
        gameOver = true;
        if(columnCount === boardSize){
            for(let index = 0 ; index < boardSize ; index++){
                let a = document.getElementById(`row_${positionX}_${index}`);
                a.classList.add("active");
            }
        }
        if(rowCount === boardSize){
            for(let index = 0 ; index < boardSize ; index++){
                let a = document.getElementById(`row_${index}_${positionY}`);
                a.classList.add("active");          
              }
        }
        if(diagonalCount1 === boardSize){
            for(let i = 0 ; i < boardSize ; i++){
                let a = document.getElementById(`row_${i}_${i}`);
                a.classList.add("active");          
               } 
        }
        if(diagonalCount2 === boardSize){
            for(let i = 0 ; i < boardSize ; i++){
                let a = document.getElementById(`row_${i}_${boardSize - i - 1}`);
                a.classList.add("active"); 
            } 
        }
    }
}