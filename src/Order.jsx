import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Order.css"

function Order() {

const navigate = useNavigate()
const [order, setOrder] = React.useState(null)
const [address, setAddress] = React.useState("")
const [selected, setSelected] = React.useState("")

useEffect(function() {
    fetch("http://localhost:5000/order", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        setOrder(data)
    })
}, [])

if(!order){
    return<div>Loading order...</div>
}

return (
    <div className="checkout-page">

        <div className="checkout-header">
            <div className="checkout-logo">
                <h2>ShopFlow</h2>
                <p>Complete your order</p>
            </div>
            <span className="checkout-safe">✓ Secure checkout</span>
        </div>

        <div className="checkout-container">

            <div className="checkout-title">
                <h1>Checkout</h1>
                <p>Enter your address and choose payment.</p>
            </div>

            <div className="checkout-layout">

                <div className="checkout-left">

                    <div className="checkout-card">
                        <h3>1. Delivery address</h3>
                        <p className="checkout-description">
                            Where should we deliver your order?
                        </p>

                        <textarea
                            className="checkout-address"
                            placeholder="Enter house number, street, area, city and PIN code..."
                            value={address}
                            onChange={function(e) {
                                setAddress(e.target.value)
                            }}
                        />
                    </div>

                    <div className="checkout-card">
                        <h3>2. Select payment method</h3>
                        <p className="checkout-description">
                            Choose your preferred payment method.
                        </p>

                        <button
                            className={"checkout-payment " + (selected === "upi" ? "active" : "")}
                            onClick={function() {
                                setSelected("upi")
                            }}
                        >
                            <span>↗</span>
                            <div>
                                <strong>UPI</strong>
                                <p>Google Pay, PhonePe</p>
                            </div>
                            <b>{selected === "upi" ? "✓" : "○"}</b>
                        </button>

                        <button
                            className={"checkout-payment " + (selected === "bank" ? "active" : "")}
                            onClick={function() {
                                setSelected("bank")
                            }}
                        >
                            <span>▤</span>
                            <div>
                                <strong>Net Banking</strong>
                                <p>Pay through your bank</p>
                            </div>
                            <b>{selected === "bank" ? "✓" : "○"}</b>
                        </button>

                        <button
                            className={"checkout-payment " + (selected === "creditcard" ? "active" : "")}
                            onClick={function() {
                                setSelected("creditcard")
                            }}
                        >
                            <span>▰</span>
                            <div>
                                <strong>Credit / Debit Card</strong>
                                <p>Pay using your card</p>
                            </div>
                            <b>{selected === "creditcard" ? "✓" : "○"}</b>
                        </button>
                    </div>

                </div>

                <div className="checkout-summary">
                    <h3>Order summary</h3>

                    {order.items && order.items.map(function(item, index) {
                        return (
                            <div className="checkout-item" key={index}>
                                <div>
                                    <strong>{item.name}</strong>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        )
                    })}

                    <div className="checkout-total">
                        <span>Total amount</span>
                        <strong>₹{order.total}</strong>
                    </div>

                 <button className="checkout-proceed"
                 onClick={function() {

    fetch("http://localhost:5000/create-razorpay-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: order.items,
            address: address,
            paymentMethod: selected,
            total:order.total
        })
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {

        if (!data.id) {
            alert(data.message || "Could not create payment")
            return
        }

        var options = {
            key: data.key_id,
            amount: data.amount,
            currency: data.currency,
            name: "ShopFlow",
            order_id: data.id,

            handler: function(response) {

                fetch("http://localhost:5000/verify-razorpay-payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json","authorization":"Bearer "+localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        items: order.items,
                        address: address,
                        paymentMethod: selected,
                        total: order.total,
                        payment: {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        }
                    })
                })
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {

                    if (data.order) {
                        alert("Order saved successfully")
                        navigate("/cart")
                    } else {
                        alert(data.message || "Payment verification failed")
                    }

                })
                .catch(function(error) {
                    console.log(error)
                })

            }
        }

        var razorpay = new window.Razorpay(options)
        razorpay.open()

    })
    .catch(function(error) {
        console.log(error)
        alert("Something went wrong")
    })

}}>
    Proceed to Payment
</button>

                    <p className="checkout-note">
                        Please check your address before proceeding.
                    </p>
                </div>

            </div>
        </div>
    </div>
)
}

export default Order