import React, { useEffect } from "react";
import "./Myorders.css";

function Myorders() {
    const [myorders, setMyOrders] = React.useState([]);

    useEffect(function() {
        fetch("https://shopflow-wkvz.onrender.com/myorders", {
            method: "GET",
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("myorders:", data);
            setMyOrders(data);
        });
    }, []);

    return (
        <div className="myorders-page">

            <div className="myorders-header">
                <div>
                    <p className="myorders-subtitle">YOUR SHOPFLOW ACCOUNT</p>
                    <h1>My Orders</h1>
                    <p className="myorders-description">
                        View your purchases and payment details.
                    </p>
                </div>

                <div className="myorders-count">
                    <span>{myorders.length}</span>
                    <p>Total Orders</p>
                </div>
            </div>

            <div className="myorders-list">
                {myorders.map(function(order) {
                    return (
                        <div className="myorder-card" key={order._id}>

                            <div className="myorder-header">
                                <div>
                                    <p className="myorder-label">ORDER ID</p>
                                    <h3>{order._id}</h3>
                                </div>

                                <span className="myorder-status">
                                    {order.status}
                                </span>
                            </div>

                            <div className="myorder-products">
                                {order.items.map(function(item, index) {
                                    return (
                                        <div className="myorder-item" key={index}>
                                            <div className="myorder-product-icon">
                                                <span>▣</span>
                                            </div>

                                            <div className="myorder-product-info">
                                                <h4>{item.name || item.title}</h4>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>

                                            <strong>
                                                ₹{Number(item.price || 0).toFixed(2)}
                                            </strong>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="myorder-payment">
                                <div>
                                    <p>Payment Method</p>
                                    <strong>{order.paymentMethod}</strong>
                                </div>

                                <div>
                                    <p>Payment ID</p>
                                    <strong className="myorder-payment-id">
                                        {order.razorpaypaymentid}
                                    </strong>
                                </div>
                            </div>

                            <div className="myorder-footer">
                                <span>Order Total</span>
                                <strong>₹{Number(order.total).toFixed(2)}</strong>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default Myorders;