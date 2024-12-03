import { useState } from "react";

function Shop({ gold, setGold, userStats, setUserStats, items, setItems, setUserItems, userItems }) {
  function buyItem(item) {
    if (gold >= item.price) {
      setGold((prevGold) => prevGold - item.price);
      setUserItems([...userItems, item])
    } else {
      alert("Not enough gold");
    }
  }
  return (
    <div className="shop">
      {items.map((item) => (
        <p key={item.id}>
          {item.name} - Price: {item.price} gold
          <button onClick={() => buyItem(item)}>Buy</button>
        </p>
      ))}

    </div>
  );
}

export default Shop;
