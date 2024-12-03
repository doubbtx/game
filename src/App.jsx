import { useState, useEffect, useRef } from "react";
import "./App.css";
import Game from "./Game";
import Adventures from "./Adventures";
import Shop from "./Shop";
import Inventory from "./Inventory";
function App() {
  const [userClass, setUserClass] = useState();
  const [isChosen, setIsChosen] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [isUserName, setIsUsername] = useState(true);
  const [userName, setUserName] = useState('')
  const [currentExp, setCurrentExp] = useState(1);
  const [reqExp, setReqExp] = useState(100);
  const [level, setLevel] = useState(1);
  const [gold, setGold] = useState(0)
  const [stamina, setStamina] = useState(100);
  const [activeView, setActiveView] = useState(null);
  const [counter, setCounter] = useState(0);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [userItems, setUserItems] = useState({
    Weapon: null,
    Helmet: null,
    Boots: null,
    Pants: null,
    Armor: null,
    ClassItem: null,
  });
  const [userStats, setUserStats] = useState({
    health: 100,
    strength: 10,
    dexterity: 10,
    intelligence: 10,
    constitution : 10,
    luck: 10,
  });
  const [enemies, setEnemies] = useState([
    {
      name: 'Orc',
      health: 200,
      damage: 0,
    },
    {
      name: 'Orc Mage',
      health: 200,
      damage: 0,
    },
  ]);
  
  useEffect(() => {
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) => ({
        ...enemy,
        damage: enemy.name === 'Orc' 
          ? userStats.health / 10 
          : userStats.health * 0.25
      }))
    );
  }, [userStats, level]);
  
  const [items, setItems] = useState([
    // Weapons
    { id: 1, name: "Sword", price: 200, slot: "Weapon", class: "Warrior", effects: { strength: 5 } },
    { id: 2, name: "Staff", price: 200, slot: "Weapon", class: "Mage", effects: { intelligence: 5 } },
    { id: 3, name: "Daggers", price: 200, slot: "Weapon", class: "Assassin", effects: { dexterity: 5 } },
    // Helmets
    { id: 4, name: "Iron Helmet", price: 150, slot: "Helmet", class: "Warrior", effects: { health: 20 } },
    { id: 5, name: "Enchanted Hood", price: 150, slot: "Helmet", class: "Mage", effects: { intelligence: 3, luck: 2 } },
    { id: 6, name: "Silent Mask", price: 150, slot: "Helmet", class: "Assassin", effects: { dexterity: 3, luck: 2 } },
    // Boots
    { id: 7, name: "Steel Boots", price: 100, slot: "Boots", class: "Warrior", effects: { constitution: 2 } },
    { id: 8, name: "Mystic Sandals", price: 100, slot: "Boots", class: "Mage", effects: { intelligence: 2 } },
    { id: 9, name: "Shadow Boots", price: 100, slot: "Boots", class: "Assassin", effects: { dexterity: 2 } },
    // Pants
    { id: 10, name: "Iron Greaves", price: 120, slot: "Pants", class: "Warrior", effects: { health: 15 } },
    { id: 11, name: "Arcane Leggings", price: 120, slot: "Pants", class: "Mage", effects: { intelligence: 2, health: 10 } },
    { id: 12, name: "Leather Pants", price: 120, slot: "Pants", class: "Assassin", effects: { dexterity: 3, health: 10 } },
    // Armor
    { id: 13, name: "Plate Armor", price: 300, slot: "Armor", class: "Warrior", effects: { health: 30 } },
    { id: 14, name: "Robe of Wisdom", price: 300, slot: "Armor", class: "Mage", effects: { intelligence: 4, health: 15 } },
    { id: 15, name: "Shadow Cloak", price: 300, slot: "Armor", class: "Assassin", effects: { dexterity: 4, health: 15 } },
    // Class Items
    { id: 16, name: "Shield", price: 250, slot: "ClassItem", class: "Warrior", effects: { constitution: 5, health: 25 } },
    { id: 17, name: "Spell Tome", price: 250, slot: "ClassItem", class: "Mage", effects: { intelligence: 6, luck: 3 } },
    { id: 18, name: "Poison Vial", price: 250, slot: "ClassItem", class: "Assassin", effects: { dexterity: 6, luck: 3 } },
  ]);
const hasUpdatedRef = useRef(false);
useEffect (() => {
  if(currentExp >= reqExp)
  {
    setLevel((prevLevel) => prevLevel + 1)
    setCurrentExp(currentExp-reqExp)
    levelUp()
  }
},[currentExp])
useEffect (() => {
  setReqExp(reqExp + reqExp * 0.6)
},[level])

