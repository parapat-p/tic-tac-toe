"use strict";
const Player = (name) => {
    let score = 0;
    const playerName = name;
    const updateScore = (result) => {
        score += result;
    };
    const getScore = () => {
        return score;
    };
    const getPlayerName = () => {
        return playerName;
    };
    return {
        updateScore,
        getScore,
        getPlayerName
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
    return {};
};
tictactoeGame();
