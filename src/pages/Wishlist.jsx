import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);

    // 🔄 Load wishlist and cart from localStorage on mount
    useEffect(() => {
        const storedWishlist = localStorage.getItem("wishlist");
        if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

        const storedCart = localStorage.getItem("cart");
        if (storedCart) setCart(JSON.parse(storedCart));
    }, []);

    // ✅ Check if item is already in cart
    const isInCart = (id) => cart.some(item => item.id === id);

    // ❌ Remove from wishlist
    function removeWish(id) {
        const updated = wishlist.filter(product => product.id !== id);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    }

    // 🛒 Toggle cart: add if not in cart, remove if already in cart
    function toggleCart(product) {
        const current = JSON.parse(localStorage.getItem("cart")) || [];
        const exists = current.find(item => item.id === product.id);

        let updated;
        if (exists) {
            updated = current.filter(item => item.id !== product.id);
        } else {
            updated = [...current, { ...product, quantity: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(updated));
        setCart(updated);
    }

    return (
        <div>
            <h1>You are in your WISHLIST AREA!!!!</h1>

            <section className="cards-container">
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    wishlist.map(product => (
                        <div className="box" key={product.id}>

                            <img src={product.thumbnail} alt={product.title} />
                            <p><b>{product.title}</b></p>
                            <p><b>Price:</b> ${product.price}</p>
                            <p><b>Rating:</b> ⭐{product.rating}</p>

                            {/* 🛒 Toggle Cart — turns black when active */}
                            <div
                                className={`cart ${isInCart(product.id) ? 'active' : ''}`}
                                onClick={() => toggleCart(product)}
                            >
                                <FontAwesomeIcon icon={faCartShopping} />
                            </div>
                            <br />

                            {/* ❌ Remove from Wishlist */}
                            <div
                                className="del"
                                onClick={() => removeWish(product.id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </div>

                        </div>
                    ))
                )}
            </section>
        </div>
    );
}

export default Wishlist;