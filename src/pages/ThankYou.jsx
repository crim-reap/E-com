import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("lastOrder");
        if (data) setOrder(JSON.parse(data));
    }, []);

    return (
        <div className="ty-page">
            <div className="ty-card">
                <h1 className="ty-title">Thank You!</h1>
                <p className="ty-subtitle">Your order has been placed successfully.</p>

                {order && (
                    <div className="ty-details">
                        <p><b>Name:</b> {order.customerName}</p>
                        <p><b>Phone:</b> {order.phone}</p>
                        <p><b>Address:</b> {order.address}</p>
                        <p><b>Payment:</b> {order.paymentMethod}</p>
                        {order.customization && order.customization.event && (
                            <p><b>Event:</b> {order.customization.event}</p>
                        )}
                        {order.customization && order.customization.recipient && (
                            <p><b>For:</b> {order.customization.recipient}</p>
                        )}
                    </div>
                )}

                <p className="ty-note">We'll notify you once your order ships</p>

                <button className="ty-btn" onClick={() => {
                    localStorage.removeItem("cart");
                    navigate('/');
                }}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default ThankYou;