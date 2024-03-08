var materiali = ["cartone", "vetro", "plastica", "indifferenziata"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function () {
    startGame();

    window.setInterval(function () {
        crushMateriali();
        slideMateriali();
        generaMateriali();
    }, 100);
};

function randomMateriale() {
    return materiali[Math.floor(Math.random() * materiali.length)];
}

function startGame() {
    score = 0; // puntrggio 0
    document.getElementById("score").innerText = score; 

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomMateriale() + ".png";

            // drag
            tile.setAttribute("draggable", true);
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart(e) {
    currTile = this;
    e.dataTransfer.setData("text/plain", null);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
    swapTiles();
}

function dragEnd() {}

function swapTiles() {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let isAdjacent = Math.abs(r - r2) + Math.abs(c - c2) === 1;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        if (!checkValid()) {
            currTile.src = currImg;
            otherTile.src = otherImg;
        }
    }
}

function crushMateriali() {
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    //controlla righe
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let materiale1 = board[r][c];
            let materiale2 = board[r][c + 1];
            let materiale3 = board[r][c + 2];

            if (
                materiale1.src === materiale2.src &&
                materiale2.src === materiale3.src &&
                !materiale1.src.includes("blank")
            ) {
                getMaterialScore(materiale1.src);
                console.log(score)
                document.getElementById("score").innerHTML = score
                materiale1.src = "./images/blank.png";
                materiale2.src = "./images/blank.png";
                materiale3.src = "./images/blank.png";
            }
        }
    }

    // controlla colonne
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let materiale1 = board[r][c];
            let materiale2 = board[r + 1][c];
            let materiale3 = board[r + 2][c];

            if (
                materiale1.src === materiale2.src &&
                materiale2.src === materiale3.src &&
                !materiale1.src.includes("blank")
            ) {
                getMaterialScore(materiale1.src);
                console.log(score)
                document.getElementById("score").innerHTML = score
                materiale1.src = "./images/blank.png";
                materiale2.src = "./images/blank.png";
                materiale3.src = "./images/blank.png";
            }
        }
    }
}

function getMaterialScore(material) {
  console.log('f');

  if (material === "./images/cartone.png") {
      score += 2;
  } else if (material === "./images/plastica.png") {
    score += 3;
  } else if (material === "./images/vetro.png") {
    score += 5;
  } else if (material === "./images/indifferenziata.png") {
    score += 1;
  } else {
    score += 0;
  }
}



function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let materiale1 = board[r][c];
            let materiale2 = board[r][c + 1];
            let materiale3 = board[r][c + 2];

            if (
                materiale1.src === materiale2.src &&
                materiale2.src === materiale3.src &&
                !materiale1.src.includes("blank")
            ) {
                return true;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let materiale1 = board[r][c];
            let materiale2 = board[r + 1][c];
            let materiale3 = board[r + 2][c];

            if (
                materiale1.src === materiale2.src &&
                materiale2.src === materiale3.src &&
                !materiale1.src.includes("blank")
            ) {
                return true;
            }
        }
    }

    return false;
}

function slideMateriali() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generaMateriali() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomMateriale() + ".png";
        }
    }
}