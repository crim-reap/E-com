import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=6")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div>

      {/* ── Hero / Ad Section ── */}
      <div style={{
        backgroundColor: "#14213d",
        padding: "60px 40px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "2.4rem", color: "#ffffff", marginBottom: "14px" }}>
          Your One-Stop Shop for Everything
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "#e5e5e5",
          maxWidth: "580px",
          margin: "0 auto 28px",
          lineHeight: "1.7"
        }}>
          Thousands of products. Unbeatable prices. Fast delivery straight to your door.
          Whether you need electronics, fashion, or everyday essentials — we have it all.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 32px",
            backgroundColor: "#fca311",
            color: "#000000",
            border: "none",
            borderRadius: "50px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Register Now
        </button>
      </div>

      {/* ── Value Points ── */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        padding: "36px 40px",
        backgroundColor: "#e5e5e5",
        flexWrap: "wrap"
      }}>
        {[
          { title: "Wide Selection", desc: "Thousands of products across all categories." },
          { title: "Best Prices", desc: "Competitive pricing with regular deals." },
          { title: "Fast Delivery", desc: "Quick and reliable shipping nationwide." }
        ].map(item => (
          <div key={item.title} style={{ maxWidth: "220px", textAlign: "center" }}>
            <p style={{ fontWeight: "700", fontSize: "1.05rem", color: "#14213d", marginBottom: "6px" }}>
              {item.title}
            </p>
            <p style={{ fontSize: "0.95rem", color: "#000000", lineHeight: "1.6" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Featured Products ── */}
      <h1 style={{ marginTop: "40px" }}>Featured Products</h1>

      <div className="cards-container">
        {products.map(product => (
          <div className="box" key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", height: "180px", objectFit: "contain" }}
            />
            <p><b>{product.title}</b></p>
            <p><b>Price:</b> ${product.price}</p>
            <p><b>Rating:</b> {product.rating} / 5</p>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ textAlign: "center", margin: "50px 20px" }}>
        <p style={{ fontSize: "1.1rem", color: "#000000", marginBottom: "16px" }}>
          Join thousands of happy customers. Sign up and start shopping today.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 32px",
            backgroundColor: "#fca311",
            color: "#000000",
            border: "none",
            borderRadius: "50px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Register Now
        </button>
      </div>

    </div>
  );
}

export default Home;