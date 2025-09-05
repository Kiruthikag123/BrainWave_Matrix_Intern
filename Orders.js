export default function Orders({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <p>No orders yet</p>
      </div>
    );
  }

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders.map((order, index) => (
        <div key={index} className="order-card">
          <div className="order-header">
            <h3>Order #{order.orderId}</h3>
            <p>Date: {order.date}</p>
          </div>
          <div className="order-details">
            <p><strong>Shipping to:</strong> {order.name}, {order.address}, {order.city}, {order.state} {order.zip}</p>
          </div>
          <div className="order-items">
            <h4>Items:</h4>
            {order.items.map((item, itemIndex) => (
              <div key={itemIndex} className="order-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <strong>Total: ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}