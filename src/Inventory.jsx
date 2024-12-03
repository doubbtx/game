function Inventory({ userItems, setUserItems, items, userStats, setUserStats, userClass }) {
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
    };
    const availableItems = items.filter(
      (item) =>
        !Object.values(userItems).some((equippedItem) => equippedItem?.id === item.id) &&
        (item.class === userClass || !item.class) 
    );
  
    return (
      <div>
        <h1>Inventory</h1>
        <div>
          <h2>Equipped Items</h2>
          {Object.entries(userItems).map(([slot, item]) => (
            <div key={slot}>
              <p>
                {slot}: {item ? `${item.name} (ID: ${item.id})` : "Empty"}
                {item && (
                  <button onClick={() => unequipItem(slot)}>Unequip</button>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="available-items">
          <h2>Available Items</h2>
          {availableItems.map((item) => (
            <p key={item.id}>
              {item.name} - Price: {item.price} gold
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
  