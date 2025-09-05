import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import "./App.css";

const productsData = [
  { id: 1, name: "Laptop", price: 55000, category: "Electronics", image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300&h=200&fit=crop" },
  { id: 2, name: "Smartphone", price: 20000, category: "Electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop" },
  { id: 3, name: "Headphones", price: 1500, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop" },
  { id: 4, name: "T-Shirt", price: 599, category: "Clothing", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop" },
  { id: 5, name: "Jeans", price: 1999, category: "Clothing", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=200&fit=crop" },
  { id: 6, name: "Jacket", price: 3499, category: "Clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=200&fit=crop" },
  { id: 7, name: "Sofa", price: 24999, category: "Furniture", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" },
  { id: 8, name: "Dining Table", price: 18999, category: "Furniture", image: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=300&h=200&fit=crop" },
  { id: 9, name: "Bookshelf", price: 5999, category: "Furniture", image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=300&h=200&fit=crop" },
  { id: 10, name: "Football", price: 899, category: "Sports", image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=300&h=200&fit=crop" },
  { id: 11, name: "Yoga Mat", price: 1299, category: "Sports", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop" },
  { id: 12, name: "Dumbbells", price: 2499, category: "Sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop" },
];

function App() {
  const [page, setPage] = useState("products");
  const [products] = useState(productsData);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (id) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.id === id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...products.find((p) => p.id === id), quantity: 1 }];
    });
  };

  const updateQuantity = (index, qty) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index].quantity = qty;
      return updated;
    });
  };

  const removeItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      ...orderDetails,
      items: cart,
      date: new Date().toLocaleString(),
      orderId: Math.floor(Math.random() * 1000000)
    };
    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    setPage("orders");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Header cartCount={cartCount} setPage={setPage} />
      {page === "products" && <ProductList products={products} addToCart={addToCart} />}
      {page === "cart" && (
        <Cart 
          cart={cart} 
          updateQuantity={updateQuantity} 
          removeItem={removeItem} 
          setPage={setPage} 
        />
      )}
      {page === "checkout" && <Checkout placeOrder={placeOrder} setPage={setPage} />}
      {page === "orders" && <Orders orders={orders} setPage={setPage} />}
    </div>
  );
}

export default App;