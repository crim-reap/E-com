import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faClockRotateLeft, faXmark, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function AddToCart() {
    const [cart, setCart] = useState([]);
    const [showOrders, setShowOrders] = useState(false);
    const [pastOrders, setPastOrders] = useState([]);
    const navigate = useNavigate();

    const loadCart = () => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            const parsed = JSON.parse(stored);
            const fixed = parsed.map(item => ({
                ...item,
                quantity: item.quantity || 1
            }));
            setCart(fixed);
        } else {
            setCart([]);
        }
    };

    const loadPastOrders = () => {
        const orders = JSON.parse(localStorage.getItem("allOrders") || "[]");
        setPastOrders(orders.reverse()); // newest first
    };

    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        window.addEventListener("focus", loadCart);
        return () => window.removeEventListener("focus", loadCart);
    }, []);

    function increaseQty(id) {
        const updated = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    }

    function decreaseQty(id) {
        const updated = cart.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
        );
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    }

    function removeItem(id) {
        const updated = cart.filter(item => item.id !== id);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    }

    const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleOpenOrders = () => {
        loadPastOrders();
        setShowOrders(true);
    };

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    };

    return (
        <div className="cart-page">
            <div className="cart-header-row">
                <h1>Your CART </h1>
                <button className="past-orders-btn" onClick={handleOpenOrders}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    &nbsp; Past Orders
                </button>
            </div>

            <section className="cards-container">
                {cart.length === 0 ? (
                    <p className="empty-msg">Your cart is empty.</p>
                ) : (
                    cart.map(product => (
                        <div className="box cart-box" key={product.id}>
                            <img src={product.thumbnail} alt={product.title} />
                            <p><b>{product.title}</b></p>
                            <p><b>Price:</b> ${product.price}</p>

                            <div className="qty-controls">
                                <button className="qty-btn" onClick={() => decreaseQty(product.id)}>−</button>
                                <span className="qty-count">{product.quantity}</span>
                                <button className="qty-btn" onClick={() => increaseQty(product.id)}>+</button>
                            </div>

                            <p className="item-total">
                                <b>Subtotal:</b> ${(product.price * product.quantity).toFixed(2)}
                            </p>

                            <div className="del" onClick={() => removeItem(product.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                        </div>
                    ))
                )}
            </section>

            {cart.length > 0 && (
                <div className="checkout-section">
                    <h2 className="total-amount">Total: ${totalAmount.toFixed(2)}</h2><br />
                    <button className="order-btn" onClick={() => navigate('/Special')}>
                        Proceed to Order 🛍️
                    </button>
                </div>
            )}

            {/* ─── Past Orders Modal ─── */}
            {showOrders && (
                <div className="modal-overlay" onClick={() => setShowOrders(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Past Orders</h2>
                            <button className="modal-close" onClick={() => setShowOrders(false)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>

                        {pastOrders.length === 0 ? (
                            <div className="no-orders">
                                <FontAwesomeIcon icon={faBoxOpen} size="2x" />
                                <p>No past orders found.</p>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {pastOrders.map((order, idx) => (
                                    <div className="order-card" key={idx}>
                                        <div className="order-card-header">
                                            <span className="order-date">{formatDate(order.orderedAt)}</span>
                                            <span className="order-badge">
                                                {order.cartItems?.length || 0} item(s)
                                            </span>
                                        </div>

                                        <div className="order-info">
                                            <p><b>Name:</b> {order.customerName}</p>
                                            <p><b>Phone:</b> {order.phone}</p>
                                            <p><b>Address:</b> {order.address}</p>
                                            <p><b>Payment:</b> {order.paymentMethod}</p>
                                        </div>

                                        {order.customization && (
                                            <div className="order-custom-tag">
                                                🎁 Gift for <b>{order.customization.recipient}</b> — {order.customization.event}
                                            </div>
                                        )}

                                        <div className="order-items">
                                            {order.cartItems?.map((item, i) => (
                                                <div key={i} className="order-item-row">
                                                    <img src={item.thumbnail} alt={item.title} className="order-item-img" />
                                                    <span>{item.title}</span>
                                                    <span className="order-item-qty">×{item.quantity}</span>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="order-total">
                                            Total: $
                                            {order.cartItems?.reduce(
                                                (sum, i) => sum + i.price * i.quantity, 0
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddToCart;