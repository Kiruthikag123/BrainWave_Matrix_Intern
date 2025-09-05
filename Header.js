export default function Header({ cartCount, setPage }) {
  return (
    <header className="header">
      <h1>E-commerce App</h1>
      <nav className="nav">
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>
          Cart ({cartCount})
        </button>
        <button onClick={() => setPage("orders")}>Orders</button>
      </nav>
    </header>
  );
}
