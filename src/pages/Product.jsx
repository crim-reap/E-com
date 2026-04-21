import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
  const [products, setApiData] = useState([]);
  const [wishlist, setWishlist] = useState([]);



  const loadData = async () => {
    try {
      const apiRes = await fetch('https://dummyjson.com/products');
      const apiResJson = await apiRes.json();
      setApiData(apiResJson.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();

    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);


  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    const stored = localStorage.getItem("wishlist");
    const current = stored ? JSON.parse(stored) : [];

    const alreadyExists = current.find(item => item.id === product.id);

    let updated;
    if (alreadyExists) {

      updated = current.filter(item => item.id !== product.id);
      // alert("Removed from wishlist!");
    } else {
      updated = [...current, product];
      // alert("Product added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
  };

  const BlinkGone = (id) => {
    if (true) {
      setApiData(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="contai">
      <h1>Scroll down to see more about our Products</h1>
      <section className="cards-container">
        {products.map((product) => (
          <div className="box" key={product.id}>
            <div
              className={`wish ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}><FontAwesomeIcon icon={faHeart} />
            </div>
            <img src={product.thumbnail} alt={product.title} />
            <p><b>{product.title}</b></p>
            <p><b>Price:</b> ${product.price}</p>
            <p><b>Rating:</b> ⭐{product.rating}</p>
            <div className="del" onClick={() => BlinkGone(product.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Product;
