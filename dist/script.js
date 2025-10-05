"use strict";
const Player = () => {
    let score = 0;
    let playerName = "Player";
    const updateScore = (result) => {
        score += result;
    };
    const getScore = () => {
        return score;
    };
    const getPlayerName = () => {
        return playerName;
    };
    const setPlayerName = (name) => {
        playerName = name;
    };
    return {
        updateScore,
        getScore,
        getPlayerName,
        setPlayerName
    };
};
const GridArrayManager = () => {
    const gameContainer = document.querySelector(".gameContainer");
    if (!gameContainer) {
        throw new Error("No game found");
    }
    let gridArrayElement = [];
    const gridContainer = document.createElement("div");
    gridContainer.className = "gridContainer";
    const createGridCelll = (positionX, positionY) => {
        let gridCellElement = document.createElement('div');
        gridCellElement.className = "gridCell";
        return gridCellElement;
    };
    const addCellToGridArray = (cell) => {
        if (!gameContainer) {
            throw new Error("gameContainer class not found!");
        }
        gridContainer.appendChild(cell);
    };
    const createGridArray = () => {
        let gridArray = [];
        for (let i = 0; i < 3; i++) {
            let gridRowElement = [];
            let gridRow = [];
            for (let j = 0; j < 3; j++) {
                let gridCellElement = createGridCelll(i, j);
                gridRowElement.push(gridCellElement);
                gridRow.push('');
                addCellToGridArray(gridCellElement);
            }
            gridArray.push(gridRow);
            gridArrayElement.push(gridRowElement);
        }
        if (gameContainer) {
            gameContainer.appendChild(gridContainer);
        }
        return gridArray;
    };
    let gridArray = createGridArray();
    const addPlayerMark = (playerMark, positionX, positionY) => {
        gridArray[positionX][positionY] = playerMark;
        gridArrayElement[positionX][positionY].textContent = playerMark;
        console.log(gridArray);
    };
    const getGridValue = (positionX, positionY) => {
        return gridArray[positionX][positionY];
    };
    const getGridCell = (positionX, positionY) => {
        return gridArrayElement[positionX][positionY];
    };
    const resetBoard = () => {
        gameContainer.removeChild(gridContainer);
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        gridArrayElement = [];
        gridArray = createGridArray();
    };
    return {
        getGridCell,
        addPlayerMark,
        getGridValue,
        resetBoard
    };
};
const tictactoeGame = () => {
    let currentMark = "x";
    let gameRound = 0;
    let winner = "";
    const player1 = Player();
    const player2 = Player();
    const updatePlayerScore = () => {
        if (winner === "x") {
            player1.updateScore(1);
        }
        else if (winner === "o") {
            player2.updateScore(1);
        }
        else {
            return;
        }
    };
    const initGame = () => {
        currentMark = "x";
        gameRound = 0;
        winner = "";
        addButtonEventLogic();
    };
    const gameGrid = GridArrayManager();
    const checkWinning = () => {
        // check column
        let gameOver = false;
        for (let column = 0; column < 3; column++) {
            gameOver = checkValidWin(gameGrid.getGridValue(0, column), gameGrid.getGridValue(1, column), gameGrid.getGridValue(2, column));
            if (gameOver) {
                return gameGrid.getGridValue(0, column);
            }
        }
        for (let row = 0; row < 3; row++) {
            let gameOver = checkValidWin(gameGrid.getGridValue(row, 0), gameGrid.getGridValue(row, 1), gameGrid.getGridValue(row, 2));
            if (gameOver) {
                return gameGrid.getGridValue(row, 0);
            }
        }
        gameOver = checkValidWin(gameGrid.getGridValue(0, 0), gameGrid.getGridValue(1, 1), (gameGrid.getGridValue(2, 2)));
        if (gameOver) {
            return gameGrid.getGridValue(1, 1);
        }
        gameOver = checkValidWin(gameGrid.getGridValue(0, 2), gameGrid.getGridValue(1, 1), (gameGrid.getGridValue(2, 0)));
        if (gameOver) {
            return gameGrid.getGridValue(1, 1);
        }
        return "";
    };
    const checkValidGridPlacement = (positionX, positionY) => {
        if (gameGrid.getGridValue(positionX, positionY) !== "") {
            return false;
        }
        return true;
    };
    const shuffleMark = () => {
        if (currentMark === "x") {
            currentMark = "o";
        }
        else {
            currentMark = "x";
        }
    };
    const addButtonEventLogic = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameGrid.getGridCell(i, j).addEventListener("click", () => {
                    if (winner !== "") {
                        return;
                    } // Do nothing if game already end.
                    if (checkValidGridPlacement(i, j)) {
                        gameGrid.addPlayerMark(currentMark, i, j);
                        gameRound++;
                        winner = checkWinning();
                        shuffleMark();
                        if ((winner !== "") || (gameRound === 9)) {
                            updatePlayerScore();
                            console.log("GameEnd");
                        }
                    }
                });
            }
        }
    };
    addButtonEventLogic();
    const checkValidWin = (first, second, third) => {
        if ((first === "") || (second === "") || (third === "")) {
            return false;
        }
        if (!((first === second) && (second === third))) {
            return false;
        }
        return true;
    };
    const addResetbuttonEventLogic = () => {
        const resetButton = document.getElementById("reset-game");
        if (!resetButton) {
            throw new Error("No reset button found");
        }
        resetButton.addEventListener("click", () => {
            gameGrid.resetBoard();
            console.log("reset");
            initGame();
        });
    };
    addResetbuttonEventLogic();
    const addSetPlayerNameButtonLogic = () => {
        const setNameButton = document.getElementById("setPlayerName");
        const form = document.querySelector("form");
        const dialog = document.getElementById("setnameDialog");
        const player1Inputname = document.getElementById("inputNamePlayer1");
        const player2Inputname = document.getElementById("inputNamePlayer2");
        const player1NameUI = document.getElementById("player1Name");
        const player2NameUI = document.getElementById("player2Name");
        if ((!setNameButton) || (!form || (!dialog))) {
            throw new Error("No set name or form button found");
        }
        setNameButton.addEventListener("click", (e) => {
            dialog.showModal();
        });
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitter = e.submitter;
            if (submitter) {
                if (submitter.id === "novalidate-close") {
                    dialog.close();
                }
                if (player1Inputname && player2Inputname) {
                    player1.setPlayerName(player1Inputname.value);
                    player2.setPlayerName(player2Inputname.value);
                    player1NameUI.textContent = `${player1.getPlayerName()} : `;
                    player2NameUI.textContent = `${player2.getPlayerName()} : `;
                }
                dialog.close();
            }
            form.reset();
        });
        return;
    };
    addSetPlayerNameButtonLogic();
    return {};
};
tictactoeGame();
