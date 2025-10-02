type PlayerInstance = {
    updateScore:(result:number) => void,
    getScore:() => number,
    getPlayerName:() => string,
}

type GridArrayInstance = {
    addPlayerMark: (playerMark:string,positionX:number,positionY:number) => void;
    getGridValue: (positionX:number,positionY:number) => string;
}

type GameInstance = {

}

const Player = (name:string): PlayerInstance => {
    let score:number = 0;
    const playerName:string = name;

    const updateScore = (result:number) => {
        score += result;
    }

    const getScore = () => {
        return score;
    }

    const getPlayerName = () => {
        return playerName;
    }

    return {
        updateScore,
        getScore,
        getPlayerName
    }
}


const GridArrayManager = ():GridArrayInstance => {
    
    const gridArrayElement:HTMLDivElement[][] = [];
    const gameContainer = document.querySelector(".gameContainer");

    const createGridCelll = ():HTMLDivElement => {
        let gridCellElement:HTMLDivElement = document.createElement('div');
        gridCellElement.className = "gridCell";
        return gridCellElement;
    }   

    const addCellToGridArray = (cell:HTMLDivElement) => {
        if(!gameContainer){
            throw new Error("gameContainer class not found!");
        }
        gameContainer.appendChild(cell);
    }

    const createGridArray = ():string[][] => {
    let gridArray:string[][] = [];
    for(let i = 0;i<3;i++){
        let gridRowElement:HTMLDivElement[] = [];
        let gridRow:string[] = [];
        for(let j = 0; j<3 ; j++){
            let gridCellElement = createGridCelll();
            gridRowElement.push(gridCellElement);
            gridRow.push('');
            addCellToGridArray(gridCellElement);
        }
        gridArrayElement.push(gridRowElement);
    }

    return gridArray;
    }

    let gridArray = createGridArray();

    const addPlayerMark = (playerMark:string,positionX:number,positionY:number) => {
        gridArray[positionX][positionY] = playerMark;
        gridArrayElement[positionX][positionY].textContent = playerMark;
    }

    const getGridValue = (positionX:number,positionY:number) => {
        return gridArray[positionX][positionY];
    }

    return {
        getGridValue,
        addPlayerMark
    }
}





const tictactoeGame = (player1:PlayerInstance,player2:PlayerInstance):GameInstance => {
    
    const p1 = player1;
    const p2 = player2;

    const p1Mark = 'x';
    const p2Mark = 'o';
    let gameRound = 0;
    const gameGrid = GridArrayManager();

    const checkWinning = () => {
        // check column
        let gameOver:boolean = false;
        for(let column = 0;column<3;column++){
            gameOver = checkValidWin(gameGrid.getGridValue(0,column),gameGrid.getGridValue(1,column),gameGrid.getGridValue(2,column));
            if(gameOver){
                return gameGrid.getGridValue(0,column)
            }
        }
        
        for(let row = 0;row<3;row++){
            let gameOver = checkValidWin(gameGrid.getGridValue(row,0),gameGrid.getGridValue(row,1),gameGrid.getGridValue(row,2));
            if(gameOver){
                return gameGrid.getGridValue(row,0)
            }
        }

        gameOver = checkValidWin(gameGrid.getGridValue(0,0) ,gameGrid.getGridValue(1,1) ,(gameGrid.getGridValue(2,2)) )
        gameOver = checkValidWin(gameGrid.getGridValue(0,2) ,gameGrid.getGridValue(1,1) ,(gameGrid.getGridValue(2,0)) )
        if(gameOver){
            return gameGrid.getGridValue(1,1)
        }

        return "";

    }

    const checkValidWin = (first:string,second:string,third:string):boolean => {
        
        if( ( first === "" ) || ( second === "" ) || ( third === "") ){
            return false
        }

        if( !( ( first === second ) && ( second === third ) ) ){
            return false
        }

        return true;
    }

    return {

    }
}


tictactoeGame(Player("Best"),Player("Jimmy"));