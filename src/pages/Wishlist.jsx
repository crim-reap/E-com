import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../components/wishlist.css";
import heroImg from "../assets/about/wishlist-hero.png";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const isInCart = (id) => cart.some((item) => item.id === id);

  function removeWish(id) {
    const updated = wishlist.filter((product) => product.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }

  function toggleCart(product) {
    const current = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = current.find((item) => item.id === product.id);

    let updated;
    if (exists) {
      updated = current.filter((item) => item.id !== product.id);
    } else {
      updated = [...current, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  }

  return (
    <div className="wishlist-page">

      {/* HERO */}
      <section
        className="wishlist-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      ></section>

      {/* TITLE */}
      <section className="wishlist-head">
        <h2>Your Wishlist</h2>
        <p>Saved favorites waiting for you.</p>
      </section>

      {/* PRODUCTS */}
      <section className="cards-container">

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <h3>Your wishlist is empty</h3>
            <p>Add products you love and they’ll appear here.</p>
          </div>
        ) : (
          wishlist.map((product) => (
            <div className="box" key={product.id}>

              <img src={product.thumbnail} alt={product.title} />

              <p><b>{product.title}</b></p>
              <p><b>Price:</b> ${product.price}</p>
              <p><b>Rating:</b> ⭐ {product.rating}</p>

              <div className="wishlist-actions">

                <div
                  className={`cart ${isInCart(product.id) ? "active" : ""}`}
                  onClick={() => toggleCart(product)}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </div>

                <div
                  className="del"
                  onClick={() => removeWish(product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>

              </div>

            </div>
          ))
        )}

      </section>
    </div>
  );
}

export default Wishlist;