function levelUp () {
  if(userClass === 'Warrior')
  {
    setUserStats((prevStats) => ({
      ...prevStats,
      health: prevStats.health * (1 + (level / 12 )) + (userStats.constitution * 4),
      strength: prevStats.strength + 3,
      luck: prevStats.luck + 1,
      constitution: prevStats.constitution + 2
    }))
  }
  else if (userClass === 'Mage')
  {
    setUserStats((prevStats) => ({
      ...prevStats,
      health: prevStats.health * (1 + (level / 12 )) + (userStats.constitution * 1.5),
      intelligence: prevStats.intelligence + 3,
      luck: prevStats.luck + 2,
      constitution: prevStats.constitution + 1
    }))
  }
  else
  {
    setUserStats((prevStats) => ({
      ...prevStats,
      health: prevStats.health * (1 + (level / 12 )) + (userStats.constitution * 2),
      dexterity: prevStats.dexterity + 3,
      luck: prevStats.luck + 3,
      constitution: prevStats.constitution + 2
    }))
  }
}
  useEffect(() => {
    if (userClass === "Warrior" && !hasUpdatedRef.current) {
      setUserStats((prevStats) => ({
        ...prevStats,
        health: prevStats.health + 50,
        strength: prevStats.strength + 5,
        luck: prevStats.luck + 3,
      }));
      hasUpdatedRef.current = true;
    }
    if (userClass === "Mage" && !hasUpdatedRef.current) {
      setUserStats((prevStats) => ({
        ...prevStats,
        health: prevStats.health + 20,
        intelligence: prevStats.intelligence + 5,
        luck: prevStats.luck + 5,
      }));
      hasUpdatedRef.current = true;
    }
    if (userClass === "Assassin" && !hasUpdatedRef.current) {
      setUserStats((prevStats) => ({
        ...prevStats,
        health: prevStats.health + 30,
        dexterity: prevStats.dexterity + 5,
        luck: prevStats.luck + 10,
      }));
      hasUpdatedRef.current = true;
    }
  }, [userClass]);

  return (
    <>
      {!startGame && (
        <div className="startingPoint">
        {isUserName && (
          <>
          <input type="text" value={userName} placeholder="Your nickname" onChange={(e) => setUserName(e.target.value)}/>
          <button onClick={() => setIsUsername(false)}>Submit</button>
          </>
        )}
        {!isUserName && (
          <>
          {!isChosen && (
            <>
              <h1>Choose your class: </h1>
              <button onClick={() => { setUserClass("Mage"); setIsChosen(true); }}>Mage</button>
              <button onClick={() => { setUserClass("Warrior"); setIsChosen(true); }}>Warrior</button>
              <button onClick={() => { setUserClass("Assassin"); setIsChosen(true); }}>Assassin</button>
            </>
          )}
          {isChosen && (
            <>
              <h2>Are you sure you want to play {userClass}?</h2>
              <button onClick={() => setStartGame(true)}>Yes</button>
              <button onClick={() => setIsChosen(false)}>No</button>
            </>
          )}
          </>
        )}
        </div>
      )}
          {startGame &&(
        <div>
<div>
  <nav>
  <button onClick={() => setActiveView((prev) => (prev === "Adventures" ? null : "Adventures"))}>
    Adventures
  </button>
  <button onClick={() => setActiveView((prev) => (prev === "Character" ? null : "Character"))}>
    Character
  </button>
  <button onClick={() => setActiveView((prev) => (prev === "Shop" ? null : "Shop"))}>
    Shop
  </button>
  <button onClick={() => setActiveView((prev) => (prev === "Inventory" ? null : "Inventory"))}>
    Inventory
  </button>
  </nav>
</div>
        </div>
    )}
    <div className="container">
{activeView === "Adventures" && (
  <Adventures
    reqExp={reqExp}
    currentExp={currentExp}
    level={level}
    setCurrentExp={setCurrentExp}
    setGold={setGold}
    gold={gold}
    enemies={enemies}
    setEnemies={setEnemies}
    userStats={userStats}
    setUserStats={setUserStats}
    userClass={userClass}
    setUserClass={setUserClass}
    stamina={stamina}
    setStamina={setStamina}
    counter={counter}
    setCounter={setCounter}
  />
)}
{activeView === "Character" && (
  <Game
    startGame={startGame}
    userClass={userClass}
    userName={userName}
    setStartGame={setStartGame}
    reqExp={reqExp}
    currentExp={currentExp}
    level={level}
    setLevel={setLevel}
    setCurrentExp={setCurrentExp}
    setReqExp={setReqExp}
    gold={gold}
    userStats={userStats}
  />
)}
{activeView === "Shop" && (
  <Shop
    gold={gold}
    setGold={setGold}
    userStats={userStats}
    setUserStats={setUserStats}
    items={items}
    setItems={setItems}
    userItems={userItems}
    setUserItems={setUserItems}
    inventoryItems={inventoryItems}
    setInventoryItems={setInventoryItems}
    userClass={userClass}
  />
)}
{activeView === "Inventory" && (
  <Inventory
    userItems={userItems}
    setUserItems={setUserItems}
    items={items}
    setItems={setItems}
    userStats={userStats}
    setUserStats={setUserStats}
    userClass={userClass}
    inventoryItems={inventoryItems}
    setInventoryItems={setInventoryItems}
    setGold={setGold}
    gold={gold}
  />
)}
</div>

    </>
  );
}

export default App;
