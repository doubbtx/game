function Inventory({
  userItems,
  setUserItems,
  inventoryItems,
  setInventoryItems,
  userStats,
  setUserStats,
  userClass,
  gold,
  setGold
}) {
  const equipItem = (slot, item) => {
    if (item.effects) {
      setUserStats((prevStats) => ({
        ...prevStats,
        ...Object.entries(item.effects).reduce((acc, [stat, value]) => {
          acc[stat] = prevStats[stat] + value;
          return acc;
        }, {}),
      }));
    }
    setUserItems((prevItems) => ({
      ...prevItems,
      [slot]: item,
    }));
    setInventoryItems((prevInventory) =>
      prevInventory.filter((invItem) => invItem.id !== item.id)
    );
  };

  const unequipItem = (slot) => {
    const item = userItems[slot];
    if (item?.effects) {
      setUserStats((prevStats) => ({
        ...prevStats,
        ...Object.entries(item.effects).reduce((acc, [stat, value]) => {
          acc[stat] = prevStats[stat] - value;
          return acc;
        }, {}),
      }));
    }
    setUserItems((prevItems) => ({
      ...prevItems,
      [slot]: null,
    }));
    if (item) {
      setInventoryItems((prevInventory) => [...prevInventory, item]);
    }
  };

  return (
    <div>
      <h1>Inventory</h1>
      <div>
        <h2>Equipped Items</h2>
        {Object.entries(userItems).map(([slot, item]) => (
          <div key={slot}>
            <p>
              {slot}: {item ? `${item.name}` : "Empty"}
              {item && (
                <>
                <button onClick={() => unequipItem(slot)}>Unequip</button>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
      <div className="available-items">
        <h2>Inventory Items</h2>
        {inventoryItems.map((item) => (
          <p key={item.id}>
            {item.name} - Slot: {item.slot}
            <button
              onClick={() => {
                const slot = item.slot;
                if (slot) equipItem(slot, item);
              }}
            >
              Equip
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
