import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("wishlist");
        if (stored) {
            setWishlist(JSON.parse(stored));
        }
    }, []);

    function removeWish(id) {
        if (true) {
            setWishlist(wishlist.filter(product => product.id !== id));
            localStorage.setItem("wishlist", JSON.stringify(wishlist.filter(product => product.id !== id)));
        }
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
                            <div className="del" onClick={() => removeWish(product.id)}><FontAwesomeIcon icon={faTrash} />
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}

export default Wishlist;
