type PlayerInstance = {
    updateScore:(result:number) => void,
    getScore:() => number,
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

    return {
        updateScore,
        getScore
    }
}


const Player1 = Player("Alice");
Player1.updateScore(1);
console.log(Player1.getScore())