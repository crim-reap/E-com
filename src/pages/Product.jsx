import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
  const [products, setApiData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [outOfStockIds, setOutOfStockIds] = useState(new Set());

  const loadData = async () => {
    try {
      const apiRes = await fetch('https://dummyjson.com/products');
      const apiResJson = await apiRes.json();
      const prods = apiResJson.products;
      setApiData(prods);

      // Randomly pick 3 product IDs as out of stock
      const shuffled = [...prods].sort(() => Math.random() - 0.5);
      const oos = new Set(shuffled.slice(0, 3).map(p => p.id));
      setOutOfStockIds(oos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();

    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // ✅ WISHLIST
  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const toggleWishlist = (product) => {
    const current = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = current.find(item => item.id === product.id);
    const updated = exists
      ? current.filter(item => item.id !== product.id)
      : [...current, { ...product, outOfStock: outOfStockIds.has(product.id) }];

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
  };

  // ✅ CART
  const isInCart = (productId) => cart.some(item => item.id === productId);

  const toggleCart = (product) => {
    const current = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = current.find(item => item.id === product.id);
    const updated = exists
      ? current.filter(item => item.id !== product.id)
      : [...current, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  // ✅ Delete product from UI only
  const BlinkGone = (id) => {
    setApiData(products.filter(product => product.id !== id));
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="contai">
      <h1>Scroll down to see more about our Products</h1>

      {/*  Search Bar */}
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* No results message */}
      {search && filteredProducts.length === 0 && (
        <p className="no-results">Sorry, product not available :(</p>
      )}

      <section className="cards-container">
        {filteredProducts.map((product) => {
          const oos = outOfStockIds.has(product.id);
          return (
            <div className={`box ${oos ? 'oos-box' : ''}`} key={product.id}>

              {/* Out of Stock Badge */}
              {oos && <div className="oos-badge">Out of Stock</div>}
              <br />

              {/* ❤️ Wishlist — always allowed */}
              <div
                className={`wish ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <br />

              {/* 🛒 Cart — disabled if out of stock */}
              <div
                className={`cart ${isInCart(product.id) ? 'active' : ''} ${oos ? 'icon-disabled' : ''}`}
                onClick={() => !oos && toggleCart(product)}
                title={oos ? "Out of Stock — cannot add to cart" : "Add to Cart"}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </div>

              <img src={product.thumbnail} alt={product.title} />
              <p><b>{product.title}</b></p>
              <p><b>Price:</b> ${product.price}</p>
              <p><b>Rating:</b> ⭐{product.rating}</p>

              {/* 🔔 Notify message for OOS */}
              {oos && (
                <p className="notify-msg">You will be notified when available</p>
              )}

              {/* 🗑️ Delete — disabled if out of stock */}
              {!oos && (
                <div className="del" onClick={() => BlinkGone(product.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              )}

            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Product;