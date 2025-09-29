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
    return {
        updateScore,
        getScore
    };
};
const Player1 = Player("Alice");
Player1.updateScore(1);
console.log(Player1.getScore());
