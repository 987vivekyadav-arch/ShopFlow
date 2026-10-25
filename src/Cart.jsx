import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
    const [cart, setCart] = React.useState([]);
    const navigate=useNavigate()

    useEffect(function() {
        fetch("http://localhost:5000/cart", {
            method: "GET",
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            setCart(data);
        });
    }, []);

   function increase(index) {
    const newCart = [...cart];

    newCart[index].quantity = Number(newCart[index].quantity || 1) + 1;

    setCart(newCart);
}

function decrease(index) {
    const newCart = [...cart];

    if (Number(newCart[index].quantity || 1) > 1) {
        newCart[index].quantity = Number(newCart[index].quantity) - 1;
        setCart(newCart);
    }
}

    const total = cart.reduce(function(sum, item) {
        if(!item){
            return sum;}
        return sum + (Number(item.price)||0) * (Number(item.quantity) || 1);
    }, 0);


function Delete(id){
    fetch("http://localhost:5000/deletecart/"+id,{
        method:"DELETE",
        headers:{"authorization":"Bearer "+localStorage.getItem("token")},
        
    })
    .then(function(response){
return response.json()
    })
     .then(function(data){
        console.log(data)
const result=cart.filter(function(item){
if(item._id!==id){return true}{return false}
})
setCart(result)
})
}





    return (
        <div className="cart-page">

            <div className="cart-header">
                <button onClick={function() {
                    window.history.back();
                }}>←</button>
                <h2>My Cart</h2>
                <span>🛒 Share</span>
            </div>

            <div className="delivery-box">
                <h3>◷ Delivery in 8 minutes</h3>
                <p>Shipment of {cart.reduce(function(sum, item) {
                    return sum + (item.quantity || 1);
                }, 0)} items</p>
            </div>

            <div className="cart-items">
                {cart.map(function(item, index) {
                    return (
                        <div className="cart-item" key={item._id+"-"+index}>
                            <img
                                src={item.thumbnail || item.image}
                                alt={item.title}
                            />

                            <div className="cart-info">
                                <h3>{item.title}</h3>
                                <p>{item.weight || item.category}</p>
                                <strong>₹{item.price}</strong>
                            </div>

                            <div className="quantity-control">
                                <button onClick={function() {
                                    decrease(index);
                                }}>−</button>

                                <span>{item.quantity || 1}</span>

                                <button onClick={function() {
                                    increase(index);
                                }}>+</button>

                                <button onClick={function(){
                                    Delete(item._id)
                                }}
                                
                                >delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bill-box">
                <h3>Bill details</h3>

                <div className="bill-row">
                    <span>Items total</span>
                    <strong>₹{total.toFixed(2)}</strong>
                </div>

                <div className="bill-row">
                    <span>Delivery charge</span>
                    <span className="free">FREE</span>
                </div>

                <div className="bill-row">
                    <span>Handling charge</span>
                    <span>₹2</span>
                </div>

                <hr />

                <div className="bill-row grand-total">
                    <strong>Grand total</strong>
                    <strong>₹{(total + 2).toFixed(2)}</strong>
                </div>

                <div className="policy">
                    <h3>Cancellation Policy</h3>
                    <p>
                        Orders cannot be cancelled once packed for delivery.
                        Please check your items before proceeding.
                    </p>
                </div>
            </div>

            <div className="checkout-bar">
                <div>
                    <strong>₹{(total + 2).toFixed(2)}</strong>
                    <small>TOTAL</small>
                </div>

                <button onClick={function() {
                    fetch("http://localhost:5000/order",{
                        method:"POST",
                        headers:{"Content-Type":"application/json","authorization":"Bearer "+localStorage.getItem("token")},
                        body:JSON.stringify({
                            items:cart.map(function(item){
                              return{
                                productid:item._id,
                                name:item.title,
                                price:item.price,
 quantity:Number(item.quantity||1),
 image:item.image

                              }  
                            }),
 total:total


                        })
                    })
                    .then(function(response){
return response.json()
                    })
                     .then(function(data){
console.log(data)})
navigate("/order")
                }}>
                    Proceed →
                </button>
            </div>

        </div>
    );
}

export default Cart;