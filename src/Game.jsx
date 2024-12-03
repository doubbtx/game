import React, { useEffect, useState, useRef } from "react";
import Adventures from "./Adventures";

function Game({ startGame, userClass, userName, reqExp, currentExp, level, setLevel, setCurrentExp, setReqExp, gold, userStats}) {
const [info, setInfo] = useState(false)
  return (
    <div className="stats">
      <h2>{userName}</h2>
      <p>Class: {userClass}</p>
      <p>Level: {level}</p>
      <p>XP: {Math.round(currentExp)} / {Math.round(reqExp)}</p>
      <p>HP: {Math.round(userStats.health)}</p>
      <p>Gold: {Math.round(gold)}</p>
      <p onMouseEnter={() => setInfo(true)} onMouseLeave={() => setInfo(false)}>Strength: {userStats.strength}</p>
      {info &&(<p>Increases your damage if you're Warrior</p>)}
      <p>Dexterity: {userStats.dexterity}</p>
      <p>Constitution {userStats.constitution}</p>
      <p>Intelligence: {userStats.intelligence}</p>
      <p>Luck: {userStats.luck}</p>
    </div>
  );
}

export default Game;
