export default function Cart({ cart, updateQuantity, removeItem, setPage }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <p>Your cart is empty</p>
        <button onClick={() => setPage("products")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>₹{item.price.toLocaleString()}</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
            </div>
            <div className="item-total">
              ₹{(item.price * item.quantity).toLocaleString()}
            </div>
            <button className="remove-btn" onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ₹{total.toLocaleString()}</h3>
        <button onClick={() => setPage("checkout")}>Proceed to Checkout</button>
      </div>
    </div>
  );
}