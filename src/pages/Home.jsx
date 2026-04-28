import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="home-hero">
        <h1>Your One-Stop Shop for Everything</h1>

        <p>
          Thousands of products. Unbeatable prices. Fast delivery straight to
          your door. Whether you need electronics, fashion, or everyday
          essentials — we have it all.
        </p>

        <button onClick={() => navigate("/login")}>
          Register Now
        </button>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="features-grid">

          <div className="feature-card">
            <h3>Wide Selection</h3>
            <p>Thousands of products across all categories.</p>
          </div>

          <div className="feature-card">
            <h3>Best Prices</h3>
            <p>Competitive pricing with regular deals.</p>
          </div>

          <div className="feature-card">
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping nationwide.</p>
          </div>

        </div>
      </section>

      {/* Products Section */}
      <section className="home-products">
        <h2>Featured Products</h2>

        <div className="cards-container">
          {products.map((product) => (
            <div className="box" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />

              <p><b>{product.title}</b></p>
              <p><b>Price:</b> ${product.price}</p>
              <p><b>Rating:</b> {product.rating} / 5</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <h2>Start Shopping Today</h2>

        <p>
          Join thousands of happy customers and discover products you'll love.
        </p>

        <button onClick={() => navigate("/login")}>
          Register Now
        </button>
      </section>

    </div>
  );
}

export default Home;