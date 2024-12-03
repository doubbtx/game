function Shop({ gold, setGold, userClass, items, inventoryItems, setInventoryItems }) {
  const classSpecificItems = items.filter(
    (item) => item.class === userClass || !item.class 
  );

  function buyItem(item) {
    if (gold >= item.price) {
      setGold((prevGold) => prevGold - item.price);

      setInventoryItems((prevInventory) => [...prevInventory, item]);
    } else {
      alert("Not enough gold");
    }
  }

  return (
    <div className="shop">
      <h1>Shop</h1>
      {classSpecificItems.map((item) => (
        <p key={item.id}>
          {item.name} - Price: {item.price} gold
          <button onClick={() => buyItem(item)}>Buy</button>
        </p>
      ))}
    </div>
  );
}

export default Shop;
