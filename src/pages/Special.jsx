import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Checkout.css";

function Special() {
    const navigate = useNavigate();

    const [customize, setCustomize] = useState(false);
    const [event, setEvent] = useState("");
    const [message, setMessage] = useState("");
    const [recipient, setRecipient] = useState("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("");

    // ─── Auto-fill from last order on mount ───
    useEffect(() => {
        const lastOrder = JSON.parse(localStorage.getItem("lastOrder") || "null");
        if (lastOrder) {
            setName(lastOrder.customerName || "");
            setPhone(lastOrder.phone || "");
            setAddress(lastOrder.address || "");
            setPayment(lastOrder.paymentMethod || "");
        }
    }, []);

    const handleSubmit = () => {
        if (!name || !phone || !address || !payment) {
            alert("Please fill in all required fields.");
            return;
        }

        const orderData = {
            customerName: name,
            phone,
            address,
            paymentMethod: payment,
            customization: customize
                ? { event, message, recipient }
                : null,
            cartItems: JSON.parse(localStorage.getItem("cart")) || [],
            orderedAt: new Date().toISOString(),
        };

        // Save as last order (for auto-fill next time)
        localStorage.setItem("lastOrder", JSON.stringify(orderData));

        // ─── Append to order history ───
        const existing = JSON.parse(localStorage.getItem("allOrders") || "[]");
        existing.push(orderData);
        localStorage.setItem("allOrders", JSON.stringify(existing));

        // Clear cart after placing order
        localStorage.removeItem("cart");

        // ✅ Small delay so localStorage fully commits before unmount
        setTimeout(() => navigate('/ThankYou'), 100);
    };

    return (
        <div className="custom-page">
            <h1 className="custom-title">Complete Your Order</h1>

            {/* ─── Customization Section ─── */}
            <div className="custom-card">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={customize}
                        onChange={(e) => setCustomize(e.target.checked)}
                    />
                    <span>Customize this order</span>
                </label>

                {customize && (
                    <div className="custom-form-inner">
                        <div className="form-group">
                            <label>What event is this for?</label>
                            <select value={event} onChange={(e) => setEvent(e.target.value)}>
                                <option value="">-- Select an event --</option>
                                <option value="birthday">Birthday</option>
                                <option value="anniversary">Anniversary</option>
                                <option value="wedding">Wedding</option>
                                <option value="graduation">Graduation</option>
                                <option value="baby_shower">Baby Shower</option>
                                <option value="festive">Festive / Holiday</option>
                                <option value="corporate">Corporate Gift</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Write a message / note</label>
                            <textarea
                                rows="4"
                                placeholder="e.g. Happy Birthday! Wishing you all the best 🎉"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Recipient's Name</label>
                            <input
                                type="text"
                                placeholder="Who is receiving this gift?"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* ─── Delivery Details ─── */}
            <div className="custom-card">
                <h2 className="section-heading">Delivery Details</h2>

                <div className="form-group">
                    <label>Your Name *</label>
                    <input
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Delivery Address *</label>
                    <textarea
                        rows="3"
                        placeholder="House no., Street, City, Pincode"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
            </div>

            {/* ─── Payment Method ─── */}
            <div className="custom-card">
                <h2 className="section-heading">Payment Method *</h2>
                <div className="payment-options">
                    {["PhonePe", "Google Pay", "Paytm", "Credit / Debit Card", "Cash on Delivery"].map((method) => (
                        <label key={method} className={`payment-label ${payment === method ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="payment"
                                value={method}
                                checked={payment === method}
                                onChange={(e) => setPayment(e.target.value)}
                            />
                            {method}
                        </label>
                    ))}
                </div>
            </div>

            {/* ─── Submit ─── */}
            <button className="submit-btn" onClick={handleSubmit}>
                Place Order
            </button>
        </div>
    );
}

export default Special;