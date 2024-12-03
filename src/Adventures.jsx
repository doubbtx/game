import { useEffect, useState } from "react";

function Adventures({ 
  setCurrentExp, 
  currentExp, 
  reqExp, 
  setGold, 
  gold, 
  enemies, 
  setEnemies, 
  userStats, 
  setUserStats, 
  userClass, 
  level,
  stamina,
  setStamina,
  counter,
  setCounter
}) {
  const staminaPrice = 10;
  const [currentEnemy, setCurrentEnemy] = useState(null); 
  const [isBattling, setIsBattling] = useState(false); 
  const [playerHealth, setPlayerHealth] = useState(userStats.health); 
  const [enemyHealth, setEnemyHealth] = useState(0); 
  const [playerDamage, setPlayerDamage] = useState(10);
  const [currentExpMultiplier, setCurrentExpMultiplier] = useState(0);
  const [goldMaxReward, setGoldMaxReward] = useState(0);
  const [minDamage, setMinDamage] = useState(0);
  const [maxDamage, setMaxDamage] = useState(0);
  const [randomDamageFactor, setRandomDamageFactor] = useState(0);

  useEffect(() => {
    let damage = 0;
    let randomFactor = 0.85 + Math.random() * 0.3;
    if (userClass === "Warrior") {
      damage = 10 + userStats.strength * 3 + 15 * (1 + (level / 100 )) * randomFactor;
    } else if (userClass === "Mage") {
      damage = 15 + userStats.intelligence * 4 * (1 + (level/150)) * randomFactor;
    } else {
      damage = 13 + userStats.dexterity * 2 * (1 + (level/100)) * randomFactor;
    }
    setPlayerDamage(damage);
    setRandomDamageFactor(randomFactor);
    setMinDamage(Math.floor(damage * 0.8));
    setMaxDamage(Math.ceil(damage * 1.2));
  }, [userClass, userStats, level]);

  const handleMission = (expMultiplier, goldReward, takestamina) => {
    if (stamina >= takestamina) {
      const enemy = enemies[Math.floor(Math.random() * enemies.length)];
      setCurrentEnemy(enemy);
      setEnemyHealth(enemy.health);
      setPlayerHealth(userStats.health);
      setIsBattling(true);
      setStamina((prevStamina) => prevStamina - takestamina);

      setCurrentExpMultiplier(expMultiplier);
      setGoldMaxReward(goldReward);
    } else {
      alert("Not enough stamina!");
    }
  };

  const criticalHitChance = () => {
    const chance = Math.random();
    if (userStats.luck > 10 && chance < 0.2) {
      return 2;
    }
    return 1;
  };

  const dodgeChance = () => {
    const chance = Math.random();
    if (userStats.dexterity > 15 && chance < 0.3) {
      return true;
    }
    return false;
  };

  const playerAttack = () => {
    let attackMultiplier = criticalHitChance(); 
    let totalDamage = Math.random() * (maxDamage - minDamage) + minDamage;
    totalDamage *= attackMultiplier;

    setEnemyHealth(prevHealth => Math.max(prevHealth - totalDamage, 0)); 

    return totalDamage;
  };

  const enemyAttack = () => {
    if (dodgeChance()) {
      return 0;
    }
    return currentEnemy.damage;
  };

  const fightTurn = () => {
    if (!currentEnemy) return;

    const playerAttackDamage = playerAttack();
    const enemyAttackDamage = enemyAttack();
    const newEnemyHealth = enemyHealth - playerAttackDamage;
    const newPlayerHealth = playerHealth - enemyAttackDamage;

    setEnemyHealth(newEnemyHealth > 0 ? newEnemyHealth : 0);
    setPlayerHealth(newPlayerHealth > 0 ? newPlayerHealth : 0);

    if (newEnemyHealth <= 0) {
      setGold((prevGold) => prevGold + Math.random() * goldMaxReward);
      setCurrentExp((prevExp) => prevExp + reqExp * currentExpMultiplier);
      setEnemies((prevEnemies) =>
        prevEnemies.map((e) =>
          e.name === currentEnemy.name ? { ...e, health: currentEnemy.health } : e
        )
      );

      setIsBattling(false);
    } else if (newPlayerHealth <= 0) {
      setIsBattling(false);
    }
  };

  function buyStamina() {
    if (gold >= staminaPrice && counter < 20 && stamina < 100) {
      setStamina((prevStamina) => {
      const newStamina = prevStamina + 10;
        return newStamina > 100 ? 100 : newStamina;
      });
      setGold((prevGold) => prevGold - staminaPrice);
      setCounter((prevCounter) => prevCounter + 1);
    } else if (counter >= 20) {
      alert("You cannot buy more stamina today!");
    } else if (gold < staminaPrice) {
      alert("Not enough gold!");
    } else {
      alert("Your stamina is full");
    }
  }

  return (
    <>
      {!isBattling && (
        <div className="adventures">
          <h1>Choose mission:</h1>
          <p>Current stamina: {stamina}</p>
          <p>Stamina purchases: {counter}</p>
          <button onClick={buyStamina}>Buy 10 stamina</button>
          <br />
          <button onClick={() => handleMission(0.1, 300, 2)}>2 stamina Mission</button>
          <button onClick={() => handleMission(0.25, 700, 5)}>5 stamina Mission</button>
          <button onClick={() => handleMission(0.33, 1000, 10)}>10 stamina Mission</button>
        </div>
      )}
      {isBattling && currentEnemy && (
        <div className="battle">
          <h2>Battle!</h2>
          <p>Your damage: {minDamage} - {maxDamage}</p>
          <p>Your opponent: {currentEnemy.name}</p>
          <p>Your Health: {playerHealth.toFixed(2)}</p>
          <p>Enemy Health: {enemyHealth.toFixed(2)}</p>
          <button onClick={fightTurn}>Attack</button>
          <button onClick={() => setIsBattling(false)}>Run Away</button>
        </div>
      )}
    </>
  );
}

export default Adventures;
