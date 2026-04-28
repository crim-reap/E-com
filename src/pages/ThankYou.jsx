import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/ThankYou.css";

function ThankYou() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("lastOrder");
        if (data) setOrder(JSON.parse(data));
    }, []);

    const totalAmount = order?.cartItems?.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    ) ?? 0;

    return (
        <div className="ty-page">
            <div className="ty-card">
                <h1 className="ty-title">Thank You!</h1>
                <p className="ty-subtitle">Your order has been placed successfully.</p>

                {order && (
                    <>
                        {/* Delivery Details */}
                        <div className="ty-details">
                            <p><b>Name:</b> {order.customerName}</p>
                            <p><b>Phone:</b> {order.phone}</p>
                            <p><b>Address:</b> {order.address}</p>
                            <p><b>Payment:</b> {order.paymentMethod}</p>
                            {order.customization?.event && (
                                <p><b>Event:</b> {order.customization.event}</p>
                            )}
                            {order.customization?.recipient && (
                                <p><b>For:</b> {order.customization.recipient}</p>
                            )}
                            {order.customization?.message && (
                                <p><b>Message:</b> {order.customization.message}</p>
                            )}
                        </div>

                        {/* Order Items */}
                        {order.cartItems?.length > 0 && (
                            <div className="ty-items">
                                <h3 className="ty-items-heading">Order Summary</h3>
                                {order.cartItems.map((item, i) => (
                                    <div className="ty-item-row" key={i}>
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="ty-item-img"
                                        />
                                        <span className="ty-item-title">{item.title}</span>
                                        <span className="ty-item-qty">×{item.quantity}</span>
                                        <span className="ty-item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className="ty-total">
                                    Total: <b>${totalAmount.toFixed(2)}</b>
                                </div>
                            </div>
                        )}
                    </>
                )}

                <p className="ty-note">We'll notify you once your order ships</p>

                <button className="ty-btn" onClick={() => navigate('/product')}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default ThankYou;