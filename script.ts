type PlayerInstance = {
    updateScore:(result:number) => void,
    getScore:() => number,
    getPlayerName:() => string,
}

type GridArrayInstance = {
    addPlayerMark: (playerMark:string,positionX:number,positionY:number) => void;
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
    
    const createGridArray = ():string[][] => {
    let gridArray:string[][] = [];
    for(let i = 0;i<3;i++){
        let gridRow:string[] = [];
        for(let j = 0; j<3 ; j++){
            gridRow.push('');
        }
    }
    return gridArray;
    }

    let gridArray = createGridArray();

    const addPlayerMark = (playerMark:string,positionX:number,positionY:number) => {
        gridArray[positionX][positionY] = playerMark;
    }

    return {
        addPlayerMark
    }
}


const tictactoeGame = (p1:PlayerInstance,p2:PlayerInstance):GameInstance => {
    
    const p1Mark = 'x';
    const p2Mark = 'o';

    return {

    }
}