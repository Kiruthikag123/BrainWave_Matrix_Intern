export default function ProductList({ products, addToCart }) {
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="product-list">
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="products-grid">
            {categoryProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price.toLocaleString()}</p>
                <button onClick={() => addToCart(product.id)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}